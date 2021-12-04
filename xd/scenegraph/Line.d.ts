declare module 'scenegraph' {
    /**
     * [ImageFill on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/ImageFill/)
     * 
     * Line leaf node shape. Lines have a stroke but no fill.
     */
    export class Line extends GraphicNode {
    
        /**
         * Start point of the Line in local coordinate space. To change the start point, use setStartEnd.
         */
        readonly start: Point;
        /**
         * Endpoint of the Line in local coordinate space. To change the endpoint, use setStartEnd.
         */
        readonly end: Point;

        /**
         * Set the start and end points of the Line in local coordinate space. The values may be normalized by this setter, shifting the node’s translation and counter-shifting the start/end points. So the start/end setters may return values different from the values you passed this setter, even though the line’s visual bounds and appearance are the same.
         */
        setStartEnd(
            startX: number,
            startY: number,
            endX: number,
            endY: number
        ): void;
    }
}