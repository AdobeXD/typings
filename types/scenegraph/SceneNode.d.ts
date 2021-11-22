import { Interaction } from "interactions";
import { Bounds, InnerShadow, Matrix, Matrix3D, PerPluginStorage, Point, SceneNodeList } from "scenegraph";

/**
 * [SceneNode on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/SceneNode/)
 *
 * Base class of all scenegraph nodes. Nodes will always be an instance of some subclass of SceneNode.
 */
export abstract class SceneNode {
    
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
     * @default 'BLEND_MODE_PASSTHROUGH' 
     * @since XD 27
     * 
     * Blend mode determines how a node is composited onto the content below it.
     * 
     * Note: for leaf nodes (GraphicNode), the XD UI may show leaf nodes as blend mode "Normal" even when the underlying value is BLEND_MODE_PASSTHROUGH. This is because "Pass Through" and "Normal" are essentially equivalent for leaf nodes -- they only differ in appearance when a node has children.
     * 
     */
    blendMode: BlendMode

    /**
     * Affine transform matrix that converts from the node's local coordinate space to its parent's coordinate space. The matrix never has skew or scale components, and if this node is an Artboard the matrix never has rotation either. Rather than reading the raw matrix values directly, it may be easier to use the translation and rotation properties.
     * 
     * @since XD 40 transform will return a Matrix3D objects for 3D transformed nodes. Again, rather than reading the raw matrix values directly, it may be easier to use the zDepth, rotationX and rotationY for 3D specific properties.
     * 
     * To move or resize a node, use the translation property or APIs like placeInParentCoordinates() or rotateAround(). Setting the entire transform matrix directly is not allowed. To resize a node, use resize().
     * 
     * For an overview of node transforms & coordinate systems, see Coordinate spaces.
     * 
     * This getter returns a fresh Matrix each time, so its fields can be mutated by the caller without interfering with the node's state.
     */
    readonly transform: Matrix | Matrix3D;

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
     * @since XD 19
     *
     * True if the node stays in a fixed position while the Artboard's content is scrolling (when viewed in an interactive prototype). _Only applicable for nodes whose immediate parent is an Artboard._
     *
     * For other nodes, this property returns undefined and cannot be set. To determine whether those nodes scroll or remain fixed, walk up the parent chain and check this property on the topmost ancestor in the Artboard.
     */
    fixedWhenScrolling?: boolean;

    /**
     * @since XD 19
     *
     * Get all interactions that are triggered by this node in the document's interactive prototype. Each element in the array is an Interaction object which describes a gesture/event plus the action it produces.
     *
     * Note: If this node (or one of its ancestors) has `visible` = false, tap and drag interactions on it will not be triggered.
     *
     * Currently, this API excludes any keyboard/gamepad interactions on this node.
     */
    readonly triggeredInteractions?: Interaction[];

    /**
     * @since XD 38
     * 
     * Returns a list of this node's children, skipping the background node when present. The list is z-index ordered, from lowest to highest. This list is not an Array, so you must use at(i) instead of [i] to access content children by index.
     */
    readonly contentChildren: SceneNodeList

    /**
     * @since XD 38
     * 
     * Encapsulates all the Layout properties: Responsive Resize, Padding and Stacks. By design, the Stack property is conditioned by the presence of Padding property which, in turn, is conditioned by the presence of Responsive Resize property.
     */
    layout: LayoutProperties

    /**
     * @since XD 29
     *
     * Horizontal dynamic-layout settings used with the Responsive Resize feature. Setting this only determines how the node is updated when its parent is resized -- it does not change the node's current size or position.
     */
    horizontalConstraints?: HorizontalConstraints

    /**
     * @since XD 29
     *
     * Vertical dynamic-layout settings used with the Responsive Resize feature. Setting this only determines how the node is updated when its parent is resized -- it does not change the node's current size or position.
     */
    verticalConstraints?: VerticalConstraints

    /** 
     * @since XD 29
     * 
     * True if this node's Responsive Resize layout settings, which are normally automatically inferred by XD, have been overridden with specific desired values. Constraints on a node are either all overridden, or all automatic -- never mixed.
     * 
     * If false, each time the parent resizes XD will automatically guess the best layout settings to used based on the current size & position of this node within its parent. You can use the horizontalConstraints and verticalConstraints getters to check what computed settings XD would use based on the node's current size & position.
     * 
     * Automatically becomes true any time you set horizontalConstraints or verticalConstraints. To reset to false, call resetToAutoConstraints().
     */
    readonly hasCustomConstraints: boolean

    /**
     * @since XD 29
     * 
     * Erase any overridden Responsive Resize layout settings, restoring the default behavior where XD will automatically guess the best layout settings for this node the next time its parent is resized. This function does not change the node's current size & position, however.
     * 
     * Calling this will cause hasCustomConstraints to become false.
     */
    resetToAutoConstraints(): void

    /**
     * True if the node's appearance comes from a link to an external resource, such as Creative Cloud Libraries or a separate XD document (in the case of a Linked Component instance).
     */
    readonly hasLinkedContent: boolean

    /**
     * @since XD 14
     * Metadata specific to your plugin. Must be a value which can be converted to a JSON string, or undefined to clear the stored metadata on this node.
     *
     * Metadata is persisted with the document when it is saved. Duplicating a node (including across documents, via copy-paste) will duplicate the metadata with it. If the node lies within a Component or Repeat Grid, all instances of the node will have identical metadata (changes in one copy will automatically be synced to the other copy). Metadata stored by this plugin cannot be accessed by other plugins - each plugin has its own isolated metadata storage.
     *
     * To store general metadata for the document overall, set pluginData on the root node of the scenegraph. Metadata on the root node can be changed from any edit context.
     */
    pluginData: any;

    /**
     * @since XD 29
     * 
     * Metadata storage accessible by other plugins, separated into silos by plugin ID. Your plugin can read & write the storage for its own plugin ID, but storage for other plugin IDs is read-only. This property returns a PerPluginStorage API object.
     * 
     * Each scenenode has its own metadata storage. To store general metadata that is not specific to one scenenode, use sharedPluginData on the document's scenegraph root.
     * 
     * Metadata is persisted with the document when it is saved. See pluginMetadata for info on how metadata is duplicated when nodes are copied or synced.
     */
    sharedPluginData: PerPluginStorage

    /**
     * Remove this node from its parent, effectively deleting it from the document.
     */
    removeFromParent(): void;

    /**
     * @updated XD 40
     * 
     * Move the node by the given number of pixels along the parent's X/Y axes (if this node has no rotation, this is identical to moving the node along its own local X/Y axes). This is equivalent to modifying the value returned by 'translation' and then setting it back.
     * 
     * The third parameter, deltaZ (optional), allows the movement of the object on Z axis.
     * 
     * deltaX Amount to move along X axis
     * deltaY Amount to move along Y axis
     * deltaZ Optional: number of pixels to change depth with
     */
    moveInParentCoordinates(deltaX: number, deltaY: number, deltaZ?: number): void;

    /**
     * Move the node so the given point in its local coordinates is placed at the given point in its parent’s coordinates (taking into account any rotation on this node, etc.).
     * For an overview of node positioning & coordinate systems, see Coordinate spaces.
     * registrationPoint Point in this node’s local coordinate space to align with parentPoint
     * parentPoint Point in this node’s parent’s coordinate space to move registrationPoint to
     */
    placeInParentCoordinates(registrationPoint: Point, parentPoint: Point): void;

    /**
     * @since XD 40
     * 
     * Move the node so the given point in its local coordinates is placed at the given point in its parent's coordinates (taking into account any rotation on this node, etc.).
     * 
     * If a 2D point is passed as parameter for either registrationPoint or parentPoint it will be treated as a 3D point with z = 0 (a point in node's plane).
     * 
     * @param registrationPoint 2D or 3D point in this node's local coordinate space to align with parentPoint
     * @param parentPoint 2D or 3D point in this node's parent's coordinate space to move registrationPoint to
     */
    placeInParentCoordinates3D(registrationPoint: Point, parentPoint: Point): void;

    /**
     * @since XD 40
     * 
     * The perspective center component of this node, in parent coordinates. It represents the point in canvas plane where the viewer eye is placed. The perspective center exists for the top level 3D transformed node in a hierarchy and it is null otherwise.
     * 
     * Example: Artboard1 contains a Group1 that contains a Group2 that contains Rectangle1 and Rectangle2. If Group1 is 2D, Group2 is 3D (e.g. rotated 30 deg on Y), Rectangle1 is 2D and Rectangle2 is 3D, the perspective center is set on Group2. For all the others elements the perspectiveCenterInParentCoordinates property is null.
     */
    perspectiveCenterInParentCoordinates: Point

    /**
     * @since XD 40
     * 
     * The zDepth component of this node's transform. Since zDepth is applied after any rotation in the transform Matrix, zDepth occurs along the parent's Z axis, not the node's own local Z axis. This is equivalent to the mz field in the transform Matrix. zDepth is 0 for 2D nodes.
     * 
     * If portions of objects are placed at z greater than 800 (e.g. an unrotated shape with zDepth >= 800 or a 90 deg Y-rotated shape having width = 2000) rendering artifacts will appear.
     */
    zDepth: number

    /** 
     * @since XD 40
     * 
     * Move the node by the given number of pixels along the parent's Z axis (if this node has no 3D rotation, this is identical to moving the node along its own local Z axis).
     */
    moveZDepth(deltaZ: number): void

    /**
     * Rotate the node clockwise by the given number of degrees around the given point in the plugin’s local coordinate space. If this node already has nonzero rotation, this operation adds to its existing angle.
     * deltaAngle In degrees.
     * rotationCenter Point to rotate around, in node’s local coordinates.
     */
    rotateAround(deltaAngle: number, rotationCenter: Point): void;

    /**
     * @since XD 40
     * 
     * The rotation around X axis component of this node's transform, in degrees. (A positive rotation on X means the upper side of the object is moving away from the viewer)
     */
    readonly rotationX: number

    /**
     * @since XD 40
     * 
     * The rotation around Y axis component of this node's SceneNode, in degrees. (A positive rotation on Y means the right side of the object is moving away from the viewer)
     */
    readonly rotationY: number

    /**
     * @since XD 40
     * Rotate the node around X axis by the given number of degrees around the given point in the plugin's local coordinate space. If this node already has nonzero rotation on X axis, this operation adds to its existing angle. The rotation around Z and the rotation around Y are left unmodified. The rotations around the 3D axes are applied in the following order: rotation around X axis is applied first, followed by rotation around Y and then rotation around Z (2D rotation)
     * @param deltaAngle In degrees
     * @param rotationCenter Point to rotate around, in node's local coordinates.
     */
    rotateXAround(deltaAngle: number, rotationCenter: Point): void

    /**
     * @since XD 40
     * Rotate the node around Y axis by the given number of degrees around the given point in the plugin's local coordinate space. If this node already has nonzero rotation on Y axis, this operation adds to its existing angle. The rotation around Z and the rotation around X are left unmodified. The rotations around the 3D axes are applied in the following order: rotation around X axis is applied first, followed by rotation around Y and then rotation around Z (2D rotation)
     * @param deltaAngle In degrees
     * @param rotationCenter Point to rotate around, in node's local coordinates.
     */
    rotateYAround(deltaAngle: number, rotationCenter: Point): void


    /**
     * Attempts to change localBounds.width & height to match the specified sizes. This operation may not succeed, since some nodes are not resizable. Resizing one dimension may affect the other, if the node’s aspect ratio is locked.
     * width
     * height
     */
    resize(width: number, height: number): void;

    /** 
     * @since XD 40
     * @default null
     * 
     * The node's inner shadow, if any. If this property is null or innerShadow.visible is false, no inner shadow is drawn. Artboard, Line and any container object like Group, ScrollableGroup, SymbolInstance and Repeat Grid don't support inner shadow.
     * 
     * To modify an existing inner shadow, always be sure to re-invoke the innerShadow setter rather than just changing the InnerShadow object's properties inline.See "Properties with object values".
     */
    innerShadow: InnerShadow | null

    
    static readonly BLEND_MODE_PASSTHROUGH = 'BLEND_MODE_PASSTHROUGH'
    static readonly BLEND_MODE_NORMAL = 'BLEND_MODE_NORMAL'
    static readonly BLEND_MODE_MULTIPLY = 'BLEND_MODE_MULTIPLY'
    static readonly BLEND_MODE_DARKEN = 'BLEND_MODE_DARKEN'
    static readonly BLEND_MODE_COLOR_BURN = 'BLEND_MODE_COLOR_BURN'
    static readonly BLEND_MODE_LIGHTEN = 'BLEND_MODE_LIGHTEN'
    static readonly BLEND_MODE_SCREEN = 'BLEND_MODE_SCREEN'
    static readonly BLEND_MODE_COLOR_DODGE = 'BLEND_MODE_COLOR_DODGE'
    static readonly BLEND_MODE_OVERLAY = 'BLEND_MODE_OVERLAY'
    static readonly BLEND_MODE_SOFT_LIGHT = 'BLEND_MODE_SOFT_LIGHT'
    static readonly BLEND_MODE_HARD_LIGHT = 'BLEND_MODE_HARD_LIGHT'
    static readonly BLEND_MODE_DIFFERENCE = 'BLEND_MODE_DIFFERENCE'
    static readonly BLEND_MODE_EXCLUSION = 'BLEND_MODE_EXCLUSION'
    static readonly BLEND_MODE_HUE = 'BLEND_MODE_HUE'
    static readonly BLEND_MODE_SATURATION = 'BLEND_MODE_SATURATION'
    static readonly BLEND_MODE_COLOR = 'BLEND_MODE_COLOR'
    static readonly BLEND_MODE_LUMINOSITY = 'BLEND_MODE_LUMINOSITY'

    static readonly FIXED_LEFT = 'FIXED_LEFT'
    static readonly FIXED_RIGHT = 'FIXED_RIGHT'
    static readonly FIXED_TOP = 'FIXED_TOP'
    static readonly FIXED_BOTTOM = 'FIXED_BOTTOM'
    static readonly FIXED_BOTH = 'FIXED_BOTH'
    static readonly POSITION_PROPORTIONAL = 'POSITION_PROPORTIONAL'
    
    static readonly LAYOUT_NONE = 'LAYOUT_NONE'
    static readonly LAYOUT_RESPONSIVE_RESIZE = 'LAYOUT_RESPONSIVE_RESIZE'
    static readonly LAYOUT_PADDING = 'LAYOUT_PADDING'
    static readonly LAYOUT_STACK = 'LAYOUT_STACK'

    static readonly STACK_HORIZONTAL = 'STACK_HORIZONTAL'
    static readonly STACK_VERTICAL = 'STACK_VERTICAL'

    static readonly RESPONSIVE_RESIZE_AUTO = 'RESPONSIVE_RESIZE_AUTO'
    static readonly RESPONSIVE_RESIZE_MANUAL = 'RESPONSIVE_RESIZE_MANUAL'
    
}

export type BlendMode =
    'BLEND_MODE_PASSTHROUGH' |
    'BLEND_MODE_NORMAL' |
    'BLEND_MODE_MULTIPLY' |
    'BLEND_MODE_DARKEN' |
    'BLEND_MODE_COLOR_BURN' |
    'BLEND_MODE_LIGHTEN' |
    'BLEND_MODE_SCREEN' |
    'BLEND_MODE_COLOR_DODGE' |
    'BLEND_MODE_OVERLAY' |
    'BLEND_MODE_SOFT_LIGHT' |
    'BLEND_MODE_HARD_LIGHT' |
    'BLEND_MODE_DIFFERENCE' |
    'BLEND_MODE_EXCLUSION' |
    'BLEND_MODE_HUE' |
    'BLEND_MODE_SATURATION' |
    'BLEND_MODE_COLOR' |
    'BLEND_MODE_LUMINOSITY';

/** https://www.adobe.io/xd/uxp/develop/reference/SceneNode/#horizontalconstraints */
export interface HorizontalConstraints {
    position: 'FIXED_LEFT' | 'FIXED_RIGHT' | 'FIXED_BOTH' | 'POSITION_PROPORTIONAL'
    size: 'SIZE_FIXED' | 'SIZE_RESIZES'
}

/** https://www.adobe.io/xd/uxp/develop/reference/SceneNode/#verticalconstraints */
export interface VerticalConstraints {
    position: 'FIXED_TOP' | 'FIXED_BOTTOM' | 'FIXED_BOTH' | 'POSITION_PROPORTIONAL'
    size: 'SIZE_RESIZES' | 'SIZE_FIXED'
}

/** top, right, bottom, left, width and height are all Boolean values set to true when enabled. */
export interface ResizeConstraints {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean,
    width: boolean,
    height: boolean
}

/** https://www.adobe.io/xd/uxp/develop/reference/SceneNode/#layout */
export interface LayoutProperties {
    type: 'LAYOUT_NONE' | 'LAYOUT_RESPONSIVE_RESIZE' | 'LAYOUT_PADDING' | 'LAYOUT_STACK'
    /** Included if layout type is LAYOUT_STACK */
    stack?: {
        orientation: 'STACK_HORIZONTAL' | 'STACK_VERTICAL'
        /** a number if each cell is equidistant or an array of spaces between cells in order provided by contentChildren */
        spacings: number[] | number
    }
    /** Included if layout type is LAYOUT_STACK or LAYOUT_PADDING */
    padding?: {
        /** SceneNode used as the background or null if no background set */
        background: SceneNode | null
        /** 
         * top, right, bottom, left are all numbers which determines each side padding amount. 
         * A single number represents the padding used by all four sides. 
         */
        values: number | { top: number, right: number, bottom: number, left: number }
    }
    /** Included if layout type is LAYOUT_STACK, LAYOUT_PADDING or LAYOUT_RESPONSIVE_RESIZE */
    resizeConstraints?: {
        type: 'RESPONSIVE_RESIZE_AUTO' | 'RESPONSIVE_RESIZE_MANUAL'
        values: ResizeConstraints
    }

}