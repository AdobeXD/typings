import { AngularGradient, Blur, Color, ImageFill, LinearGradient, RadialGradient, Shadow } from "scenegraph";
import { SceneNodeClass } from "./SceneNode";

/**
 * [GraphicNode on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/GraphicNode/)
 *
 * Base class for nodes that have a stroke and/or fill. This includes leaf nodes such as Rectangle, as well as BooleanGroup which is a container node. If you create a shape node, it will not be visible unless you explicitly give it either a stroke or a fill.
 */
export class GraphicNode extends SceneNodeClass {
    
    /**
     * @updated XD 42
     * @default null
     * 
     * The fill applied to this shape, if any. If this property is null or fillEnabled is false, no fill is drawn. Freshly created nodes have no fill by default.
     *
     * For Line objects, fill is ignored. For Text objects, only solid Color fill values are allowed.
     *
     * To modify an existing fill, always be sure to re-invoke the fill setter rather than just changing the fill object’s properties inline. See “Properties with object values”.
     *
     * Known issue: When modifying a gradient fill object specifically, you must clone the gradient returned by the getter before modifying it, to avoid issues with Undo history.
     */
    fill: Color | LinearGradient | RadialGradient | AngularGradient | ImageFill | null;

    /**
     * If false, the fill is not rendered. The user can toggle this via a checkbox in the Properties panel.
     */
    fillEnabled: boolean;

    /**
     * The stroke color applied to this shape, if any. If this property is null or strokeEnabled is false, no stroke is drawn. Freshly created nodes have no stroke by default. Artboard objects ignore stroke settings.
     *
     * Depending on the strokeWidth and strokePosition, the path outline of a node may need to be positioned on fractional pixels in order for the stroke itself to be crisply aligned to the pixel grid. For example, if a horizontal line uses a 1px center stroke, the line’s y should end in .5 to keep the stroke on-pixel.
     *
     * To modify an existing stroke, always be sure to re-invoke the stroke setter rather than just changing the Color object’s properties inline. See “Properties with object values”.
     */
    stroke: Color | null;

    /**
     * If false, the stroke is not rendered. The user can toggle this via a checkbox in the Properties panel.
     */
    strokeEnabled: boolean;

    /**
     * Thickness in pixels of the stroke.
     * value must be >= 0
     */
    strokeWidth: number;

    /**
     * @default `CENTER_STROKE` for most shapes, `INNER_STROKE` for Rectangle, Ellipse & Polygon
     * Position of the stroke relative to the shape’s path outline: GraphicNode.INNER_STROKE, OUTER_STROKE, or CENTER_STROKE.
     */
    strokePosition: 'INNER_STROKE' | 'OUTER_STROKE' | 'CENTER_STROKE' // string;
    static readonly INNER_STROKE = 'INNER_STROKE';
    static readonly OUTER_STROKE = 'OUTER_STROKE';
    static readonly CENTER_STROKE = 'CENTER_STROKE';

    /**
     * For Lines and non-closed Paths, how the dangling ends of the stroke are rendered: GraphicNode.STROKE_CAP_NONE, STROKE_CAP_SQUARE, or STROKE_CAP_ROUND.
     */
    strokeEndCaps: 'STROKE_CAP_NONE' | 'STROKE_CAP_SQUARE' | 'STROKE_CAP_ROUND' // string;
    static readonly STROKE_CAP_NONE = 'STROKE_CAP_NONE';
    static readonly STROKE_CAP_SQUARE = 'STROKE_CAP_SQUARE';
    static readonly STROKE_CAP_ROUND = 'STROKE_CAP_ROUND';

    /**
     * How sharp corners in the shape are rendered: GraphicNode.STROKE_JOIN_BEVEL, STROKE_JOIN_ROUND, or STROKE_JOIN_MITER.
     */
    strokeJoins: 'STROKE_JOIN_BEVEL' | 'STROKE_JOIN_ROUND' | 'STROKE_JOIN_MITER' // string;
    static readonly STROKE_JOIN_BEVEL = 'STROKE_JOIN_BEVEL';
    static readonly STROKE_JOIN_ROUND = 'STROKE_JOIN_ROUND';
    static readonly STROKE_JOIN_MITER = 'STROKE_JOIN_MITER';

    /**
     * value must be >= 0
     */
    strokeMiterLimit: number;

    /**
     * Empty array indicates a solid stroke. If non-empty, values represent the lengths of rendered and blank segments of the stroke’s dash pattern, repeated along the length of the stroke. The first value is the length of the first solid segment. If the array is odd length, the items are copied to double the array length. For example, [3] produces the same effect as [3, 3].
     *
     * The appearance of each segment’s start/end follows the strokeEndCaps setting.
     */
    strokeDashArray: Array<number>;

    /**
     * Ignored unless strokeDashArray is non-empty. Shifts the “phase” of the repeating dash pattern along the length of the stroke.
     */
    strokeDashOffset: number;

    /**
     * The node’s dropshadow, if any. If there is no shadow applied, this property may be null or shadow.visible may be false.
     */
    shadow: Shadow | null;

    /**
     * The node’s object blur or background blur settings, if applicable. If there is no blur effect applied, this property may be null or blur.visible may be false.
     */
    blur: Blur | null;

    /**
     * Returns a representation of the node’s outline in SVG <path> syntax. Note that only nodes with strokePosition == GraphicNode.CENTER_STROKE can be faithfully rendered in actual SVG using the exact pathData shown here.
     */
    readonly pathData: string;

    /**
     * True if the node’s image fill comes from a link to an external resource, such as Creative Cloud Libraries.
     */
    readonly hasLinkedGraphicFill: boolean;
}