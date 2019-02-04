import {Color, LinearGradientFill, RadialGradientFill} from "./scenegraph";

/**
 * Represents the document styles listed in the Assets panel. Styles can be added and removed manually by the user, so there's no guarantee that these styles are currently used anywhere in the document's content.
 * **Since: ** XD 15
 */
declare module assets {
    /**
     * Type of gradient color element: linear gradient or radial gradient
     */
    export enum GradientType {
        LINEAR,
        RADIAL
    }

    /**
     * Assets library entry representing a solid color.
     */
    type ColorAsset = {
        /**
         * Name of the Assets entry, if it is explicitly named. (The UI shows an auto-generated label for any unnamed assets).
         */
        name?: string;

        /**
         * Color of the asset
         */
        color: Color;
    }

    /**
     * Assets library entry representing a linear or radial gradient.
     */
    type GradientAsset = {
        /**
         * Name of the Assets entry, if it is explicitly named. (The UI shows an auto-generated label for any unnamed assets).
         */
        name?: string;
        /**
         * Either `GradientType.LINEAR` or `GradientType.RADIAL`
         */
        gradientType: GradientType;
        /**
         * Array of color stops used in the gradient, where stop >= 0 and <= 1, and the values are strictly increasing. Same format as the colorStops property of a LinearGradientFill object.
         */
        colorStops: Array<{ stop: number, color: Color }>
    }

    /**
     * Assets library entry representing a set of text character styles.
     */
    type CharacterStyleAsset = {
        /**
         * Name of the Assets entry, if it is explicitly named. (The UI shows an auto-generated label for any unnamed assets).
         */
        name?: string;
        /**
         * Object containing the style properties
         */
        style: CharacterStyle;
    }

    /**
     * Character style properties. See documentation for the Text node type for more details.
     */
    type CharacterStyle = {
        /**
         * the font family
         */
        fontFamily: string;
        /**
         * the style of the font
         */
        fontStyle: string;
        /**
         * the size of the font
         */
        fontSize: number;
        /**
         * the Color of the font fill
         */
        fill: Color;
        /**
         * the character spacing
         */
        charSpacing: number;
        /**
         * the line spacing
         */
        lineSpacing: number;
        /**
         * whether underline is turned on
         */
        underline: boolean;
    }

    /**
     * The collection of colors and gradients saved in this document's Asset library
     */
    declare static class colors {
        /**
         * Get a list of all color/gradient assets, in the order they appear in the Assets panel.
         *
         * The list may contain a mix of solid Color assets and/or gradient assets. If there are no color/gradient assets, an empty array is returned.
         *
         * @example
         *  var assets = require("assets"),
         *  allColors = assets.colors.get();
         *
         */
        public static get(): Array<ColorAsset | GradientAsset>;

        /**
         * Add color/gradient assets to the collection.
         *
         * The list may contain a mix of solid Color assets and/or gradient assets. Items are not added if a duplicate color/gradient already exists in the collection, *regardless of its name*.
         * @param colorAssets The color assets
         * @returns {number} number of assets added (may be less than requested if duplicates already exist)
         */
        public static add(colorAssets: Color | ColorAsset | LinearGradientFill | RadialGradientFill | GradientAsset | Array<Color | ColorAsset | LinearGradientFill | RadialGradientFill | GradientAsset>): number;

        /**
         * Delete color/gradient assets from the collection.
         *
         * The list may contain a mix of solid Color assets and/or gradient assets. Assets with the same color/gradient are removed even if their names differ. Assets that already don't exist in the collection are silently ignored. Typically you will pass asset objects returned from `get()` directly to this function.
         *
         * @param colorAssets The color assets
         * @returns {number} number of assets deleted (may be less than requested if some didn't exist)
         */
        public static delete(colorAssets: Color | ColorAsset | LinearGradientFill | RadialGradientFill | GradientAsset | Array<Color | ColorAsset | LinearGradientFill | RadialGradientFill | GradientAsset>): number;
    }

    /**
     * The collection of character styles saved in this document's Assets library.
     */
    declare static class characterStyles {
        /**
         * Get a list of all character style assets, in the order they appear in the Assets panel.
         *
         * If there are no character style assets, an empty array is returned.
         *
         * @example
         *  var assets = require("assets"),
         *  allCharacterStyles = assets.characterStyles.get();
         *
         */
        public static get(): Array<CharacterStyleAsset>;

        /**
         * Add one or more character style assets to the collection.
         *
         * Items are not added if a duplicate character style already exists in the collection, regardless of its name. All character style properties must be fully specified (no properties are optional).
         *
         * @param charStyleAssets The character style assets
         * @returns {number} number of assets added (may be less than requested if duplicates already exist)
         */
        public static add(charStyleAssets: CharacterStyleAsset | Array<CharacterStyleAsset>): number;

        /**
         * Delete one or more character style assets from the collection.
         *
         * Assets with the same character style are removed even if their names differ. Assets that already don't exist in the collection are silently ignored. All character style properties must be fully specified (no properties are optional). Typically you will pass asset objects returned from `get()` directly to this function.
         *
         * @returns {number} number of assets deleted (may be less than requested if some didn't exist)
         * @param charStyleAssets The character styles
         */
        public static delete(charStyleAssets: CharacterStyleAsset | Array<CharacterStyleAsset>): number;
    }
}

export = assets;