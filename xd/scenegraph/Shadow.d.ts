declare module 'scenegraph' {
    /**
     * [Shadow on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Shadow/)
     */
    export class Shadow {
    
        /**
         * Creates a drop shadow style object with the given properties.
         */
        constructor(x: number, y: number, blur: number, color: Color, visible?: boolean)

        /**
         * X offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
         */
        x: number;

        /**
         * Y offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
         */
        y: number;

        /**
         * must be >= 0
         */
        blur: number;
    
        /** 
         * 
         */
        color: Color;

        /**
         * If false, the shadow is not rendered. The user can toggle this via a checkbox in the Properties panel.
         */
        visible: boolean;

    }
}