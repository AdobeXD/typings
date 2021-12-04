declare module 'scenegraph' {
    /**
     * [Matrix on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Matrix/)
     */
    export class Matrix {
        /**
         * Creates a new transform matrix with the following structure:
         *
         * ```
         * | a c e |
         * | b d f |
         * | 0 0 1 |
         * ```
         *
         * Note: XD does not generally allow transform matrices with scale or shear (skew) components - only translate and rotate components are typically permitted.
         *
         * If no arguments, creates a new identity matrix by default.
         *
         * @param a
         * @param b
         * @param c
         * @param d
         * @param e
         * @param f
         */
        constructor(a: number, b: number, c: number, d: number, e: number, f: number);

        /**
         * Copies another matrix's values into this matrix.
         * @param otherMatrix The matrix to copy values from.
         */
        setFrom(otherMatrix: Matrix): void;

        /**
         * Returns a copy of the matrix
         */
        clone(): Matrix;

        /**
         * Multiplies a passed affine transform to the right: this * M. The result effectively applies the transform of the passed in matrix first, followed by the transform of this matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrMatrix A Matrix or the `a` component of an affine transform.
         * @param b The `b` component of an affine transform.
         * @param c The `c` component of an affine transform.
         * @param d The `d` component of an affine transform.
         * @param e The `e` component of an affine transform.
         * @param f The `f` component of an affine transform.
         */
        add(aOrMatrix: number | Matrix, b?: number, c?: number, d?: number, e?: number, f?: number): Matrix;

        /**
         * Multiplies a passed affine transform to the left: M * this. The result effectively applies the transform of this matrix first, followed by the transform of the passed in matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrMatrix A Matrix or the a component of an affine transform.
         * @param b The b component of an affine transform.
         * @param c The c component of an affine transform.
         * @param d The d component of an affine transform.
         * @param e The e component of an affine transform.
         * @param f The f component of an affine transform.
         */
        multLeft(aOrMatrix: number | Matrix, b?: number, c?: number, d?: number, e?: number, f?: number): Matrix;

        /**
         * Returns an inverted version of the matrix. Returns a brand new matrix - does not modify this matrix object.
         */
        invert(): Matrix;

        /**
         * Applies translation before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         * @param tx horizontal offset distance
         * @param ty vertical offset distance
         */
        translate(tx: number, ty: number): Matrix;

        /**
         * Applies scaling before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         *
         * Note: scale transforms are not generally permitted in XD.
         * @param sx amount to be scaled, with 1 resulting in no change
         * @param sy amount to scale along the vertical axis. (Otherwise sx applies to both axes.)
         * @param cx horizontal origin point from which to scale (if unspecified, scales from the local coordinates' origin point)
         * @param cy vertical origin point from which to scale
         */
        scale(sx: number, sy?: number, cx?: number, cy?: number): Matrix;

        /**
         * Applies clockwise rotation before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         * @param angle angle of rotation, in degrees clockwise
         * @param cx horizontal origin point from which to rotate (if unspecified, scales from the local coordinates' origin point)
         * @param cy vertical origin point from which to rotate
         */
        rotate(angle: number, cx?: number, cy?: number): Matrix;

        /**
         * Returns x coordinate of the given point after transformation described by this matrix. See also Matrix.y and Matrix.transformPoint.
         * @param x
         * @param y
         */
        x(x: number, y: number): number;

        /**
         * Returns y coordinate of the given point after transformation described by this matrix. See also Matrix.x and Matrix.transformPoint.
         * @param x
         * @param y
         */
        y(x: number, y: number): number;

        /**
         * Returns x & y coordinates of the given point after transformation described by this matrix.
         * @param point
         */
        transformPoint(point: Point): Point;

        /**
         * Transforms a rectangle using this matrix, returning the axis-aligned bounds of the resulting rectangle. If this matrix has rotation, then the result will have different width & height from the original rectangle, due to axis alignment. See 'Coordinate Spaces' for some illustrations of this.
         * @param rect
         */
        transformRect(rect: Bounds): Bounds;

        /**
         * @return The translation component of this matrix: [tx, ty]. Equals the `e` and `f` components of this matrix.
         */
        getTranslate(): number[]

        /**
         * Split the matrix into scale factors. This method assumes that there is no skew in the matrix.
         */
        scaleFactors(): { scaleX: number, scaleY: number };

        /**
         * Returns a new matrix that contains only the translate and rotate components of the current matrix, with the given scale factors stripped out. Must be passed the exact scale factors returned by scaleFactors() for this matrix, and this matrix must have no skew/shear component.
         *
         * Returns a brand new matrix - does not modify this matrix object.
         * @param scaleX horizontal scale component to remove
         * @param scaleY vertical scale component to remove
         */
        removedScaleMatrix(scaleX: number, scaleY: number): Matrix;

        /**
         * @return true, if the matrix includes any skew (shear)
         */
        hasSkew(): boolean;
    }
}
