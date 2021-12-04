declare module 'scenegraph' {
    /**
     * [Path on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Path/)
     * 
     * Arbitrary vector Path leaf node shape. Paths can be open or closed, and a Path may include multiple disjoint sections (a.k.a. a "compound path"). Even open Paths may have a fill - the fill is drawn as if the Path were closed with a final "Z" segment.
     *
     * The path may not start at (0,0) in local coordinates, for example if it starts with a move ("M") segment.
     */
    export class Path extends GraphicNode {

        /**
         * Representation of the path outline in SVG <path> syntax. Unlike other node types, pathData is writable here. Syntax is automatically normalized, so the getter may return a slightly different string than what you passed to the setter.
         */
        pathData: string;
    
    }
}