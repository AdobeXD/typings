
declare module 'scenegraph' {
    import { XDSelection } from 'selection';
    import { RootNode } from 'RootNode'

    export interface Point {
        x: number;
        y: number;
    }
    export interface Point3D extends Point{
        z: number;
    }

    export interface Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    /**
     * **Since:** XD 14
     * Object representing the current selection state and edit context. Also available as the first argument passed to your plugin command handler function.
     */
    export const selection: XDSelection;

    /**
     * **Since:** XD 14
     * Root node of the current document's scenegraph. Also available as the second argument passed to your plugin command handler function.
     */
    export const root: RootNode;

    export { AngularGradient } from 'AngularGradient'
    export { Artboard } from 'Artboard'
    export { Blur } from 'Blur'
    export { BooleanGroup } from 'BooleanGroup'
    export { Color } from 'Color'
    export { Ellipse } from 'Ellipse'
    export { GraphicNode } from 'GraphicNode'
    export { Group } from 'Group'
    export { ImageFill } from 'ImageFill'
    export { InnerShadow } from 'InnerShadow'
    export { Line } from 'Line'
    export { LinearGradient } from 'LinearGradient'
    export { LinkedGraphic } from 'LinkedGraphic'
    export { Lottie } from 'Lottie'
    export { Matrix } from 'Matrix'
    export { Matrix3D } from 'Matrix3D'
    export { Path } from 'Path'
    export { PerPluginStorage } from 'PerPluginStorage'
    export { Polygon } from 'Polygon'
    export { RadialGradient } from 'RadialGradient'
    export { Rectangle } from 'Rectangle'
    export { RepeatGrid } from 'RepeatGrid'
    export { RootNode } from 'RootNode'
    export { SceneNode } from 'SceneNode'
    export { SceneNodeList } from 'SceneNodeList'
    export { ScrollableGroup } from 'ScrollableGroup'
    export { Shadow } from 'Shadow'
    export { SymbolInstance } from 'SymbolInstance'
    export { Text } from 'Text'
    export { Video } from 'Video'

    export {}; // Avoid exporting SceneNodeClass and RootNodeClass
}
