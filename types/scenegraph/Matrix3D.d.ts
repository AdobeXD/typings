import { Bounds, Matrix, Point, Point3D } from "scenegraph";

/**
 * [Matrix3D on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Matrix3D/)
 */
export class Matrix3D {
    
    /**
     * Creates a new 3D transform matrix with the following structure:
     * 
     * ```
     * |  a   c  m02  e |
     * |  b   d  m12  f |
     * | m20 m21 m22 mz |
     * |  0   0   0   1 |
     * ```
     */
    constructor(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
        m20: number,
        m21: number,
        m02: number,
        m12: number,
        m22: number,
        z: number
    )

    /**
     * Create a new Matrix3D object starting from the given Matrix2D or Matrix3D parameter.
     */
    newFrom(m: Matrix | Matrix3D): Matrix3D

    /**
     * Copies another matrix's values into this matrix.
     */
    setFrom(otherMatrix: Matrix | Matrix3D): void

    /**
     * Clone the matrix
     */
    clone(): Matrix3D

    /**
     * Safely add a mixture of Matrix and Matrix3D without dropping the 3D part.
     *
     * Returns the addition result which is Matrix if both were Matrix, and Matrix3D otherwise.
     */
    add(m1: Matrix | Matrix3D, m2: Matrix | Matrix3D): Matrix | Matrix3D

    /**
     * Clears the 3D components of this matrix. Functionally equivalent to converting to a 2D matrix and then back to a 3D one.
     */
    clear3D(): void

    /**
     * Returns true if we have 3D components in this matrix.
     *
     * Check if this matrix has 3D components. An efficient of checking if new Matrix3D().setFrom(this.toMatrix()) !== this
     */
    strictHas3D(): boolean

    /**
     * Check if this matrix has 3D components, with an epsilon. Returns true if we have 3D components in this matrix.
     */
    has3D(): boolean

    /**
     * Set the 2D components of this matrix and clear the 3D ones.
     */
    set6(a: number, b: number, c: number, d: number, e: number, f: number): void

    /**
     * Set the identity matrix.
     */
    setIdentity(): void

    /**
     *
     */
    isIdentity(): boolean

    /**
     *
     */
    isInvertible(): boolean

    /**
     *
     */
    invert(): Matrix3D

    /**
     *
     */
    setConcat(a: Matrix3D, b: Matrix3D): Matrix3D

    /**
     *
     */
    multRight(a: number, b: number, c: number, d: number, e: number, f: number): Matrix3D

    /**
     *
     */
    multLeft(a: number, b: number, c: number, d: number, e: number, f: number): Matrix3D

    /**
     *
     */
    translate(tx: number, ty: number, tz: number): Matrix3D

    /**
     *
     */
    translateLeft(tx: number, ty: number, tz: number): Matrix3D

    /**
     *
     */
    translateWithPoint(point: Point | Point3D): Matrix3D

    /**
     * Get the translate component of this matrix, as an array.
     */
    getTranslate(): Array<any> // ???

    /**
     *
     */
    scale(scale: number, sy?: number, sz?: number): Matrix3D

    /**
     *
     */
    rotate(a: number, x?: number, y?: number): Matrix3D

    /**
     *
     */
    rotateX(a: number): Matrix3D

    /**
     *
     */
    rotateY(a: number): Matrix3D

    /**
     *
     */
    x(x: number, y: number, z?: number): number

    /**
     *
     */
    y(x: number, y: number, z?: number): number

    /**
     *
     */
    z(x: number, y: number, z?: number): number

    /**
     *
     */
    transformPoint(point: Point): Point

    /**
     *
     */
    transformOrigin(): Point

    /**
     *
     */
    transformPoint3D(point: Point3D): Point3D

    /**
     *
     */
    transformRect(rect: Bounds): Bounds

    /**
     *
     */
    hasSkew(): boolean

    /**
     *
     */
    hasSkewXZ(): boolean

    /**
     *
     */
    hasSkewYZ(): boolean

    /**
     *
     */
    isTranslationOnly(): boolean

    /**
     *
     */
    getRotation(): number

    /**
     *
     */
    flip(
        flipInfo: { flipX: boolean, flipY: boolean },
        width?: number,
        height?: number
    ): void

    /**
     *
     */
    equals(otherMatrix: Matrix3D): boolean

    /**
     *
     */
    strictEquals(otherMatrix: Matrix3D): boolean

    /**
     *
     */
    toTransformString(): string

    /**
     *
     */
    roundToSinglePrecision(): Matrix3D

}