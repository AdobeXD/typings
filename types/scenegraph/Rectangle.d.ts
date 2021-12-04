declare module 'scenegraph' {
    /**
     * [Rectangle on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Rectangle/)
     *
     * Rectangle leaf node shape, with or without rounded corners. Like all shape nodes, has no fill or stroke by default unless you set one.
     */
    export class Rectangle extends GraphicNode {
    
        /**
         * value must be >= 0
         */
        width: number;

        /**
         * value must be >= 0
         */
        height: number;

        /**
         * Default: `{topLeft:0, topRight:0, bottomRight:0, bottomLeft:0}`
         * The actual corner radius that is rendered is capped based on the size of the rectangle even if the radius value set here is higher (see {@link effectiveCornerRadii})
         * To set all corners to the same value, use {@link setAllCornerRadii}
         */
        cornerRadii: CornerRadii

        /**
         * True if any of the Rectangle’s four corners is rounded (corner radius > 0).
         */
        readonly hasRoundedCorners: boolean;

        /**
         * Set the rounding radius of all four corners of the Rectangle to the same value. The actual corner radius that is rendered is capped based on the size of the rectangle even if the radius value set here is higher (see {@link effectiveCornerRadii})
         * To set the corners to different radius values, use {@link cornerRadii}.
         */
        setAllCornerRadii(radius: number): void;

        /**
         * The actual corner radius that is rendered may be capped by the size of the rectangle. Returns the actual radii that are currently in effect, which may be smaller than the {@link cornerRadii} values as a result.
         */
        effectiveCornerRadii: CornerRadii


    }

    export type CornerRadii = {
        topLeft: number;
        topRight: number;
        bottomRight: number;
        bottomLeft: number;
    }
}