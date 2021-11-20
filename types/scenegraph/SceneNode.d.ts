import { Interaction } from "interactions";
import { Bounds, Matrix, Point, SceneNodeList } from "scenegraph";

export interface SceneNode extends SceneNodeClass {
}

/**
 * Base class of all scenegraph nodes. Nodes will always be an instance of some subclass of SceneNode.
 */
export abstract class SceneNodeClass {
    /**
     * Returns a unique identifier for this node that stays the same when the file is closed & reopened, or if the node is moved to a different part of the document. Cut-Paste will result in a new guid, however.
     */
    readonly guid: string;
    /**
     * Returns the parent node. Null if this is the root node, or a freshly constructed node which has not been added to a parent yet.
     */
    readonly parent: SceneNode | null;
    /**
     * Returns a list of this node’s children. List is length 0 if the node has no children. The first child is lowest in the z order.
     * This list is not an Array, so you must use at(i) instead of [i] to access children by index. It has a number of Array-like methods such as forEach() for convenience, however.
     * The list is immutable. Use removeFromParent and addChild to add/remove child nodes.
     */
    readonly children: SceneNodeList;
    /**
     * True if the node’s parent chain connects back to the document root node.
     */
    readonly isInArtworkTree: boolean;
    /**
     * True if this node is a type that could have children (e.g. an Artboard, Group, Boolean Group, etc.).
     */
    readonly isContainer: boolean;
    /**
     * True if this node is part of the current selection. To change which nodes are selected, use selection.
     */
    readonly selected: boolean;

    /**
     * False if this node has been hidden by the user (eyeball toggle in Layers panel). If true, the node may still be invisible for other reasons: a parent or grandparent has visible=false, the node has opacity=0%, the node is clipped by a mask, etc.
     */
    visible: boolean;

    /**
     * (0.0-1.0)Node’s opacity setting. The overall visual opacity seen on canvas is determined by combining this value with the opacity of the node’s entire parent chain, as well as the opacity settings of its fill/stroke properties if this is a leaf node.
     */
    opacity: number;

    /**
     * Affine transform matrix that converts from the node’s local coordinate space to its parent’s coordinate space. The matrix never has skew or scale components, and if this node is an Artboard the matrix never has rotation either. Rather than working with the raw matrix directly, it may be easier to use methods such as placeInParentCoordinates or rotateAround.
     * Returns a fresh Matrix each time, so this can be mutated by the caller without interfering with anything. Mutating the returned Matrix does not change the node’s transform - only invoking the ‘transform’ setter changes the node. To modify an existing transform, always be sure to re-invoke the transform setter rather than just changing the Matrix object’s properties inline. See “Properties with object values”.
     * For an overview of node transforms & coordinate systems, see Coordinate spaces.
     */
    readonly transform: Matrix;

    /**
     * The translate component of this node’s transform. Since translation is applied after any rotation in the transform Matrix, translation occurs along the parent’s X/Y axes, not the node’s own local X/Y axes. This is equivalent to the e & f fields in the transform Matrix.
     * For an overview of node positioning & coordinate systems, see Coordinate spaces.
     */
    translation: Point;

    /**
     * The rotation component of this node’s transform, in clockwise degrees.
     * For an overview of node transforms & coordinate systems, see Coordinate spaces.
     */
    readonly rotation: number;

    /**
     * The node’s path bounds in document-global coordinate space (represented by a bounding box aligned with global X/Y axes). Path bounds match the selection outline seen in the XD, but exclude some visual parts of the node (outer stroke, drop shadow / blur, etc.).
     */
    readonly globalBounds: Bounds;

    /**
     * The node’s path bounds in its own local coordinate space. This coordinate space may be rotated and translated relative to the parent’s coordinate space. Path bounds match the selection outline seen in XD, but exclude some visual parts of the node (outerstroke, drop shadow / blur, etc.).
     * The visual top-left of a node’s path bounds is located at (localBounds.x, localBounds.y). This value is not necessarily (0,0) in the local coordinate space: for example, a text node’s baseline is at y=0 in local coordinates, so the top of the text has a negative y value.
     */
    readonly localBounds: Bounds;

    /**
     * The node’s path bounds in its parent’s coordinate space (represented by a bounding box aligned with the parent’s X/Y axes - so if the node has rotation, the top-left of the node is not necessarily located at the top-left of boundsInParent). Path bounds match the selection outline seen in XD, but exclude some visual parts of the node (outer stroke, drop shadow / blur, etc.).
     */
    readonly boundsInParent: Bounds;

    /**
     * The position of the node’s upper-left corner (localBounds.x, localBounds.y) in its parent’s coordinate space. If the node is rotated, this is not the same as the top-left corner of boundsInParent. This is a shortcut for node.transform.transformPoint({x: node.localBounds.x, y: node.localBounds.y})
     */
    readonly topLeftInParent: Point;

    /**
     * The position of the node’s centerpoint in its own local coordinate space. Useful as an argument to rotateAround. This is a shortcut for {x: localBounds.x + localBounds.width/2, y: localBounds.y + localBounds.height/2})
     */
    readonly localCenterPoint: Point;

    /**
     * The node’s draw bounds in document-global coordinate space. Draw bounds are larger than the selection outline seen in XD, including outer stroke, drop shadow / blur, etc. - every visible pixel of the node is encompassed by these bounds. This matches the image dimensions if the node is exported as a PNG/JPEG bitmap.
     */
    readonly globalDrawBounds: Bounds;

    /**
     * Node name as seen in the Layers panel. Also used as filename during export.
     */
    name: string;

    /**
     * True if name is a generic, auto-generated string (e.g. “Rectangle 5”). False if name has been explicitly set.
     */
    readonly hasDefaultName: boolean;

    /**
     * True if the node is locked, meaning it cannot normally be selected.
     */
    locked: boolean;

    /**
     * True if the node should be included in the output of File > export > Batch and other bulk-export workflows.
     */
    markedForExport: boolean;

    /**
     * **Since**: XD 19
     *
     * True if the node stays in a fixed position while the Artboard's content is scrolling (when viewed in an interactive prototype). _Only applicable for nodes whose immediate parent is an Artboard._
     *
     * For other nodes, this property returns undefined and cannot be set. To determine whether those nodes scroll or remain fixed, walk up the parent chain and check this property on the topmost ancestor in the Artboard.
     */
    fixedWhenScrolling?: boolean;

    /**
     * Get all interactions that are triggered by this node in the document's interactive prototype. Each element in the array is an Interaction object which describes a gesture/event plus the action it produces.
     *
     * Note: If this node (or one of its ancestors) has `visible` = false, tap and drag interactions on it will not be triggered.
     *
     * Currently, this API excludes any keyboard/gamepad interactions on this node.
     *
     * @example ```javascript
     // Print all the interactions triggered by a node
     node.triggeredInteractions.forEach(interaction => {
console.log("Trigger: " + interaction.trigger.type + " -> Action: " + interaction.action.type);
});
     * ```
     *
     * @see interactions.allInteractions
     */
    readonly triggeredInteractions?: Array<Interaction>;

    /**
     * True if the node's appearance comes from a link to an external resource, such as Creative Cloud Libraries or a separate XD document (in the case of a Linked Component instance).
     */
    readonly hasLinkedContent: boolean;

    /**
     * **Since:** XD 14
     * Metadata specific to your plugin. Must be a value which can be converted to a JSON string, or undefined to clear the stored metadata on this node.
     *
     * Metadata is persisted with the document when it is saved. Duplicating a node (including across documents, via copy-paste) will duplicate the metadata with it. If the node lies within a Component or Repeat Grid, all instances of the node will have identical metadata (changes in one copy will automatically be synced to the other copy). Metadata stored by this plugin cannot be accessed by other plugins - each plugin has its own isolated metadata storage.

     *
     * To store general metadata for the document overall, set pluginData on the root node of the scenegraph. Metadata on the root node can be changed from any edit context.
     */
    pluginData: any;

    /**
     * Remove this node from its parent, effectively deleting it from the document.
     */
    removeFromParent(): void;

    /**
     * Move the node by the given number of pixels along the parent’s X/Y axes (if this node has no rotation, this is identical to moving the node along its own local X/Y axes). This is equivalent to modifying the value returned by ‘translation’ and then setting it back.
     * For an overview of node positioning & coordinate systems, see Coordinate spaces.
     * @param {number} deltaX
     * @param {number} deltaY
     */
    moveInParentCoordinates(deltaX: number, deltaY: number): void;

    /**
     * Move the node so the given point in its local coordinates is placed at the given point in its parent’s coordinates (taking into account any rotation on this node, etc.).
     * For an overview of node positioning & coordinate systems, see Coordinate spaces.
     * @param {Point} registrationPoint Point in this node’s local coordinate space to align with parentPoint
     * @param {Point} parentPoint Point in this node’s parent’s coordinate space to move registrationPoint to
     */
    placeInParentCoordinates(
        registrationPoint: Point,
        parentPoint: Point
    ): void;

    /**
     * Rotate the node clockwise by the given number of degrees around the given point in the plugin’s local coordinate space. If this node already has nonzero rotation, this operation adds to its existing angle.
     * @param {number} deltaAngle In degrees.
     * @param {Point} rotationCenter Point to rotate around, in node’s local coordinates.
     */
    rotateAround(deltaAngle: number, rotationCenter: Point): void;

    /**
     * Attempts to change localBounds.width & height to match the specified sizes. This operation may not succeed, since some nodes are not resizable. Resizing one dimension may affect the other, if the node’s aspect ratio is locked.
     * @param {number} width
     * @param {number} height
     */
    resize(width: number, height: number): void;
}