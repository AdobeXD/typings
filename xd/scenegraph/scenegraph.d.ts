/**
 * [scenegraph on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/scenegraph/)
 * 
 * The scenegraph is a node tree which represents the structure of the XD document. It closely matches the hierarchy seen in the Layers panel inside XD. Some scenenodes may contain children (e.g., a Group or Artboard), while others are leaf nodes (e.g., a Rectangle or Text node). The root of the scenegraph contains all Artboards that exist in the document, as well as all pasteboard content (nodes that are not contained by any artboard).
 * 
 * You can modify properties on any scenenodes within the current edit context, and add leaf nodes to the current edit context, but you cannot make structural changes directly to the scenegraph tree. Instead, use commands.
 * 
 * Typically, you access scenegraph nodes via the selection argument that is passed to your plugin command, or by traversing the entire document tree using the documentRoot argument that is passed to your plugin command. These objects are also accessible on the scenegraph module for convenience.
 */
declare module 'scenegraph' {

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
    export const selection: Selection;

    /**
     * @since XD 14
     * Root node of the current document's scenegraph. Also available as the second argument passed to your plugin command handler function.
     */
    export const root: RootNode;

    /** 
     * __non-standard__ - interface for a plugin's `main.js` `module.exports.commands` 
     * [Basic Example](https://www.adobe.io/xd/uxp/develop/tutorials/quick-start/#4-create-your-plugins-code)
     */
    export interface CommandHandler {
        (selection: Selection, root:RootNode): void
    }

    /**
     * @since XD 28
     * 
     * Returns the scenenode in this document that has the given node GUID. Returns undefined if no such node exists connected to the scenegraph tree (detached/orphan nodes will not be found). This provides a fast way of persistently remembering a node across plugin operations and even across document open/closes.
     * 
     * @param guid SceneNode GUID -- must be all lowercase, as returned by the guid getter
     */
    export function getNodeByGUID(guid:string): SceneNode

}
