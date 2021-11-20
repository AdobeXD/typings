import { GraphicNode, SceneNode } from "scenegraph";

/**
 * BooleanGroup container node - although it has fill/stroke/etc. properties like a leaf shape node, it is a container with children. Its visual appearance is determined by generating a path via a nondestructive boolean operation on all its children’s paths.
 *
 * It is not currently possible for plugins to create a new BooleanGroup node, aside from using commands.duplicate to clone existing BooleanGroups.
 */
export class BooleanGroup extends GraphicNode {
    /**
     * Which boolean operation is used to generate the path: BooleanGroup.PATH_OP_ADD, PATH_OP_SUBTRACT, PATH_OP_INTERSECT, or PATH_OP_EXCLUDE_OVERLAP.
     */
    readonly pathOp: string;

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