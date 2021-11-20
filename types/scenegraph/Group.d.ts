import { SceneNode } from "scenegraph";
import { SceneNodeClass } from "./SceneNode";

/**
 * Group nodes represent two types of simple containers in XD:
 * - Plain Groups, created by the Object > Group command
 * - Masked Groups, created by the Object > Mask With Shape command You can determine whether a group is masked by checking the mask property.
 *
 * Groups and other containers cannot be created directly using scenenode constructors, since you can’t add a populated Group to the scenegraph (you can’t add subtrees all at once) nor can you add an empty Group and then add children to it (can’t add nodes outside the scope of the current edit context). Instead, to create Groups and other nested structures, use commands.
 *
 * In a Mask Group, the mask shape is included in the group’s children list, at the top of the z order. It is not visible - only its path outline is used, for clipping the group.
 */
export class Group extends SceneNodeClass {
    /**
     * The mask shape applied to this group, if any. This object is also present in the group’s children list. Though it has no direct visual appearance of its own, the mask affects the entire groups’s appearance by clipping all its other content.
     */
    readonly mask: SceneNode | null;

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