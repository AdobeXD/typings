import { Interaction } from "interactions";
import { GraphicNode, SceneNode } from "scenegraph";

/**
 * Artboard container node. All Artboards must be children of the root node (they cannot be nested), and they must be placed below all pasteboard content in the z order.
 *
 * Artboards can have a background fill, but the stroke, shadow, and blur settings are all ignored. Artboards cannot be locked or hidden, or have opacity < 100%.
 *
 * If a node is changed to overlap an Artboard, it will automatically become a child of the artboard when the operation finishes, and similar if a node is changed to no longer overlap an Artboard. It is not possible to have a node overlapping an Artboard that does not become a child of the artboard, or vice versa, a node that falls entirely outside an Artboard’s bounds but remains its child.
 */
export class Artboard extends GraphicNode {
    /**
     * value must be >= 0
     */
    width: number;

    /**
     * For scrollable Artboards, this is the total height encompassing all content - not just the viewport size (i.e. screen height).
     *
     * value must be >= 0
     */
    height: number;

    /**
     * If Artboard is scrollable, this is the height of the viewport (e.g. mobile device screen size). Null if Artboard isn’t scrollable.
     */
    viewportHeight: null | number;

    /**
     * **Since**: XD 19
     *
     * Get all interactions whose destination is this artboard (either navigating the entire view, i.e. a `"goToArtboard"` action, or
     * showing this artboard as an overlay, i.e. an `"overlay"` action). Each element in the array is an [Interaction object](
     * /interactions.md#Interaction)
     * which describes a gesture/event plus the action it produces.
     *
     * May include interactions that are impossible to trigger because the trigger node (or one of its ancestors) has `visible` = false.
     *
     * Note: currently, this API excludes any applicable keyboard/gamepad interactions.
     * @see SceneNode.triggeredInteractions
     * @see interactions.allInteractions
     */
    readonly incomingInteractions: Array<{ triggerNode: SceneNode, interactions: Array<Interaction> }>;

    /**
     * **Since**: XD 19
     *
     * True if this is the starting Artboard seen when the interactive prototype is launched.
     *
     * @see interactions.homeArtboard
     */
    readonly isHomeArtboard: boolean;

    /**
     * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
     * @param {SceneNode} node Child to add
     * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
     */
    addChild(node: SceneNode, index?: number): void;

    /**
     * Inserts a child node after the given reference node.
     * @param {SceneNode} node Child to add
     * @param {SceneNode} relativeTo New child is added immediately after this existing child
     */
    addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

    /**
     * Inserts a child node before the given reference node.
     * @param {SceneNode} node Child to add
     * @param {SceneNode} relativeTo New child is added immediately before this existing child
     */
    addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

    /**
     * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
     */
    removeAllChildren(): void;
}
