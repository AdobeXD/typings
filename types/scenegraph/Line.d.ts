import { GraphicNode, Point } from "scenegraph";

/**
 * Line leaf node shape.
 */
export class Line extends GraphicNode {
    /**
     * Start point of the Line in local coordinate space.TEMP: To change the start point, use setStartEnd.
     */
    readonly start: Point;
    /**
     * Endpoint of the Line in local coordinate space.TEMP: To change the endpoint, use setStartEnd.
     */
    readonly end: Point;

    /**
     * Set the start and end points of the Line in local coordinate space. The values may be normalized by this setter, shifting the node’s translation and counter-shifting the start/end points. So the start/end setters may return values different from the values you passed this setter, even though the line’s visual bounds and appearance are the same.
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     */
    setStartEnd(
        startX: number,
        startY: number,
        endX: number,
        endY: number
    ): void;
}