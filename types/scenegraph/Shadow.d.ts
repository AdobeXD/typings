import { Color } from "scenegraph";

export class Shadow {
    /**
     * X offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
     */
    x: number;

    /**
     * Y offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
     */
    y: number;
    blur: number;
    color: Color;

    /**
     * If false, the shadow is not rendered. The user can toggle this via a checkbox in the Properties panel.
     */
    visible: boolean;

    /**
     * Creates a drop shadow style object with the given properties.
     * @param x
     * @param y
     * @param blur
     * @param color
     * @param visible optional and defaults to true.
     */
    constructor(x: number, y: number, blur: number, color: Color, visible: boolean)
}