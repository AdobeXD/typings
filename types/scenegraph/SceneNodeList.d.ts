import { SceneNode } from "scenegraph";

/**
 * Represents the children of a scenenode. Typically accessed via the SceneNode.children property.
 */
export interface SceneNodeList {
    items: SceneNode[];
    readonly length: number;

    forEach(
        callback: (sceneNode: SceneNode, index: number) => void,
        thisArg?: object
    ): void;

    forEachRight(
        callback: (sceneNode: SceneNode, index: number) => void,
        thisArg?: object
    ): void;

    filter(
        callback: (sceneNode: SceneNode, index: number) => boolean,
        thisArg?: object
    ): Array<SceneNode>;

    map(
        callback: (sceneNode: SceneNode, index: number) => any,
        thisArg?: object
    ): Array<any>;

    some(
        callback: (sceneNode: SceneNode, index: number) => boolean,
        thisArg?: object
    ): boolean;

    at(index: number): SceneNode | null;
}