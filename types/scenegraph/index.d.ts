
/** 
 * [ImageFill on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/ImageFill/) 
 * 
 * The scenegraph is a node tree which represents the structure of the XD document. It closely matches the hierarchy seen in the Layers panel inside XD. Some scenenodes may contain children (e.g., a Group or Artboard), while others are leaf nodes (e.g., a Rectangle or Text node). The root of the scenegraph contains all Artboards that exist in the document, as well as all pasteboard content (nodes that are not contained by any artboard).
 * 
 * You can modify properties on any scenenodes within the current edit context, and add leaf nodes to the current edit context, but you cannot make structural changes directly to the scenegraph tree. Instead, use commands.
 * 
 * Typically, you access scenegraph nodes via the selection argument that is passed to your plugin command, or by traversing the entire document tree using the documentRoot argument that is passed to your plugin command. These objects are also accessible on the scenegraph module for convenience.
 */
declare module 'scenegraph' {
    import { RootNode } from 'RootNode'
    import { SceneNodeClass } from 'SceneNode';
    import { XDSelection } from 'selection';

    export interface Point {
        x: number;
        y: number;
    }

    export interface Point3D extends Point{
        z: number;
    }

    export interface Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    /**
     * @since XD 14
     * Object representing the current selection state and edit context. Also available as the first argument passed to your plugin command handler function.
     */
    export const selection: XDSelection;
    export { XDSelection } from 'selection';

    /**
     * @since XD 14
     * Root node of the current document's scenegraph. Also available as the second argument passed to your plugin command handler function.
     */
    export const root: RootNode;

    /**
     * @since XD 28
     * 
     * Returns the scenenode in this document that has the given node GUID. Returns undefined if no such node exists connected to the scenegraph tree (detached/orphan nodes will not be found). This provides a fast way of persistently remembering a node across plugin operations and even across document open/closes.
     * 
     * @param guid SceneNode GUID -- must be all lowercase, as returned by the guid getter
     */
    export function getNodeByGUID(guid:string): SceneNodeClass

    export { AngularGradient } from 'AngularGradient'
    export { Artboard } from 'Artboard'
    export { Blur } from 'Blur'
    export { BooleanGroup } from 'BooleanGroup'
    export { Color } from 'Color'
    export { Ellipse } from 'Ellipse'
    export { GraphicNode } from 'GraphicNode'
    export { Group } from 'Group'
    export { ImageFill } from 'ImageFill'
    export { InnerShadow } from 'InnerShadow'
    export { Line } from 'Line'
    export { LinearGradient } from 'LinearGradient'
    export { LinkedGraphic } from 'LinkedGraphic'
    export { Lottie } from 'Lottie'
    export { Matrix } from 'Matrix'
    export { Matrix3D } from 'Matrix3D'
    export { Path } from 'Path'
    export { PerPluginStorage } from 'PerPluginStorage'
    export { Polygon } from 'Polygon'
    export { RadialGradient } from 'RadialGradient'
    export { Rectangle } from 'Rectangle'
    export { RepeatGrid } from 'RepeatGrid'
    export { RootNode } from 'RootNode'
    export { SceneNode } from 'SceneNode'
    export { SceneNodeList } from 'SceneNodeList'
    export { ScrollableGroup } from 'ScrollableGroup'
    export { Shadow } from 'Shadow'
    export { SymbolInstance } from 'SymbolInstance'
    export { Text } from 'Text'
    export { Video } from 'Video'

    export {}; // Avoid exporting SceneNodeClass and RootNodeClass
}
