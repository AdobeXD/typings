import { Interaction } from 'interactions';

declare module 'scenegraph' {
    /** 
     * [Artboard on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Artboard/)
     * 
     * Artboard container node. All Artboards must be children of the root node (they cannot be nested), and they must be placed below all pasteboard content in the z order.
     * 
     * Artboards can have a background fill, but the stroke, shadow, and blur settings are all ignored. Artboards cannot be locked or hidden, or have opacity < 100%.
     * 
     * Generally, all nodes that overlap an Artboard are children of that artboard, and nodes that don't overlap any Artboard are children of the root (pasteboard). XD ensures this automatically: if a node is modified in any way that changes whether it overlaps an Artboard, its parent will automatically be changed accordingly after the edit operation finishes. 
     */
    export class Artboard extends GraphicNode {

        /** 
         * > 0 
         */
        width: number // > 0

        /** 
         * > 0
         * 
         * For scrollable Artboards, this is the total height encompassing all content - not just the viewport size (i.e. screen height). 
         */
        height: number // > 0

        /** 
         * If Artboard is scrollable, this is the height of the viewport (e.g. mobile device screen size). Null if Artboard isn't scrollable. 
         */
        viewportHeight: number | null
    
        /**
         * @since XD 19
         * 
         * Get all interactions whose destination is this artboard (either navigating the entire view, i.e. a 'goToArtboard' action, or showing this artboard as an overlay, i.e. an 'overlay' action). Each element in the array is an Interaction object which describes a gesture/event plus the action it produces.
         * 
         * May include interactions that are impossible to trigger because the trigger node (or one of its ancestors) has visible = false.
         * 
         * Note: currently, this API excludes any applicable keyboard/gamepad interactions.
         */
        readonly incomingInteractions: { triggerNode: SceneNode, interactions: Interaction[] }[]

        /** 
         * @deprecated XD 33 - Please use flows which supports multiple flows.
         * 
         * @since XD 19 - True if this is the starting Artboard seen when the interactive prototype is launched.
         * 
         * @since XD 32 - In case there are multiple interactive prototype experiences (flows), implying multiple home artboards, this API returns true only for the top-left artboard among all of those home artboards.
         */
        readonly isHomeArtboard: boolean

    }
}