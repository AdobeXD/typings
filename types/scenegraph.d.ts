declare module 'scenegraph' {
    import {Interaction} from 'interactions';
    import {storage} from 'uxp';

    interface Point {
        x: number;
        y: number;
    }

    interface ScaleFactor {
        scaleX: number;
        scaleY: number;
    }

    /**
     * (**Since:** XD 29)
     *
     * Stores metadata accessible to multiple plugins, separated into silos by plugin ID. Your plugin can read & write the storage for its own plugin ID, but storage for other plugin IDs is *read-only*.
     *
     * Each per-plugin storage silo is a collection of key-value pairs. Keys and values must both be strings.
     *
     * *Each* scenenode has its own metadata storage, accessed via `SceneNode.sharedPluginData`. To store general metadata that is not specific to one scenenode, use `sharedPluginData` on the document's scenegraph root.
     * @example ```js
     * // This example shows how to save & retrieve rich JSON data in shared metadata storage.
     // See below for simpler examples of using individual APIs.
     const PLUGIN_ID = "<your manifest's plugin ID here>";
     let richObject = {
    list: [2, 4, 6],
    name: "Hello world"
 };
     node.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(richObject));

     // Later on...
     // (This could be in a different plugin, if it passes the original plugin's ID here)
     let jsonString = node.sharedPluginData.getItem(PLUGIN_ID, "richData");
     if (jsonString) {  // may be undefined
    let richObjectCopy = JSON.parse(jsonString);
    console.log(richObjectCopy.list.length);  // 3
 }
     */
    interface PerPluginStorage {
        /**
         * Returns a map where key is plugin ID and value is a nested map containing all the shared metadata for that plugin ID (i.e. the result of calling `getForPluginId()` with that ID).
         */
        getAll(): { [key: string]: { [key: string]: string } };

        /**
         * Returns a map of key-value string pairs containing all shared metadata stored on this node by the given plugin. May be an empty object (zero keys), but is never null.
         *
         * This map is a clone of the stored metadata, so modifying it has no effect.
         * @param pluginId
         *
         * @example
         *const MY_PLUGIN_ID = "<your manifest's plugin ID here>";
         let mySharedMetadata = node.sharedPluginData.getForPluginId(MY_PLUGIN_ID);
         console.log("My shared 'foo' & 'bar' values:",
         mySharedMetadata.foo, mySharedMetadata.bar);


         console.log("Plugin B's shared 'foo' value:",
         node.sharedPluginData.getForPluginId("B").foo);
         */
        getForPluginId(pluginId: string): { [key: string]: string };

        /**
         * Returns a list of all keys stored on this node by the given plugin. May be empty (length zero), but is never null.
         * @param pluginId
         *
         * @example
         * console.log("All properties stored by plugin A on this node:",
         node.sharedPluginData.keys("A"));
         */
        keys(pluginId: string): string[];

        /**
         * Returns the value stored under the given key on this node by the given plugin, or `undefined` if the plugin hasn't stored anything under the given key.
         *
         * Because metadata is stored separately per plugin, two plugins can store two different values under the same key.
         * @param pluginId
         * @param key
         *
         * @example
         * // These are two different values, stored independently per plugin
         console.log("Plugin A's 'foo' value:", node.sharedPluginData.getItem("A", "foo"));
         console.log("Plugin B's 'foo' value:", node.sharedPluginData.getItem("B", "foo"));
         */
        getItem(pluginId: string, key: string): string | undefined;

        /**
         * Set a metadata key which can be read by any other plugin.
         * @param pluginId *Must* be equal to your plugin's ID.
         * @param key
         * @param value If undefined, behaves as if you'd called `removeItem()` instead.
         *
         * @example
         const MY_PLUGIN_ID = "<your manifest's plugin ID here>";
         node.sharedPluginData.setItem(MY_PLUGIN_ID, "foo", "42");

         node.sharedPluginData.setItem("other_plugin_id", "foo", "42");
         // ^ ERROR: other plugin's metadata is read-only

         console.log(node.sharedPluginData.getItem(MY_PLUGIN_ID, "foo"));  // "42"
         */
        setItem(pluginId: string, key: string, value: string | undefined): void;

        /**
         * Clears a shared metadata key stored by your plugin.
         * @param pluginId *Must* be equal to your plugin's ID.
         * @param key
         * @example
         const MY_PLUGIN_ID = "<your manifest's plugin ID here>";
         node.sharedPluginData.setItem(MY_PLUGIN_ID, "foo", "42");
         console.log(node.sharedPluginData.getItem(MY_PLUGIN_ID, "foo"));  // "42"

         node.sharedPluginData.removeItem(MY_PLUGIN_ID, "foo");
         console.log(node.sharedPluginData.getItem(MY_PLUGIN_ID, "foo"));  // undefined
         */
        removeItem(pluginId: string, key: string): void;

        /**
         * Provided for convenience: you can `console.log(node.sharedPluginData)` to see the value of `getAll()`.
         */
        toString(): string;

        /**
         * Provided for convenience: you can include a `PerPluginStorage` object inside data you are going to convert to JSON, even though it is not a plain JavaScript object. Returns the same value as `getAll()`.
         */
        toJSON(): object;
    }

    /**
     * Represents the children of a scenenode. Typically accessed via the SceneNode.children property.
     */
    declare interface SceneNodeList {
        items: SceneNode[];
        readonly length: number;

        forEach(
            callback: (sceneNode: SceneNode, index: number) => void,
            thisArg?: object
        ): void;

        forEachRight(
            callback: (sceneNode: SceneNode, index: number) => void,
            thisArg?: object
        ): void;

        filter(
            callback: (sceneNode: SceneNode, index: number) => boolean,
            thisArg?: object
        ): Array<SceneNode>;

        map(
            callback: (sceneNode: SceneNode, index: number) => any,
            thisArg?: object
        ): Array<any>;

        some(
            callback: (sceneNode: SceneNode, index: number) => boolean,
            thisArg?: object
        ): boolean;

        at(index: number): SceneNode | null;
    }

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
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         * @param b The b component of an affine transform.
         * @param c The c component of an affine transform.
         * @param d The d component of an affine transform.
         * @param e The e component of an affine transform.
         * @param f The f component of an affine transform.
         */
        add(aOrOtherMatrix: number, b: number, c: number, d: number, e: number, f: number): void;

        /**
         * Multiplies a passed affine transform to the right: this * M. The result effectively applies the transform of the passed in matrix first, followed by the transform of this matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         */
        add(aOrOtherMatrix: Matrix): void;

        /**
         * Multiplies a passed affine transform to the left: M * this. The result effectively applies the transform of this matrix first, followed by the transform of the passed in matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         * @param b The b component of an affine transform.
         * @param c The c component of an affine transform.
         * @param d The d component of an affine transform.
         * @param e The e component of an affine transform.
         * @param f The f component of an affine transform.
         */
        multLeft(aOrOtherMatrix: number, b: number, c: number, d: number, e: number, f: number): void;

        /**
         * Multiplies a passed affine transform to the left: M * this. The result effectively applies the transform of this matrix first, followed by the transform of the passed in matrix second. Modifies this matrix object and also returns it so calls can be chained.
         * @param aOrOtherMatrix A Matrix or the a component of an affine transform.
         */
        multLeft(aOrOtherMatrix: Matrix): void;

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
         * Transforms a rectangle using this matrix, returning the axis-aligned bounds of the resulting rectangle. If this matrix has rotation, then the result will have different width & height from the original rectangle, due to axis alignment. See "Coordinate Spaces" for some illustrations of this.
         * @param rect
         */
        transformRect(rect: Bounds): Bounds;

        /**
         * @return The translation component of this matrix: [tx, ty]. Equals the `e` and `f` components of this matrix.
         */
        getTranslate(): number[];

        /**
         * Split the matrix into scale factors. This method assumes that there is no skew in the matrix.
         */
        scaleFactors(): ScaleFactor;

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

    export class Color {
        /**
         * Integer 0-255. Get/set the alpha channel value.
         */
        a: number;

        /**
         * Integer 0-255. Get/set the red channel value.
         */
        r: number;

        /**
         * Integer 0-255. Get/set the green channel value.
         */
        g: number;

        /**
         * Integer 0-255. Get/set the blue channel value.
         */
        b: number;

        /**
         * Creates a new color instance.
         * @param value String in CSS color format (hex, rgb, rgba, hsl, hsla, hsv, hsva, or color name); or ARGB numeric value (unsigned 32-bit integer); or object with r, g, b, a keys all set to integers from 0 - 255 (if a is omitted, 255 is used).
         * @param opacity Optional, floating-point value from 0 - 1. Use when value parameter doesn't specify an opacity and you don't want the default 1.0 (100%) opacity.
         */
        constructor(value: string | { r: number, g: number, b: number, a?: number }, opacity?: number);

        /**
         * Convert to an object with r, g, b, a keys where r, g, b, a range from 0 - 255.
         */
        toRgba(): { r: number, g: number, b: number, a: number };

        /**
         * Convert to hex string with "#" prefix. Ignores the Color's alpha value. Returns a 3-digit string if possible, otherwise returns a 6-digit string.
         * @param forceSixDigits True if you want the result to always have 6 digits.
         */
        toHex(forceSixDigits: boolean): string;

        /**
         * Returns a clone of the current color object
         */
        clone(): Color;
    }

    export class LinearGradient {
        /**
         * Array of objects representing each color and its position along the gradient line. The position (stop value) is a number 0.0 - 1.0.
         */
        colorStops: { color: Color, stop: number }[];

        /**
         * X position of the start of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        startX: number;

        /**
         * Y position of the start of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        startY: number;

        /**
         * X position of the end of the gradient line, as a multiple of the object's bounding box: X=0 indicates the left edge of the bounding box and X=1 indicates the right edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        endX: number;

        /**
         * Y position of the end of the gradient line, as a multiple of the object's bounding box: Y=0 indicates the top edge of the bounding box and Y=1 indicates the bottom edge. The gradient line may start or end outside the object's bounding box, so values may be < 0 or > 1.
         */
        endY: number;

        /**
         * Create a new LinearGradient instance.
         */
        constructor();

        /**
         * Returns a copy of this instance.
         */
        clone(): LinearGradient;

        /**
         * Returns an array of [startX, startY, endX, endY].
         */
        getEndPoints(): number[];

        /**
         * Shorthand for setting all four start/endpoint properties.
         * @param startX
         * @param startY
         * @param endX
         * @param endY
         */
        setEndPoints(startX: number, startY: number, endX: number, endY: number): void;
    }

    /**
     * **The RadialGradient type is not documented and its API may change. Plugins currently cannot modify or otherwise work with radial gradients.**
     */
    export class RadialGradient {
        // TODO: Waiting for documentation to arrive
    }

    export class ImageFill {
        /**
         * The image is stretched (distorting its aspect ratio) so its edges line up exactly with the edges of the shape. (Similar to `object-fit: fill` in CSS).
         */
        static SCALE_STRETCH: string;
        /**
         * The image's aspect ratio is preserved and it it scaled to completely cover the area of the shape. This means on one axis the image's edges line up exactly with the edges of the shape, and on the other axis the image extends beyond the shape's bounds and is cropped. (Similar to `object-fit: cover` in CSS).
         */
        static SCALE_COVER: string;

        /**
         * How the image is scaled when the aspect ratio of the shape does not match the aspect ratio of the image:
         * * ImageFill.SCALE_STRETCH - The image is stretched (distorting its aspect ratio) so its edges line up exactly with the edges of the shape. (Similar to `object-fit: fill` in CSS).
         * * ImageFill.SCALE_COVER - The image's aspect ratio is preserved and it it scaled to completely cover the area of the shape. This means on one axis the image's edges line up exactly with the edges of the shape, and on the other axis the image extends beyond the shape's bounds and is cropped. (Similar to `object-fit: cover` in CSS).
         *
         * Image size and scaling are also affected by cropping settings, but these are not yet exposed to plugins.
         *
         * To change this property, use cloneWithOverrides.
         */
        scaleBehaviour: string;

        // TODO: assetId: string (readonly?)
        /**
         * (**Since**: XD 29)
         *
         * A unique identifier for the image asset used by this ImageFill. May be shared by other ImageFills, including those with different cropping, size,
         rotation, or mirroring. If identical images are imported into XD from separate sources, they may have different `assetId`s however.
         */
        assetId: string;
        /**
         * Format the image data was originally encoded in, such as `image/gif` or `image/jpeg`.
         */
        readonly mimeType: string;

        /**
         * True if the image comes from a link to an external resource, such as Creative Cloud Libraries.
         */
        readonly isLinkedContent: boolean;

        /**
         * Pixel dimensions of the underlying bitmap image data.
         */
        readonly naturalWidth: number;

        /**
         * Pixel dimensions of the underlying bitmap image data.
         */
        readonly naturalHeight: number;

        /**
         *
         * @param fileOrDataURI File object pointing to an image file; or a string containing a data: URI with a base-64 encoded image.
         */
        constructor(fileOrDataURI: string | storage.File);

        /**
         * @returns a new copy of this ImageFill.
         */
        clone(): ImageFill;
    }


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

    export class Blur {
        /**
         * The amount of blur
         *
         * (0 - 50)
         */
        blurAmount: number;
        /**
         * For background blur effects, the amount to increase or decrease the brightness of the background. Ignored for object blur effects.
         *
         * (-50 - 50)
         */
        brightnessAmount: number;

        /**
         * For background blur effects, the a multiplier on the opacity of the object's fill drawn over top of the blurred background. Useful to create a color tint on top of the blurred background. Does not affect stroke opacity.
         *
         * Ignored for object blur effects.
         *
         * (0.0 - 1.0)
         */
        fillOpacity: number;
        /**
         * If true, renders a background blur effect: all objects beneath the shape are blurred (modulated by brightnessAmount), but the shape itself is still rendered with crisp edges (with its fill modulated by fillOpacity).
         *
         * If false, renders an object blur effect: the shape itself is blurred, and objects beneath it are unaffected.
         */
        isBackgroundEffect: boolean;

        /**
         * If false, the blur effect is not rendered. The user can toggle this via a checkbox in the Properties panel.
         */
        visible: boolean;

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

    export interface Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    /**
     * Base class of all scenegraph nodes. Nodes will always be an instance of some subclass of SceneNode.
     */
    export abstract class SceneNode {
        /**
         * Returns a unique identifier for this node that stays the same when the file is closed & reopened, or if the node is moved to a different part of the document. Cut-Paste will result in a new guid, however.
         *
         * The GUID is guaranteed unique _within_ the current document, but _other_ documents may contain the same GUID value. For example, if the user makes a copy of an XD file, both files will use the same GUIDs.
         *
         * The GUID of the root node changes if the document is duplicated via Save As. See `application.activeDocument.guid` for details.
         */
        readonly guid: string;
        /**
         * Returns the parent node. Null if this is the root node, or a freshly constructed node which has not been added to a parent yet.
         */
        readonly parent: SceneNode | null;
        /**
         * Returns a list of this node’s children. List is length 0 if the node has no children. The first child is lowest in the z order.
         * This list is not an Array, so you must use at(i) instead of [i] to access children by index. It has a number of Array-like methods such as forEach() for convenience, however.
         * The list is immutable. Use removeFromParent and addChild to add/remove child nodes.
         */
        readonly children: SceneNodeList;
        /**
         * True if the node’s parent chain connects back to the document root node.
         */
        readonly isInArtworkTree: boolean;
        /**
         * True if this node is a type that could have children (e.g. an Artboard, Group, Boolean Group, etc.).
         */
        readonly isContainer: boolean;
        /**
         * True if this node is part of the current selection. To change which nodes are selected, use selection.
         */
        readonly selected: boolean;

        /**
         * False if this node has been hidden by the user (eyeball toggle in Layers panel). If true, the node may still be invisible for other reasons: a parent or grandparent has visible=false, the node has opacity=0%, the node is clipped by a mask, etc.
         */
        visible: boolean;

        /**
         * (0.0-1.0)Node’s opacity setting. The overall visual opacity seen on canvas is determined by combining this value with the opacity of the node’s entire parent chain, as well as the opacity settings of its fill/stroke properties if this is a leaf node.
         */
        opacity: number;

        /**
         * Affine transform matrix that converts from the node’s local coordinate space to its parent’s coordinate space. The matrix never has skew or scale components, and if this node is an Artboard the matrix never has rotation either. Rather than working with the raw matrix directly, it may be easier to use methods such as placeInParentCoordinates or rotateAround.
         * Returns a fresh Matrix each time, so this can be mutated by the caller without interfering with anything. Mutating the returned Matrix does not change the node’s transform - only invoking the ‘transform’ setter changes the node. To modify an existing transform, always be sure to re-invoke the transform setter rather than just changing the Matrix object’s properties inline. See “Properties with object values”.
         * For an overview of node transforms & coordinate systems, see Coordinate spaces.
         */
        readonly transform: Matrix;

        /**
         * The translate component of this node’s transform. Since translation is applied after any rotation in the transform Matrix, translation occurs along the parent’s X/Y axes, not the node’s own local X/Y axes. This is equivalent to the e & f fields in the transform Matrix.
         * For an overview of node positioning & coordinate systems, see Coordinate spaces.
         */
        translation: Point;

        /**
         * The rotation component of this node’s transform, in clockwise degrees.
         * For an overview of node transforms & coordinate systems, see Coordinate spaces.
         */
        readonly rotation: number;

        /**
         * The node’s path bounds in document-global coordinate space (represented by a bounding box aligned with global X/Y axes). Path bounds match the selection outline seen in the XD, but exclude some visual parts of the node (outer stroke, drop shadow / blur, etc.).
         */
        readonly globalBounds: Bounds;

        /**
         * The node’s path bounds in its own local coordinate space. This coordinate space may be rotated and translated relative to the parent’s coordinate space. Path bounds match the selection outline seen in XD, but exclude some visual parts of the node (outerstroke, drop shadow / blur, etc.).
         * The visual top-left of a node’s path bounds is located at (localBounds.x, localBounds.y). This value is not necessarily (0,0) in the local coordinate space: for example, a text node’s baseline is at y=0 in local coordinates, so the top of the text has a negative y value.
         */
        readonly localBounds: Bounds;

        /**
         * The node’s path bounds in its parent’s coordinate space (represented by a bounding box aligned with the parent’s X/Y axes - so if the node has rotation, the top-left of the node is not necessarily located at the top-left of boundsInParent). Path bounds match the selection outline seen in XD, but exclude some visual parts of the node (outer stroke, drop shadow / blur, etc.).
         */
        readonly boundsInParent: Bounds;

        /**
         * The position of the node’s upper-left corner (localBounds.x, localBounds.y) in its parent’s coordinate space. If the node is rotated, this is not the same as the top-left corner of boundsInParent. This is a shortcut for node.transform.transformPoint({x: node.localBounds.x, y: node.localBounds.y})
         */
        readonly topLeftInParent: Point;

        /**
         * The position of the node’s centerpoint in its own local coordinate space. Useful as an argument to rotateAround. This is a shortcut for {x: localBounds.x + localBounds.width/2, y: localBounds.y + localBounds.height/2})
         */
        readonly localCenterPoint: Point;

        /**
         * The node’s draw bounds in document-global coordinate space. Draw bounds are larger than the selection outline seen in XD, including outer stroke, drop shadow / blur, etc. - every visible pixel of the node is encompassed by these bounds. This matches the image dimensions if the node is exported as a PNG/JPEG bitmap.
         */
        readonly globalDrawBounds: Bounds;

        /**
         * Node name as seen in the Layers panel. Also used as filename during export.
         *
         * Setting this property will cause `hasDefaultName` to become false.
         */
        name: string;

        /**
         * True if name is a generic, auto-generated string (e.g. “Rectangle 5”). False if name has been explicitly set.
         */
        readonly hasDefaultName: boolean;

        /**
         * True if the node is locked, meaning it cannot normally be selected.
         */
        locked: boolean;

        /**
         * True if the node should be included in the output of File > export > Batch and other bulk-export workflows.
         */
        markedForExport: boolean;

        /**
         * **Since**: XD 19
         *
         * True if the node stays in a fixed position while the Artboard's content is scrolling (when viewed in an interactive prototype). _Only applicable for nodes whose immediate parent is an Artboard._
         *
         * For other nodes, this property returns undefined and cannot be set. To determine whether those nodes scroll or remain fixed, walk up the parent chain and check this property on the topmost ancestor in the Artboard.
         */
        fixedWhenScrolling?: boolean;

        /**
         * Get all interactions that are triggered by this node in the document's interactive prototype. Each element in the array is an Interaction object which describes a gesture/event plus the action it produces.
         *
         * Note: If this node (or one of its ancestors) has `visible` = false, tap and drag interactions on it will not be triggered.
         *
         * Currently, this API excludes some types of interactions: keypress/gamepad, scrolling, hover, component state transitions, or non-speech audio playback.
         *
         * @example ```javascript
         * // Print all the interactions triggered by a node
         *node.triggeredInteractions.forEach(interaction => {
         *    console.log("Trigger: " + interaction.trigger.type + " -> Action: " + interaction.action.type);
         *});
         * ```
         *
         * @see interactions.allInteractions
         */
        readonly triggeredInteractions?: Array<Interaction>;

        /**
         * True if the node's appearance comes from a link to an external resource, such as Creative Cloud Libraries or a separate XD document (in the case of a Linked Component instance).
         */
        readonly hasLinkedContent: boolean;

        /**
         * **Since:** XD 14
         * Metadata specific to your plugin. Must be a value which can be converted to a JSON string, or undefined to clear the
         stored metadata on this node.    stored metadata on this node.
         *
         * Metadata is persisted with the document when it is saved. Duplicating a node (including across documents, via copy-paste)
         * will duplicate the metadata with it. If the node lies within a Component or Repeat Grid, all instances of the node will have
         * identical metadata (changes in one copy will automatically be synced to the other copy).
         *
         * To store general metadata for the document overall, set pluginData on the [root](#module_scenegraph-root) node of the scenegraph. Metadata on
         * the root node can be changed from _any_ edit context.
         *
         * Metadata stored in pluginData cannot be accessed by other plugins -- each plugin has its own isolated storage. To share metadata
         * with other plugins, use `sharedPluginData`.
         */
        pluginData: any;

        /**
         * (**Since**: XD 29)
         *
         * Metadata storage accessible by other plugins, separated into silos by plugin ID. Your plugin can read & write the storage for its own plugin ID,
         * but storage for other plugin IDs is *read-only*. This property returns a PerPluginStorage API object.
         *
         * *Each* scenenode has its own metadata storage. To store general metadata that is not specific to one scenenode, use `sharedPluginData` on the
         * [document's scenegraph root](scenegraph.md#module_scenegraph-root).
         *
         * Metadata is persisted with the document when it is saved. See `pluginData` for info on how metadata is duplicated when nodes are
         * copied or synced.
         *
         */
        sharedPluginData: PerPluginStorage;


        public static readonly BLEND_MODE_PASSTHROUGH: string;
        public static readonly BLEND_MODE_NORMAL: string;
        public static readonly BLEND_MODE_MULTIPLY: string;
        public static readonly BLEND_MODE_DARKEN: string;
        public static readonly BLEND_MODE_COLOR_BURN: string;
        public static readonly BLEND_MODE_LIGHTEN: string;
        public static readonly BLEND_MODE_SCREEN: string;
        public static readonly BLEND_MODE_COLOR_DODGE: string;
        public static readonly BLEND_MODE_OVERLAY: string;
        public static readonly BLEND_MODE_SOFT_LIGHT: string;
        public static readonly BLEND_MODE_HARD_LIGHT: string;
        public static readonly BLEND_MODE_DIFFERENCE: string;
        public static readonly BLEND_MODE_EXCLUSION: string;
        public static readonly BLEND_MODE_HUE: string;
        public static readonly BLEND_MODE_SATURATION: string;
        public static readonly BLEND_MODE_COLOR: string;
        public static readonly BLEND_MODE_LUMINOSITY: string;

        /**
         * (**Since**: XD 27)
         *
         * Blend mode determines how a node is composited onto the content below it.
         *
         * One of: `SceneNode.BLEND_MODE_PASSTHROUGH`, `BLEND_MODE_NORMAL`, `BLEND_MODE_MULTIPLY`, `BLEND_MODE_DARKEN`, `BLEND_MODE_COLOR_BURN`, `BLEND_MODE_LIGHTEN`, `BLEND_MODE_SCREEN`, `BLEND_MODE_COLOR_DODGE`, `BLEND_MODE_OVERLAY`, `BLEND_MODE_SOFT_LIGHT`,
         `BLEND_MODE_HARD_LIGHT`, `BLEND_MODE_DIFFERENCE`, `BLEND_MODE_EXCLUSION`, `BLEND_MODE_HUE`, `BLEND_MODE_SATURATION`, `BLEND_MODE_COLOR`, `BLEND_MODE_LUMINOSITY`.
         *
         *  _Note:_ for leaf nodes (GraphicNode), the XD UI may show leaf nodes as blend mode "Normal" even when the underlying value is `BLEND_MODE_PASSTHROUGH`. This is because "Pass Through" and "Normal" are essentially equivalent for leaf nodes -- they only differ
         *  in appearance when a node has children.
         *
         *  @example ```js
         *node.blendMode = scenegraph.SceneNode.BLEND_MODE_LUMINOSITY;
         *```
         */
        blendMode: string; // TODO: Implement the actual constant value possibilities

        public static readonly FIXED_LEFT: string;
        public static readonly FIXED_RIGHT: string;
        public static readonly FIXED_TOP: string;
        public static readonly FIXED_BOTTOM: string;
        public static readonly FIXED_BOTH: string;
        public static readonly POSITION_PROPORTIONAL: string;
        public static readonly SIZE_FIXED: string;
        public static readonly SIZE_RESIZES: string;

        /**
         * (**Since**: XD 29)
         *
         * Horizontal dynamic-layout settings used with the Responsive Resize feature. Setting this only determines how the node is updated when its parent is resized -- it does not change the node's current size or position.
         *
         * Both fields *must* be provided together when setting this property.
         *
         * Returns undefined if node's parent is a container where Responsive Resize is unavailable:
         * * Certain containers such as RepeatGrid and the pasteboard (scenegraph root) do not support Responsive Resize.
         * * Container may have Responsive Resize layout explicitly turned off (see `dynamicLayout` flag).
         *
         * Attempting to set this property when Responsive Resize is unavailable results in an error.
         *
         * Setting this property will cause `hasCustomConstraints` to become true.
         * @example ```js
         *let node = selection.items[0];
         *node.horizontalConstraints = { position: scenegraph.SceneNode.FIXED_LEFT, size: scenegraph.SceneNode.SIZE_FIXED };
         *```
         */
        horizontalConstraints: undefined | {
            /**
             * Horizontal position anchoring, one of `SceneNode.FIXED_LEFT`, `FIXED_RIGHT`, `FIXED_BOTH` or `POSITION_PROPORTIONAL`.<br><br>`FIXED_BOTH` sets fixed left & right offsets, so it always implies `size: SIZE_RESIZES` (similar to setting both `left` & `right` in CSS).<br><br>`POSITION_PROPORTIONAL` holds node position at a fixed percentage of the parent's width -- the same positioning behavior you'd get if Responsive Resize is turned off entirely.
             */
            postition: string,
            /**
             * Horizontal sizing behavior, either `SceneNode.SIZE_FIXED` or `SceneNode.SIZE_RESIZES`.<br><br>`SIZE_FIXED` cannot be used with `position: FIXED_BOTH`, since it is impossible to fix both left & right edges without resizing when the parent resizes.<br><br>`SIZE_RESIZES` can be used with any `position` setting. With `position: FIXED_BOTH`, the node's size always equals the parent's size minus the fixed left & right offsets. With other position settings, the node's size maintains a fixed percentage of the parent's size.
             */
            size: string
        };

        /**
         * (**Since**: XD 29)
         *
         * Vertical dynamic-layout settings used with the Responsive Resize feature. Setting this only determines how the node is updated when its parent is resized -- it does not change the node's current size or position.
         *
         * Both fields *must* be provided together when setting this property.
         *
         * See `horizontalConstraints` for other important notes.
         *
         * @example ```js
         *let node = selection.items[0];
         *node.verticalConstraints = { position: scenegraph.SceneNode.FIXED_TOP, size: scenegraph.SceneNode.SIZE_RESIZES };
         */
        verticalConstraints: undefined | {
            /**
             * Vertical position anchoring, one of `SceneNode.FIXED_TOP`, `FIXED_BOTTOM`, `FIXED_BOTH` or `POSITION_PROPORTIONAL`.<br><br>For details, see `horizontalConstraints` above.
             */
            postition: string,
            /**
             * Vertical sizing behavior, either `SceneNode.SIZE_FIXED` or `SceneNode.SIZE_RESIZES`.<br><br>For details, see `horizontalConstraints` above.
             */
            size: string
        };

        /**
         * (**Since**: XD 29)
         *
         * True if this node's Responsive Resize layout settings, which are normally automatically inferred by XD, have been overridden with specific desired values. Constraints on a node are either all overridden, or all automatic -- never mixed.
         *
         * If false, each time the parent resizes XD will automatically guess the best layout settings to used based on the current size & position of this node within its parent. You can use the `horizontalConstraints` and `verticalConstraints` getters to check what computed settings XD would use based on the node's current size & position.
         *
         * Automatically becomes true any time you set `horizontalConstraints` or `verticalConstraints`. To reset to false, call `resetToAutoConstraints()`.
         */
        readonly hasCustomConstraints: boolean;

        /**
         * (**Since**: XD 29)
         *
         * Erase any overridden Responsive Resize layout settings, restoring the default behavior where XD will automatically guess the best layout settings for this node the next time its parent is resized. This function does not change the node's *current* size & position, however.
         *
         * Calling this will cause `hasCustomConstraints` to become false.
         */
        resetToAutoConstraints(): void;

        /**
         * Remove this node from its parent, effectively deleting it from the document.
         */
        removeFromParent(): void;

        /**
         * Move the node by the given number of pixels along the parent’s X/Y axes (if this node has no rotation, this is identical to moving the node along its own local X/Y axes). This is equivalent to modifying the value returned by ‘translation’ and then setting it back.
         * For an overview of node positioning & coordinate systems, see Coordinate spaces.
         * @param {number} deltaX
         * @param {number} deltaY
         */
        moveInParentCoordinates(deltaX: number, deltaY: number): void;

        /**
         * Move the node so the given point in its local coordinates is placed at the given point in its parent’s coordinates (taking into account any rotation on this node, etc.).
         * For an overview of node positioning & coordinate systems, see Coordinate spaces.
         * @param {Point} registrationPoint Point in this node’s local coordinate space to align with parentPoint
         * @param {Point} parentPoint Point in this node’s parent’s coordinate space to move registrationPoint to
         */
        placeInParentCoordinates(
            registrationPoint: Point,
            parentPoint: Point
        ): void;

        /**
         * Rotate the node clockwise by the given number of degrees around the given point in the plugin’s local coordinate space. If this node already has nonzero rotation, this operation adds to its existing angle.
         * @param {number} deltaAngle In degrees.
         * @param {Point} rotationCenter Point to rotate around, in node’s local coordinates.
         */
        rotateAround(deltaAngle: number, rotationCenter: Point): void;

        /**
         * Attempts to change localBounds.width & height to match the specified sizes. This operation may not succeed, since some nodes are not resizable. Resizing one dimension may affect the other, if the node’s aspect ratio is locked.
         * @param {number} width
         * @param {number} height
         */
        resize(width: number, height: number): void;
    }

    /**
     * Base class for nodes that have a stroke and/or fill. This includes leaf nodes such as Rectangle, as well as BooleanGroup which is a container node. If you create a shape node, it will not be visible unless you explicitly give it either a stroke or a fill.
     */
    export class GraphicNode extends SceneNode {
        /**
         * The fill applied to this shape, if any. If this property is null or fillEnabled is false, no fill is drawn. Freshly created nodes have no fill by default.
         *
         * For Line objects, fill is ignored. For Text objects, only solid Color fill values are allowed.
         *
         * To modify an existing fill, always be sure to re-invoke the fill setter rather than just changing the fill object’s properties inline. See “Properties with object values”.
         *
         * Known issue: When modifying a gradient fill object specifically, you must clone the gradient returned by the getter before modifying it, to avoid issues with Undo history.
         */
        fill:
            | null
            | Color
            | LinearGradient
            | RadialGradient
            | ImageFill;

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
        stroke: null | Color;

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
        strokePosition: string;

        /**
         * For Lines and non-closed Paths, how the dangling ends of the stroke are rendered: GraphicNode.STROKE_CAP_NONE, STROKE_CAP_SQUARE, or STROKE_CAP_ROUND.
         */
        strokeEndCaps: string;

        /**
         * How sharp corners in the shape are rendered: GraphicNode.STROKE_JOIN_BEVEL, STROKE_JOIN_ROUND, or STROKE_JOIN_MITER.
         */
        strokeJoins: string;

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
        shadow: null | Shadow;

        /**
         * The node’s object blur or background blur settings, if applicable. If there is no blur effect applied, this property may be null or blur.visible may be false.
         */
        blur: null | Blur;

        /**
         * Returns a representation of the node’s outline in SVG <path> syntax. Note that only nodes with strokePosition == GraphicNode.CENTER_STROKE can be faithfully rendered in actual SVG using the exact pathData shown here.
         */
        readonly pathData: string;

        /**
         * True if the node’s image fill comes from a link to an external resource, such as Creative Cloud Libraries.
         */
        readonly hasLinkedGraphicFill: boolean;
    }

    /**
     * Artboard container node. All Artboards must be children of the root node (they cannot be nested), and they must be placed below all pasteboard content in the z order.
     *
     * Artboards can have a background fill, but the stroke, shadow, and blur settings are all ignored. Artboards cannot be locked or hidden, or have opacity < 100%.
     *
     * If a node is changed to overlap an Artboard, it will automatically become a child of the artboard when the operation finishes, and similar if a node is changed to no longer overlap an Artboard. It is not possible to have a node overlapping an Artboard that does not become a child of the artboard, or vice versa, a node that falls entirely outside an Artboard’s bounds but remains its child.
     */
    export class Artboard extends GraphicNode {
        /**
         * value must be >= 0
         */
        width: number;

        /**
         * For scrollable Artboards, this is the total height encompassing all content - not just the viewport size (i.e. screen height).
         *
         * value must be >= 0
         */
        height: number;

        /**
         * If Artboard is scrollable, this is the height of the viewport (e.g. mobile device screen size). Null if Artboard isn’t scrollable.
         */
        viewportHeight: null | number;

        /**
         * **Since**: XD 19
         *
         * Get all interactions whose destination is this artboard (either navigating the entire view, i.e. a `"goToArtboard"` action, or
         * showing this artboard as an overlay, i.e. an `"overlay"` action). Each element in the array is an [Interaction object](
         * /interactions.md#Interaction)
         * which describes a gesture/event plus the action it produces.
         *
         * May include interactions that are impossible to trigger because the trigger node (or one of its ancestors) has `visible` = false.
         *
         * Note: currently, this API excludes any applicable keyboard/gamepad interactions.
         * @see SceneNode.triggeredInteractions
         * @see interactions.allInteractions
         */
        readonly incomingInteractions: Array<{ triggerNode: SceneNode, interactions: Array<Interaction> }>;

        /**
         * **Since**: XD 19
         *
         * True if this is the starting Artboard seen when the interactive prototype is launched.
         *
         * @see interactions.homeArtboard
         */
        readonly isHomeArtboard: boolean;

        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
    }

    /**
     * Rectangle leaf node shape, with or without rounded corners. Like all shape nodes, has no fill or stroke by default unless you set one.
     */
    export class Rectangle extends GraphicNode {
        /**
         * value must be >= 0
         */
        width: number;

        /**
         * value must be >= 0
         */
        height: number;

        /**
         * Default: `{topLeft:0, topRight:0, bottomRight:0, bottomLeft:0}`
         * The actual corner radius that is rendered is capped based on the size of the rectangle even if the radius value set here is higher (see {@link effectiveCornerRadii})
         * To set all corners to the same value, use {@link setAllCornerRadii}
         */
        cornerRadii: {
            topLeft: number;
            topRight: number;
            bottomRight: number;
            bottomLeft: number;
        };

        /**
         * True if any of the Rectangle’s four corners is rounded (corner radius > 0).
         */
        readonly hasRoundedCorners: boolean;

        /**
         * The actual corner radius that is rendered may be capped by the size of the rectangle. Returns the actual radii that are currently in effect, which may be smaller than the {@link cornerRadii} values as a result.
         */
        effectiveCornerRadii: {
            topLeft: number;
            topRight: number;
            bottomRight: number;
            bottomLeft: number;
        };

        /**
         * Set the rounding radius of all four corners of the Rectangle to the same value. The actual corner radius that is rendered is capped based on the size of the rectangle even if the radius value set here is higher (see {@link effectiveCornerRadii})
         * To set the corners to different radius values, use {@link cornerRadii}.
         */
        setAllCornerRadii(radius: number): void;
    }

    /**
     * Ellipse leaf node shape.
     */
    export class Ellipse extends GraphicNode {
        radiusX: number;
        radiusY: number;
        /**
         * True if the Ellipse is a circle (i.e., has a 1:1 aspect ratio).
         */
        isCircle: boolean;
    }

    /**
     * Line leaf node shape.
     */
    export class Line extends GraphicNode {
        /**
         * Start point of the Line in local coordinate space.TEMP: To change the start point, use setStartEnd.
         */
        readonly start: Point;
        /**
         * Endpoint of the Line in local coordinate space.TEMP: To change the endpoint, use setStartEnd.
         */
        readonly end: Point;

        /**
         * Set the start and end points of the Line in local coordinate space. The values may be normalized by this setter, shifting the node’s translation and counter-shifting the start/end points. So the start/end setters may return values different from the values you passed this setter, even though the line’s visual bounds and appearance are the same.
         * @param {number} startX
         * @param {number} startY
         * @param {number} endX
         * @param {number} endY
         */
        setStartEnd(
            startX: number,
            startY: number,
            endX: number,
            endY: number
        ): void;
    }

    /**
     * Arbitrary vector Path leaf node shape.
     *
     * The path may not start at (0,0) in local coordinates, for example if it starts with a move (“M”)
     */
    export class Path extends GraphicNode {
        /**
         * Representation of the path outline in SVG <path> syntax. Unlike other node types, pathData is writable here. Syntax is automatically normalized, so the getter may return a slightly different string than what you passed to the setter.
         */
        pathData: string;
    }

    /**
     * **Since**: XD 19
     * Leaf node shape that is either a convex polygon _or_ a star shape. May have rounded corners. The sides are not necessarily all equal in length:
     *
     * When unrotated, a non-star Polygon always has its bottommost side as a perfectly horizontal line - with the exception of the 4-sided Polygon, which
     *
     * Like all shape nodes, has no size, fill, or stroke by default unless you set one.
     *
     * @example ```javascript
     // Add a red triangle to the document
     var polygon = new Polygon();
     polygon.cornerCount = 3;
     polygon.width = 50;
     polygon.height = 100;
     polygon.fill = new Color("red");
     selection.insertionParent.addChild(polygon);
     selection.items = [polygon];

     // Add a blue 5-pointed star with rounded corners
     var polygon = new Polygon();
     polygon.cornerCount = 5;
     polygon.starRatio = 55;
     polygon.setAllCornerRadii(4);
     polygon.width = 100;
     polygon.height = 95;
     polygon.fill = new Color("blue");
     selection.insertionParent.addChild(polygon);
     * ```
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
         * For a non-star shape, defines the number of corners (vertices), and also therefore number of sides. For a star shape, defines the
         number of star points -- there will be twice as many corners in total (the tips of the points _plus_ all the inside corners
         between the points).
         *
         * Setting `cornerCount` on an existing Polygon behaves in one of two different ways:
         * * If the shape's aspect ratio gives it equilateral sides, the sides remain equilateral while the size and aspect ratio of the
         *   shape are automatically changed as needed.
         * * Otherwise, the size and aspect ratio of the shape remain unchanged.
         *
         * This matches how changing the corner count in XD's UI behaves.
         *
         * To change corner count while guaranteeing the shape will not change size, save its original size first, set `cornerCount`, and      then set size back to the saved values.
         */
        cornerCount: number;

        /**
         * True if any of the Polygon's corners is rounded (corner radius > 0).
         */
        readonly hasRoundedCorners: boolean;

        /**
         * List of corner radius for each corner of the polygon. To set corner radius, use [<code>setAllCornerRadii()</code>](#Polygon-setAllCornerRadii).
         */
        cornerRadii: number[];

        /**
         * @default 100
         * (**Since**: XD 26)
         *
         * Determines how prominent the shape's star points are. The default value of 100 is a normal convex polygon (not a star at all).
         * For a star shape, consider that the outer vertices at the tips of the points all lie on a circle and the inner vertices
         * between the points all lie on a second, smaller circle. The `starRatio` is the ratio of the smaller circle's diameter to the
         * outer circle's diameter, expressed as a percentage.
         */
        starRatio: number;

        /**
         * Set the corner radius of all corners of the Polygon to the same value.
         * @param {number} radius
         */
        setAllCornerRadii(radius: number): void;
    }

    /**
     * BooleanGroup container node - although it has fill/stroke/etc. properties like a leaf shape node, it is a container with children. Its visual appearance is determined by generating a path via a nondestructive boolean operation on all its children’s paths.
     *
     * It is not currently possible for plugins to create a new BooleanGroup node, aside from using commands.duplicate to clone existing BooleanGroups.
     */
    export class BooleanGroup extends GraphicNode {
        /**
         * Which boolean operation is used to generate the path: BooleanGroup.PATH_OP_ADD, PATH_OP_SUBTRACT, PATH_OP_INTERSECT, or PATH_OP_EXCLUDE_OVERLAP.
         */
        readonly pathOp: string;

        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
    }

    /**
     * Text leaf node shape. Text can have a fill and/or stroke, but only a solid-color fill is allowed (gradient or image will will be rejected).
     *
     * There are two types of Text nodes:
     * - **Point Text** - Expands to fit the full width of the text content. Only uses multiple lines if the text content contains hard line breaks ("\n").
     * - **Area Text** - Fixed width and height. Text is automatically wrapped (soft line wrapping) to fit the width. If it does not fit the height, any remaining text is clipped. Check whether areaBox is null to determine the type of a Text node.
     *
     * The baseline of a Point Text node is at y=0 in its own local coordinate system. Horizontally, local x=0 is the anchor point that the text grows from / shrinks toward when edited. This anchor depends on the justification: for example, if the text is centered, x=0 is the horizontal centerpoint of the text.
     *
     * The bounds reported for a Text object leave enough space for descenders, uppercase letters, and accent marks, even if the current string does not contain any of those characters. This makes aligning text based on its bounds behave more consistently.
     */
    export class Text extends GraphicNode {
        /**
         * The plaintext content of the node, including any hard line breaks but excluding soft line wrap breaks.
         *
         * Setting text does not change styleRanges, so styles aligned with the old text’s string indices will continue to be applied to the new string’s indices unless you explicitly change styleRanges as well.
         */
        text: string;

        /**
         * Array of text ranges and their character style settings. Each range covers a set number of characters in the text content. Ranges are contiguous, with each one starting immediately after the previous one. Any characters past the end of the last range use the same style as the last range.
         *
         * When setting styleRanges, any fields missing from a given range default to the existing values from the last range in the old value of styleRanges. The styleRanges getter always returns fully realized range objects with all fields specified.
         */
        styleRanges: Array<{
            length: number;
            fontFamily: string;
            fontStyle: string;
            fontSize: number;
            fill: Color;
            charSpacing: number;
            underline: boolean;
            strikethrough: boolean;
            textTransform: string;
            textScript: string;
        }>;

        /**
         * If true, the text is drawn upside down.
         */
        flipY: boolean;

        /**
         * **Since:** XD 14
         * Set the font family across all style ranges, or get the font family of the last style range (font family of all the text if one range covers all the text). Plugins should not assume any particular default value for fontFamily.
         */
        fontFamily: string;

        /**
         * **Since:** XD 14
         * Set the font style across all style ranges, or get the font style of the last style range (font style of all the text if one range covers all the text).
         * @default non-italic normal weight style
         */
        fontStyle: string;

        /**
         * **Since:** XD 14
         * Font size in document pixels. Set the font size across all style ranges, or get the font size of the last style range (font size of all the text if one range covers all the text). Plugins should not assume any particular default value for fontSize.
         */
        fontSize: number;

        /**
         * Set the text color across all style ranges, or get the color of the last style range (color of all the text if one range covers all the text). Unlike most other nodes, text only allows a solid color fill - gradients and image fills are not supported.
         * @default null
         */
        fill: Color | null;

        /**
         * **Since:** XD 14
         * Character spacing in increments of 1/1000th of the fontSize, in addition to the font's default character kerning. May be negative.
         *
         * Set the character spacing across all style ranges, or get the character spacing of the last style range (character spacing of all the text if one range covers all the text).
         * @default 0
         */
        charSpacing: number;

        /**
         * **Since:** XD 14
         * Set underline across all style ranges, or get the underline of the last style range (underline of all the text if one range covers all the text).
         * @default false
         */
        underline: boolean;

        /**
         * @default false
         * **Since**: XD 19
         *
         * Set strikethrough across all style ranges, or get the strikethrough of the last style range (strikethrough of all the text if one range covers all the text).
         */
        strikethrough: boolean;

        /**
         * @default "none"
         * **Since**: XD 19
         *
         * Set textTransform ("none", "uppercase", "lowercase", or "titlecase") across all style ranges, or get the textTransform of the last style range.
         */
        textTransform: 'none' | 'uppercase' | 'lowercase' | 'titlecase';

        /**
         * @default "none"
         * **Since**: XD 20
         *
         * Set textScript ("none" or "superscript" or "subscript") across all style ranges, or get the textScript of the last style range.
         */
        textScript: 'none' | 'superscript' | 'subscript';

        static readonly ALIGN_LEFT: string;
        static readonly ALIGN_CENTER: string;
        static readonly ALIGN_RIGHT: string;

        /**
         * Horizontal alignment: Text.ALIGN_LEFT, ALIGN_CENTER, or ALIGN_RIGHT. This setting affects the layout of multiline text, and for point text it also affects how the text is positioned relative to its anchor point (x=0 in local coordinates) and what direction the text grows when edited by the user.
         *
         * Changing textAlign on existing point text will cause it to shift horizontally. To change textAlign while keeping the text in a fixed position, shift the text horizontally (moving its anchor point) to compensate:
         * @example ```javascript
         * let originalBounds = textNode.localBounds;
         * textNode.textAlign = newAlignValue;
         * let newBounds = textNode.localBounds;
         * textNode.moveInParentCoordinates(originalBounds.x - newBounds.x, 0);
         *
         * @default Text.ALIGN_LEFT
         */
        textAlign: string;

        /**
         * Distance between baselines in multiline text, in document pixels. The special value 0 causes XD to use the default line spacing defined by the font given the current font size & style.
         *
         * This property is not automatically adjusted when fontSize changes, if line spacing is not set to 0, the line spacing will stay fixed while the font size changes, shifting the spacing’s proportional relationship to font size. If the value is 0, then the rendered line spacing will change to match the new font size, since 0 means the spacing is dynamically calculated from the current font settings.
         *
         * @default 0
         */
        lineSpacing: number;

        /**
         * **Since:** XD 14
         *
         * Additional distance between paragraphs, in document pixels, added to the lineSpacing amount (soft line breaks in area text are separated only by lineSpacing, while hard line breaks are separated by lineSpacing + paragraphSpacing). Unlike lineSpacing, 0 is not a special value; it just means no added spacing.
         *
         * Similar to {@link lineSpacing}, this property is not automatically adjusted when fontSize changes. The paragraph spacing amount will stay fixed while the font size changes, shifting the spacing's proportional relationship to font size.
         *
         * @default 0
         */
        paragraphSpacing: number;

        /**
         * `Null` for point text. For area text, specifies the size of the rectangle within which text is wrapped and clipped.
         *
         * Changing point text to area text or vice versa will change the origin / anchor point of the text, thus changing its localBounds, but it will also automatically change the node's transform so its globalBounds and boundsInParent origins remain unchanged.
         *
         * Changing area text to point text will also automatically insert hard line breaks ("\n") into the text to match the previous line wrapping's appearance exactly.
         */
        areaBox: null | { width: number; height: number };

        /**
         * Always false for point text. For area text, true if the text does not fit in the content box and its bottom is being clipped.
         */
        readonly clippedByArea: boolean;
    }

    /**
     * Group nodes represent two types of simple containers in XD:
     * - Plain Groups, created by the Object > Group command
     * - Masked Groups, created by the Object > Mask With Shape command You can determine whether a group is masked by checking the mask property.
     *
     * Groups and other containers cannot be created directly using scenenode constructors, since you can’t add a populated Group to the scenegraph (you can’t add subtrees all at once) nor can you add an empty Group and then add children to it (can’t add nodes outside the scope of the current edit context). Instead, to create Groups and other nested structures, use commands.
     *
     * In a Mask Group, the mask shape is included in the group’s children list, at the top of the z order. It is not visible - only its path outline is used, for clipping the group.
     */
    export class Group extends SceneNode {
        /**
         * The mask shape applied to this group, if any. This object is also present in the group’s children list. Though it has no direct visual appearance of its own, the mask affects the entire groups’s appearance by clipping all its other content.
         */
        readonly mask: SceneNode | null;

        /**
         * (**Since:** XD 29)
         *
         * If true, Responsive Resize is enabled, and this node's children will use an intelligent layout algorithm whenever this node is resized.
         *
         * Returns undefined on node types that do not support Responsive Resize (such as RepeatGrid; see `horizontalConstraints` docs for a
         * complete list). Attempting to set this property on such node types results in an error.
         *
         * @see SceneNode.horizontalConstraints
         * @see SceneNode.verticalConstraints
         */
        dynamicLayout: undefined | boolean;

        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
    }

    /**
     * Container node representing one instance of a Component (previously known as "Symbols" in XD's UI). Changes made to the contents of a SymbolInstance are treated in one of two ways:
     * * If `isMaster` is **false**: The changes affect _only_ this one instance. This creates an "override": changes made to the corresponding part of the master later will no longer get synced to this particular instance.
     * * If `isMaster` is **true**: The changes are automatically synced to all other other instances of the component - _except_ for instances where the affected nodes have instance-specific overrides. As a result, your plugin's batch of edits **may not be applied atomically** in some instances.
     *
     * To elaborate: if your plugin command makes edits to more than one property or more than one node as part of a single gesture, and the  user invokes your plugin while editing a component master, other instances of the component may receive only a _partial application_  of your plugin's changes. In many cases this will feel like a natural consequence of the overrides the user has created, but if this  partial application of your plugin's intended changes feels too confusing in your use case, you may opt to warn users or disable some  of your plugin's functionality when `selection.editContext` is (or is inside of) a component with `isMaster` true.
     *
     * Note that overrides vary somewhat in granularity. In some but not all cases, overriding one property may also prevent other properties on the same node from receiving future updates from the master instance.
     *
     * It is not currently possible for plugins to *create* a new component definition or a new SymbolInstance node, aside from using `require('commands').duplicate` to clone existing SymbolInstances.
     */
    export class SymbolInstance extends SceneNode {
        /**
         * An identifier unique within this document that is shared by all instances of the same component.
         */
        readonly symbolId: string;

        /**
         * True if this is the "master" instance of the component, which forms the template for all new instances. When the user edits the master, those changes are synced to all other instances of the component (unless blocked by "overrides"
         * @see SymbolInstance
         */
        readonly isMaster: boolean;

        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
    }

    /**
     * Repeat Grid container node containing multiple grid cells, each one a child Group. Changes within one cell are automatically synced to all the other cells - with certain exceptions, called "overrides." A Repeat Grid also defines a rectangular clipping mask which determines how may cells are visible (new cells are automatically generated as needed if the Repeat Grid is resized larger).
     * Each grid cell is a Group that is an immediate child of the RepeatGrid. These groups are automatically created and destroyed as needed when the RepeatGrid is resized.
     * It is not currently possible for plugins to create a new RepeatGrid node, aside from using commands.duplicate to clone existing RepeatGrids.
     */
    export class RepeatGrid extends SceneNode {
        /**
         * Defines size of the RepeatGrid. Cells are created and destroyed as necessary to fill the current size. Cells that only partially fit will be clipped.
         */
        width: number;

        /**
         * Defines size of the RepeatGrid. Cells are created and destroyed as necessary to fill the current size. Cells that only partially fit will be clipped.
         */
        height: number;

        /**
         * Number of grid columns
         */
        numColumns: number;

        /**
         * Number of grid rows
         */
        numRows: number;

        /**
         * Horizontal spacing between grid cells/columns
         */
        paddingX: number;

        /**
         * Vertical spacing between grid cells/rows
         */
        paddingY: number;

        /**
         * The size of each grid cell. The size of each cell’s content can vary slightly due to text overrides; the cell size is always set to the width of the widest cell content and the height of the tallest cell content.
         */
        cellSize: { width: number; height: number };

        /**
         * Attach a sequence of text values to the instances of a given text node across all the cells of a Repeat Grid. The sequence is repeated as necessary to cover all the grid cells. This is a persistent data binding, so if the Repeat Grid is resized later to increase the number of grid cells, items from this sequence will be used to fill the text values of the new cells.
         * You can call this API from either of two different edit contexts:
         * - Edit context is the parent node of this RepeatGrid (i.e. a context where the RepeatGrid could be selected)
         * - Edit context is the RepeatGrid cell which is the parent of textNode (i.e. a context where textNode could be selected)
         * @param {Text} textNode A Text node exemplar that is an immediate child of one of this RepeatGrid's cells. The data series will be bound to this text node and all corresponding copies of it in the other grid cells.
         * @param {string[]} textValues Array of one or more strings. Empty strings are ignored.
         */
        attachTextDataSeries(textNode: Text, textValues: string[]): void;

        /**
         * Attach a sequence of image fills to the instances of a given shape node across all the cells of a Repeat Grid. The sequence is repeated as necessary to cover all the grid cells. This is a persistent data binding, so if the Repeat Grid is resized later to increase the number of grid cells, items from this sequence will be used to set the image fill in the new cells.
         * You can call this API from either of two different edit contexts:
         * - Edit context is the parent node of this RepeatGrid (i.e. a context where the RepeatGrid could be selected)
         * - Edit context is the RepeatGrid cell which is the parent of shapeNode (i.e. a context where shapeNode could be selected)
         * @param {GraphicNode} shapeNode A shape node exemplar that is an immediate child of one of this RepeatGrid's cells. The image series will be bound to this node and all corresponding copies of it in the other grid cells. Must be a node type that supports image fills (e.g. Rectangle, but not Text or Line).
         * @param {string[]} images Array of one or more ImageFills.
         */
        attachImageDataSeries(shapeNode: GraphicNode, images: string[]): void;

        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
    }

    /**
     * Container node whose content is linked to an external resource, such as Creative Cloud Libraries. It cannot be edited except by first ungrouping it, breaking this link.
     */
    export class LinkedGraphic extends SceneNode {
    }

    export interface RootNode extends RootNodeClass {
    }

    /**
     * Class representing the root node of the document. All Artboards are children of this node, as well as any pasteboard content that does not lie within an Artboard. Artboards must be grouped contiguously at the bottom of this node’s z order. The root node has no visual appearance of its own.
     */
    declare class RootNodeClass extends SceneNode {
        /**
         * Adds a child node to this container node. You can only add leaf nodes this way; to create structured subtrees of content, use commands.
         * @param {SceneNode} node Child to add
         * @param {number} index Optional: index to insert child at. Child is appended to end of children list (top of z order) otherwise.
         */
        addChild(node: SceneNode, index?: number): void;

        /**
         * Inserts a child node after the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately after this existing child
         */
        addChildAfter(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Inserts a child node before the given reference node.
         * @param {SceneNode} node Child to add
         * @param {SceneNode} relativeTo New child is added immediately before this existing child
         */
        addChildBefore(node: SceneNode, relativeTo: SceneNode): void;

        /**
         * Removes all children from this node. Equivalent to calling removeFromParent() on each child in turn, but faster.
         */
        removeAllChildren(): void;
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

    /**
     * (**Since**: XD 28)
     *
     * Returns the scenenode in this document that has the given node GUID. Returns undefined if no such node exists connected
     * to the scenegraph tree (detached/orphan nodes will not be found). This provides a fast way of persistently remembering a node across plugin
     * operations and even across document open/closes.
     * @param guid SceneNode GUID -- must be all lowercase, as returned by the [`guid` getter](#SceneNode-guid).
     *
     * @example ```js
     let node = scenegraph.selection.items[0];
     let guid = node.guid;
     // ...later on:
     let sameNode = scenegraph.getNodeByGUID(guid);
     if (sameNode) {
   // ^ Always check if node still exists - user may have deleted it
   console.log("Found node again!", sameNode);
}
     ```
     */
    export function getNodeByGUID(guid: string): SceneNode | undefined;


    export {}; // Avoid exporting SceneNodeClass and RootNodeClass
}
