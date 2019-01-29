import {Artboard, SceneNode} from "scenegraph";

export {};

declare global {
    /**
     * Imports classes from a module (e.g. ```const { Text } = require('scenegraph'); ```)
     * @param module The module name
     */
    function require(module: string): void;

    let module: {exports:any};

    /**
     * Represents the children of a scenenode. Typically accessed via the SceneNode.children property.
     */
    class SceneNodeList {
        public items: SceneNode[];
        public readonly length: number;

        public forEach(
            callback: (sceneNode: SceneNode, index: number) => void,
            thisArg?: object
        ): void;

        public forEachRight(
            callback: (sceneNode: SceneNode, index: number) => void,
            thisArg?: object
        ): void;

        public filter(
            callback: (sceneNode: SceneNode, index: number) => boolean,
            thisArg?: object
        ): Array<SceneNode>;

        public map(
            callback: (sceneNode: SceneNode, index: number) => any,
            thisArg?: object
        ): Array<any>;

        public some(
            callback: (sceneNode: SceneNode, index: number) => boolean,
            thisArg?: object
        ): boolean;

        public at(index: number): SceneNode | null;
    }

    /**
     * The selection object represents the currently selected set of nodes in the UI. You can set the selection to use it as input for commands, or to determine what is left selected for the user when your plugin’s edit operation completes.
     *
     * The current selection state is passed to your command handler function as an argument.
     *
     * The selection can only contain items within the current edit context:
     *
     *  - If the user has drilled down into a container node, the container is the current edit context and only its immediate children can be selected.
     *  - If the user hasn’t drilled into any container, the root of the document is the edit context, and the selection may contain any artboard or any combination of the pasteboard’s immediate children and one or more artboards’ immediate children. The selection cannot contain both artboards and non-artboards at the same time, however.
     *
     * Note that when in the root edit context, the selection can contain items with multiple different parents.
     *
     * Items that are locked cannot be in the selection. If the user or your plugin attempts to select any locked items, they are automatically filtered into a separate list (itemsIncludingLocked) which is generally only used by the Unlock command.
     */
    interface Selection {
        /**
         * Array representing the current selection. Empty array if nothing is selected (never null). Never includes locked nodes.
         *
         * As a convenience, the setter also accepts a single node or null as valid input. However, the getter always returns an array.
         *
         * If the user selects nodes one-by-one, by Shift-clicking, this array lists the nodes in the order they were added to the selection.
         *
         * Returns a fresh array each time, so this can be mutated by the caller without interfering with anything. Mutating the array does not change the selection - only invoking the ‘items’ setter changes selection.
         */
        items: Array<SceneNode>;
        /**
         * Array representing the current selection plus any locked items that the user has attempted to select.
         */
        itemsIncludingLocked: Array<SceneNode>;
        /**
         * True if the selection isn’t empty and consists of one or more non-Artboards. Never true at the same time as hasArtboards.
         */
        hasArtwork: boolean;
        /**
         * True if the selection isn’t empty and consists of one or more Artboards. Never true at the same time as hasArtwork.
         */
        hasArtboards: boolean;
        /**
         * The context in which selection and edit operations must occur. If the user hasn’t drilled into any container node, this value is the document root, and its scope includes all immediate children of the pasteboard (including Artboards), and all immediate children of all those Artboards.
         */
        editContext: SceneNode;
        /**
         * The preferred parent to insert newly added content into. Takes into account the current edit context as well as the “focused artboard” if in the root context.
         */
        insertionParent: SceneNode;
        /**
         * The artboard the user is currently most focused on (via recent selection or edit operations). May be null, for example if no artboards exist or if the user just deleted an artboard.
         */
        focusedArtboard: Artboard | null | undefined;

    }

    /**
     * To get an instance: `require("uxp").shell`
     */
    class Shell {
        /**
         * Opens the url in an the system browser.
         * @param url The url which should be opened
         */
        public openExternal(url: string);
    }


    declare class Color {
        /**
         * Integer 0-255. Get/set the alpha channel value.
         */
        public a: number;

        /**
         * Integer 0-255. Get/set the red channel value.
         */
        public r: number;

        /**
         * Integer 0-255. Get/set the green channel value.
         */
        public g: number;

        /**
         * Integer 0-255. Get/set the blue channel value.
         */
        public b: number;

        /**
         * Creates a new color instance.
         * @param value String in CSS color format (hex, rgb, rgba, hsl, hsla, hsv, hsva, or color name); or ARGB numeric value (unsigned 32-bit integer); or object with r, g, b, a keys all set to integers from 0 - 255 (if a is omitted, 255 is used).
         * @param opacity Optional, floating-point value from 0 - 1. Use when value parameter doesn't specify an opacity and you don't want the default 1.0 (100%) opacity.
         */
        public constructor(value: string | { r: number, g: number, b: number, a?: number }, opacity?: number);

        /**
         * Convert to an object with r, g, b, a keys where r, g, b, a range from 0 - 255.
         */
        public toRgba(): { r: number, g: number, b: number, a: number };

        /**
         * Convert to hex string with "#" prefix. Ignores the Color's alpha value. Returns a 3-digit string if possible, otherwise returns a 6-digit string.
         * @param forceSixDigits True if you want the result to always have 6 digits.
         */
        public toHex(forceSixDigits: boolean): string;

        /**
         * Returns a clone of the current color object
         */
        public clone(): Color;
    }

    declare class LinearGradientFill {
        /**
         * Array of objects representing each color and its position along the gradient line. The position (stop value) is a number 0.0 - 1.0.
         */
        public colorStops: {color:Color,stop:number}[];

        /**
         * X position of the start of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        public startX: number;

        /**
         * Y position of the start of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        public startY: number;

        /**
         * X position of the end of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        public endX: number;

        /**
         * Y position of the end of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        public endY: number;

        /**
         * Create a new LinearGradientFill instance.
         */
        public constructor();

        /**
         * Returns a copy of this instance.
         */
        public clone(): LinearGradientFill;

        /**
         * Returns an array of [startX, startY, endX, endY].
         */
        public getEndPoints(): number[];

        /**
         * Shorthand for setting all four start/endpoint properties.
         * @param startX
         * @param startY
         * @param endX
         * @param endY
         */
        public setEndPoints(startX: number, startY: number, endX: number, endY: number);
    }

    /**
     * **The RadialGradientFill type is not documented and its API may change. Plugins currently cannot modify or otherwise work with radial gradients.**
     */
    declare class RadialGradientFill {
        // TODO: Waiting for documentation to arrive
    }

    declare class ImageFill {
        /**
         * The image is stretched (distorting its aspect ratio) so its edges line up exactly with the edges of the shape. (Similar to `object-fit: fill` in CSS).
         */
        public static SCALE_STRETCH: string;
        /**
         * The image's aspect ratio is preserved and it it scaled to completely cover the area of the shape. This means on one axis the image's edges line up exactly with the edges of the shape, and on the other axis the image extends beyond the shape's bounds and is cropped. (Similar to `object-fit: cover` in CSS).
         */
        public static SCALE_COVER: string;

        /**
         * How the image is scaled when the aspect ratio of the shape does not match the aspect ratio of the image:
         * * ImageFill.SCALE_STRETCH - The image is stretched (distorting its aspect ratio) so its edges line up exactly with the edges of the shape. (Similar to `object-fit: fill` in CSS).
         * * ImageFill.SCALE_COVER - The image's aspect ratio is preserved and it it scaled to completely cover the area of the shape. This means on one axis the image's edges line up exactly with the edges of the shape, and on the other axis the image extends beyond the shape's bounds and is cropped. (Similar to `object-fit: cover` in CSS).
         *
         * Image size and scaling are also affected by cropping settings, but these are not yet exposed to plugins.
         *
         * To change this property, use cloneWithOverrides.
         */
        public scaleBehaviour: string;

        /**
         * Format the image data was originally encoded in, such as `image/gif` or `image/jpeg`.
         */
        public readonly mimeType: string;

        /**
         * True if the image comes from a link to an external resource, such as Creative Cloud Libraries.
         */
        public readonly isLinkedContent: boolean;

        /**
         * Pixel dimensions of the underlying bitmap image data.
         */
        public readonly naturalWidth: number;

        /**
         * Pixel dimensions of the underlying bitmap image data.
         */
        public readonly naturalHeight: number;

        /**
         *
         * @param fileOrDataURI File object pointing to an image file; or a string containing a data: URI with a base-64 encoded image.
         */
        public constructor(fileOrDataURI: string | File);

        /**
         * @returns a new copy of this ImageFill.
         */
        public clone(): ImageFill;
    }


    declare class Shadow {
        /**
         * X offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
         */
        public x: number;

        /**
         * Y offset of the shadow relative to the shape it is attached to, in global coordinates (i.e. independent of the shape's rotation or any parent's rotation). May be negative.
         */
        public y: number;
        public blur: number;
        public color: Color;

        /**
         * If false, the shadow is not rendered. The user can toggle this via a checkbox in the Properties panel.
         */
        public visible: boolean;

        /**
         * Creates a drop shadow style object with the given properties.
         * @param x
         * @param y
         * @param blur
         * @param color
         * @param visible optional and defaults to true.
         */
        public constructor(x: number, y: number, blur: number, color: Color, visible: boolean)
    }

    declare class Blur {
        /**
         * The amount of blur
         *
         * (0 - 50)
         */
        public blurAmount: number;
        /**
         * For background blur effects, the amount to increase or decrease the brightness of the background. Ignored for object blur effects.
         *
         * (-50 - 50)
         */
        public brightnessAmount: number;

        /**
         * For background blur effects, the a multiplier on the opacity of the object's fill drawn over top of the blurred background. Useful to create a color tint on top of the blurred background. Does not affect stroke opacity.
         *
         * Ignored for object blur effects.
         *
         * (0.0 - 1.0)
         */
        public fillOpacity: number;
        /**
         * If true, renders a background blur effect: all objects beneath the shape are blurred (modulated by brightnessAmount), but the shape itself is still rendered with crisp edges (with its fill modulated by fillOpacity).
         *
         * If false, renders an object blur effect: the shape itself is blurred, and objects beneath it are unaffected.
         */
        public isBackgroundEffect: boolean;

        /**
         * If false, the blur effect is not rendered. The user can toggle this via a checkbox in the Properties panel.
         */
        public visible: boolean;

        /**
         * Creates an object blur or background blur effect object with the given properties.
         * @param blurAmount
         * @param brightnessAmount
         * @param fillOpacity
         * @param visible
         * @param isBackgroundEffect
         */
        constructor(blurAmount: number, brightnessAmount: number, fillOpacity: number, visible?: boolean, isBackgroundEffect?: boolean);
    }


    declare class Matrix {
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
        public constructor(a: number, b: number, c: number, d: number, e: number, f: number);

        /**
         * Copies another matrix's values into this matrix.
         * @param otherMatrix The matrix to copy values from.
         */
        public setFrom(otherMatrix: Matrix);

        /**
         * Returns a copy of the matrix
         */
        public clone(): Matrix;

        /**
         * Multiplies a passed affine transform to the right: this * M. The result effectively applies the transform of the passed in matrix first, followed by the transform of this matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         * @param b The b component of an affine transform.
         * @param c The c component of an affine transform.
         * @param d The d component of an affine transform.
         * @param e The e component of an affine transform.
         * @param f The f component of an affine transform.
         */
        public add(aOrOtherMatrix: number, b: number, c: number, d: number, e: number, f: number);

        /**
         * Multiplies a passed affine transform to the right: this * M. The result effectively applies the transform of the passed in matrix first, followed by the transform of this matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         */
        public add(aOrOtherMatrix: Matrix);

        /**
         * Multiplies a passed affine transform to the left: M * this. The result effectively applies the transform of this matrix first, followed by the transform of the passed in matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         * @param b The b component of an affine transform.
         * @param c The c component of an affine transform.
         * @param d The d component of an affine transform.
         * @param e The e component of an affine transform.
         * @param f The f component of an affine transform.
         */
        public multLeft(aOrOtherMatrix: number, b: number, c: number, d: number, e: number, f: number);

        /**
         * Multiplies a passed affine transform to the left: M * this. The result effectively applies the transform of this matrix first, followed by the transform of the passed in matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         */
        public multLeft(aOrOtherMatrix: Matrix);

        /**
         * Returns an inverted version of the matrix. Returns a brand new matrix - does not modify this matrix object.
         */
        public invert(): Matrix;

        /**
         * Applies translation before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         * @param tx horizontal offset distance
         * @param ty vertical offset distance
         */
        public translate(tx: number, ty: number): Matrix;

        /**
         * Applies scaling before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         *
         * Note: scale transforms are not generally permitted in XD.
         * @param sx amount to be scaled, with 1 resulting in no change
         * @param sy amount to scale along the vertical axis. (Otherwise sx applies to both axes.)
         * @param cx horizontal origin point from which to scale (if unspecified, scales from the local coordinates' origin point)
         * @param cy vertical origin point from which to scale
         */
        public scale(sx: number, sy?: number, cx?: number, cy?: number): Matrix;

        /**
         * Applies clockwise rotation before the current transform of this matrix, as if using the add() method. Modifies this matrix object and also returns it so calls can be chained.
         * @param angle angle of rotation, in degrees clockwise
         * @param cx horizontal origin point from which to rotate (if unspecified, scales from the local coordinates' origin point)
         * @param cy vertical origin point from which to rotate
         */
        public rotate(angle: number, cx?: number, cy?: number): Matrix;

        /**
         * Returns x coordinate of the given point after transformation described by this matrix. See also Matrix.y and Matrix.transformPoint.
         * @param x
         * @param y
         */
        public x(x: number, y: number): number;

        /**
         * Returns y coordinate of the given point after transformation described by this matrix. See also Matrix.x and Matrix.transformPoint.
         * @param x
         * @param y
         */
        public y(x: number, y: number): number;

        /**
         * Returns x & y coordinates of the given point after transformation described by this matrix.
         * @param point
         */
        public transformPoint(point: Point): Point;

        /**
         * Transforms a rectangle using this matrix, returning the axis-aligned bounds of the resulting rectangle. If this matrix has rotation, then the result will have different width & height from the original rectangle, due to axis alignment. See "Coordinate Spaces" for some illustrations of this.
         * @param rect
         */
        public transformRect(rect: Bounds): Bounds;

        /**
         * @return The translation component of this matrix: [tx, ty]. Equals the `e` and `f` components of this matrix.
         */
        public getTranslate(): number[];

        /**
         * Split the matrix into scale factors. This method assumes that there is no skew in the matrix.
         */
        public scaleFactors(): {scaleX:number,scaleY:number};

        /**
         * Returns a new matrix that contains only the translate and rotate components of the current matrix, with the given scale factors stripped out. Must be passed the exact scale factors returned by scaleFactors() for this matrix, and this matrix must have no skew/shear component.
         *
         * Returns a brand new matrix - does not modify this matrix object.
         * @param scaleX horizontal scale component to remove
         * @param scaleY vertical scale component to remove
         */
        public removedScaleMatrix(scaleX: number, scaleY: number): Matrix;

        /**
         * @return true, if the matrix includes any skew (shear)
         */
        public hasSkew(): boolean;
    }
}
