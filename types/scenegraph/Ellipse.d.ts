import { GraphicNode } from "scenegraph";

/**
 * Ellipse leaf node shape.
 */
export class Ellipse extends GraphicNode {
    radiusX: number;
    radiusY: number;
    /**
     * True if the Ellipse is a circle (i.e., has a 1:1 aspect ratio).
     */
    isCircle: boolean;
}