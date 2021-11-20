import { Color, GraphicNode } from "scenegraph";

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
