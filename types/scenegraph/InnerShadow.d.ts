declare module 'scenegraph' {
    /** [InnerShadow on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/InnerShadow/) */
    export class InnerShadow {
    
        constructor(x?: number, y?: number, blur?: number, color?: Color, visible?: boolean)

        /** https://www.adobe.io/xd/uxp/develop/reference/InnerShadow/#setshadow */
        setShadow(x?: number, y?: number, blur?: number, color?: Color, visible?: boolean): void

    }
}