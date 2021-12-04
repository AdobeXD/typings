declare module 'scenegraph' {
    /**
     * [Color on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Color/)
     */
    export class Color {
        /**
         * Creates a new color instance.
         * @param value String in CSS color format (hex, rgb, rgba, hsl, hsla, hsv, hsva, or color name); or ARGB numeric value (unsigned 32-bit integer); or object with r, g, b, a keys all set to integers from 0 - 255 (if a is omitted, 255 is used).
         * @param opacity Optional, floating-point value from 0 - 1. Use when value parameter doesn't specify an opacity and you don't want the default 1.0 (100%) opacity.
         */
        constructor(value: string | { r: number, g: number, b: number, a?: number }, opacity?: number);

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
         * Convert to an object with r, g, b, a keys where r, g, b, a range from 0 - 255.
         */
        toRgba(): { r: number, g: number, b: number, a: number };

        /**
         * Convert to hex string with "#" prefix. Ignores the Color's alpha value. Returns a 3-character string in the form #123 if possible, otherwise returns a 6-character string in the form #456ABC.
         * @param forceSixDigits True if you want the result to always have 6 digits.
         */
        toHex(forceSixDigits: boolean): string;

        /**
         * Returns a clone of the current color object
         */
        clone(): Color;
    }
}