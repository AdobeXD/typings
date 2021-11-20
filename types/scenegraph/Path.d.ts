import { GraphicNode } from "scenegraph";

/**
 * Arbitrary vector Path leaf node shape.
 *
 * The path may not start at (0,0) in local coordinates, for example if it starts with a move (“M”)
 */
export class Path extends GraphicNode {
    /**
     * Representation of the path outline in SVG <path> syntax. Unlike other node types, pathData is writable here. Syntax is automatically normalized, so the getter may return a slightly different string than what you passed to the setter.
     */
    pathData: string;
}