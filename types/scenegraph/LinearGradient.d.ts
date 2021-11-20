import { Color } from "scenegraph";

export class LinearGradient {
    /**
     * Array of objects representing each color and its position along the gradient line. The position (stop value) is a number 0.0 - 1.0.
     */
    colorStops: { color: Color, stop: number }[];

    /**
     * X position of the start of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
     */
    startX: number;

    /**
     * Y position of the start of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
     */
    startY: number;

    /**
     * X position of the end of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
     */
    endX: number;

    /**
     * Y position of the end of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
     */
    endY: number;

    /**
     * Create a new LinearGradient instance.
     */
    constructor();

    /**
     * Returns a copy of this instance.
     */
    clone(): LinearGradient;

    /**
     * Returns an array of [startX, startY, endX, endY].
     */
    getEndPoints(): number[];

    /**
     * Shorthand for setting all four start/endpoint properties.
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     */
    setEndPoints(startX: number, startY: number, endX: number, endY: number): void;
}