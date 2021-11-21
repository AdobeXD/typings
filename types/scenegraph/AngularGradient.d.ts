import { Color } from "scenegraph"

/** 
 * [AngularGradient on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/AngularGradient/) 
 * @since XD 42
 * In an angular (also known as "conical") gradient, colors blend together in a sweeping pattern around a shape from the center of a circle. The gradient fills the entire area of the shape it is applied to.
 */
export class AngularGradient {
    /** Create a new AngularGradient instance. */
    constructor()

    /** Returns a copy of this instance. */
    clone(): AngularGradient;

    /** 
     * Array of objects representing each color and its position along the gradient circle. 
     * The position (stop value) is a number 0.0 - 1.0. 
     * 
     * Example
     * ```js
     * let gradient = new AngularGradient();
     * gradient.colorStops = [{ stop: 0, color: new Color("Red") },
     *     { stop: 1, color: new Color("Blue") }];
     * selection.items[0].fill = gradient;
     * ```
     */
    colorStops: Array<{ stop: number, color: Color }>

    /** X position of the center of the gradient circle, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient circle center may start or end outside the object's bounding box, so values may be < 0 or > 1. */
    startX: number

    /** Y position of the center of the gradient circle, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient circle center may start or end outside the object's bounding box, so values may be < 0 or > 1. */
    startY: number

    /** Returns an array of [startX, startY, endX, endY]. */
    getEndPoints(): Array<number>

    /** Method for setting all four start/endpoint properties. (endX, endY) point is the end of the gradient circle radius. */
    setEndPoints(startX: number, startY: number, endX: number, endY: number): void

    /** Rotation of the gradient in degrees. */
    rotation: number

    /** String representing the type of the gradient, in this case angular gradient. */
    type: string

}
