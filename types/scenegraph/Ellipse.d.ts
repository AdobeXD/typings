import { GraphicNode } from "scenegraph";

/**
 * [Ellipse on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Ellipse/)
 * 
 * Ellipse leaf node shape.
 */
export class Ellipse extends GraphicNode {
    radiusX: number;
    radiusY: number;
    /**
     * True if the Ellipse is a circle (i.e., has a 1:1 aspect ratio).
     */
    readonly isCircle: boolean;
}