import { SceneNode } from "scenegraph";

/**
 * [SceneNodeList on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/SceneNodeList/)
 *
 * Represents the children of a SceneNode. Typically accessed via the SceneNode.children property.
 * 
 * This is not an Array, so you must use .at(i) instead of [i] to access children by index. It has a number of Array-like methods such as forEach for convenience, however. For best performance, iterate the list using these methods rather than repeatedly calling at().
 * 
 * Items in this list are ordered from lowest z order to highest.
 */
export interface SceneNodeList {

    /**
     * Number of children in the list.
     */
    readonly length: number;

    /**
     * Iterate all children in the list.
     */
    forEach(
        callback: (sceneNode: SceneNode, index: number) => void,
        thisArg?: object
    ): void;

    /**
     * Iterate all children in the list, in reverse order (highest z order to lowest).
     */
    forEachRight(
        callback: (sceneNode: SceneNode, index: number) => void,
        thisArg?: object
    ): void;

    /**
     * Iterates all children and returns an array of just the children that passed the filter function's test.
     */
    filter(
        callback: (sceneNode: SceneNode, index: number) => boolean,
        thisArg?: object
    ): SceneNode[];

    /**
     * Iterates all children and returns an array of the map function's result value for each child node.
     */
    map(
        callback: (sceneNode: SceneNode, index: number) => any,
        thisArg?: object
    ): any[];

    /**
     * Iterates children until the test returns true for at least one child. Returns true if the test function returned true for at least one child.
     */
    some(
        callback: (sceneNode: SceneNode, index: number) => boolean,
        thisArg?: object
    ): boolean;

    /**
     * Returns the child node at the specified index in the list, or null if index is out of bounds.
     * 
     * Note: calling at() repeatedly (e.g. in a for loop) is not as fast as using SceneNodeList's iteration methods such as forEach(), some(), or map().
     */
    at(index: number): SceneNode | null;
}