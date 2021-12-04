declare module 'scenegraph' {
    /**
     * [ScrollableGroup on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/ScrollableGroup/)
     * 
     * @since XD 30
     *
     * ScrollableGroup nodes are content that users can interactively scroll around. Content is viewed through a viewport, with everything else clipped. If a ScrollableGroup is set to only scroll on one axis, on the other axis the viewport is automatically sized to exactly fit the bounds of the content so nothing is clipped.
     * 
     * The scroll distance range is defined by a scrollable area rectangle which is the union of the viewport and the bounds of all the content. This can include some blank space, if the content is initially positioned not filling the entire viewport.
     */
    export class ScrollableGroup extends SceneNode {
    
        /** 
         * The type of scrolling: one of ScrollableGroup.VERTICAL, HORIZONTAL and PANNING. PANNING enables scrolling on both axes. 
         */
        scrollingType: 'VERTICAL' | 'HORIZONTAL' | 'PANNING' // string

        /** 
         * The viewport is a rectangle whose bounds are defined explicitly on scrolling axes and fit automatically to the content on non-scrolling axes:
         * - On a scrolling axis, the bounds are specified in local coordinates using the viewport values specified here.
         * - On a non-scrolling axis, the bounds are automatically calculated to exactly fit the content (just like the blue selection rectangle seen when you select a plain Group).
         * 
         * For example, if scrollingType == VERTICAL, the top of the viewport is viewport.offsetY in the ScrollableGroup's local coordinates, the bottom of the viewport is viewport.offsetY + viewport.viewportHeight in local coordinates, and horizontally there is no viewport clipping -- the entire current localBounds range is visible. The viewport object will only contain offsetY and viewportHeight properties in this case.
         */
        viewport: HorizontalScrollViewport | VerticalScrollViewport | PanningScrollViewport
    }

    export interface HorizontalScrollViewport { viewportWidth: number, offsetX: number }
    export interface VerticalScrollViewport { viewportHeight: number, offsetY: number }
    export interface PanningScrollViewport { viewportWidth: number, offsetX: number, viewportHeight: number, offsetY: number }
}