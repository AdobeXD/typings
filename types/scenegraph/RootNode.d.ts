import { SceneNode } from "scenegraph";

/**
 * [RootNode on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/RootNode/)
 *
 * Class representing the root node of the document. All Artboards are children of this node, as well as any pasteboard content that does not lie within an Artboard. Artboards must be grouped contiguously at the bottom of this node's z order. The root node has no visual appearance of its own.
 */
export class RootNode extends SceneNode {
    /**
     * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
     * @param node Child to add
     * @param index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
     */
    addChild(node: SceneNode, index?: number): void;

    /**
     * Inserts a child node after the given reference node.
     * @param node Child to add
     * @param relativeTo New child is added immediately after this existing child
     */
    addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

    /**
     * Inserts a child node before the given reference node.
     * @param node Child to add
     * @param relativeTo New child is added immediately before this existing child
     */
    addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

    /**
     * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
     */
    removeAllChildren(): void;
}