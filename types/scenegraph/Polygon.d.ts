import { GraphicNode } from "scenegraph";

/**
 * [Polygon on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Polygon/)
 *
 * @since XD 19
 * 
 * Leaf node shape that is a polygon with 3 or more sides. May also have rounded corners. The sides are not necessarily all equal in length: this is true only when the Polygon's width and height matches the aspect ratio of a regular (equilateral) polygon with the given number of sides.
 *
 * When unrotated, the Polygon always has its bottommost side as a perfectly horizontal line - with the exception of the 4-sided Polygon, which is a diamond shape instead.
 *
 * Like all shape nodes, has no size, fill, or stroke by default unless you set one.
 */
export class Polygon extends GraphicNode {
    
    /**
     * > 0
     */
    width: number;

    /**
     * > 0
     */
    height: number;

    /**
     * @default 3
     * Number of corners (vertices), and also therefore number of sides.
     *
     * Setting cornerCount on an existing Polygon behaves in one of two different ways:
     * * If the shape's aspect ratio gives it equilateral sides, the sides remain equilateral while the size and aspect ratio of the shape is changed to accommodate.
     * * Otherwise, the size and aspect ratio of the shape remains unchanged.
     *
     * This matches how changing the corner count in XD's UI behaves.
     *
     * To change corner count while guaranteeing the shape will not change size, save its original size first, set `cornerCount`, and      then set size back to the saved values.
     */
    cornerCount: number;

    /**
     * List of corner radius for each corner of the polygon. To set corner radius, use setAllCornerRadii().
     */
    readonly cornerRadii: number[]

    /**
     * True if any of the Polygon's corners is rounded (corner radius > 0).
     */
    readonly hasRoundedCorners: boolean;

    /**
     * Set the corner radius of all corners of the Polygon to the same value.
     * radius
     */
    setAllCornerRadii(radius: number): void;

    /**
     * 1.0 to 100.0
     * 
     * @default 100
     * 
     * @since XD 26
     * 
     * Determines how prominent the shape's star points are. The default value of 100 is a normal convex polygon (not a star at all). For a star shape, consider that the outer vertices at the tips of the points all lie on a circle and the inner vertices between the points all lie on a second, smaller circle. The starRatio is the ratio of the smaller circle's diameter to the outer circle's diameter, expressed as a percentage.
     */
    starRatio: number

}