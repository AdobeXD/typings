declare module 'scenegraph' {
    /**
     * [RadialGradient on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/RadialGradient/)
     * 
     * @since XD 42
     * 
     * In a radial gradient, colors blend smoothly in a radius around a center point. The gradient fills the entire area of the shape it is applied to.
     */
    export class RadialGradient {

        /**
         * Create a new RadialGradient instance.
         */
        constructor()

        /**
         * Returns a copy of this instance.
         */
        clone(): RadialGradient

        /**
         * Array of objects representing each color and its position along the gradient line. The position (stop value) is a number 0.0 - 1.0.
         */
        colorStops: { stop: number, color: Color }[]

        /**
         * Number representing the gradient radius. The value is multiple of the object's bounding box with condition 0 ≤ endR.
         */
        endR: number

        /**
         * Returns a point (cx, cy) representing the gradient center. The values are multiple of the object's bounding box: 0 ≤ cx, cy ≤ 1 to position the gradient inside the object's bounding box, or the values may be < 0 or > 1 for a gradient outside the object's bounding box.
         */
        getCenterPoint(): Point

        /**
         * Method for setting the gradient center.
         */
        setCenterPoint(cx: number, cy: number): void

        /**
         * String representing the type of the gradient, in this case radial gradient.
         */
        type: string

    }
}