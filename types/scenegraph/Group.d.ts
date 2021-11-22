import { SceneNode } from "scenegraph";
import { SceneNode } from "./SceneNode";

/** [Group on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Group/) */
export class Group extends SceneNode {

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#addchild */
    addChild(node: SceneNode, index?: number): void

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#addchildafter */
    addChildAfter(node: SceneNode, relativeTo: SceneNode): void

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#addchildbefore */
    addChildBefore(node: SceneNode, relativeTo: SceneNode): void

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#removeallchildren */
    removeAllChildren(): void

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#dynamiclayout */
    dynamicLayout?: boolean

    /** https://www.adobe.io/xd/uxp/develop/reference/Group/#mask */
    readonly mask?: SceneNode

}