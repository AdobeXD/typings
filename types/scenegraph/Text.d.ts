import { Color, GraphicNode } from "scenegraph";

/**
 * [Text on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Text/)
 *
 * Text leaf node shape. Text can have a fill and/or stroke, but only a solid-color fill is allowed (gradient or image fill will be rejected).
 * 
 * There are three types of Text nodes:
 * - Point Text - Expands to fit the full width of the text content. Only uses multiple lines if the text content contains hard line breaks ("\n").
 * - Area Text - Fixed width and height. Text is automatically wrapped (soft line wrapping) to fit the width. If it does not fit the height, any remaining text is clipped.
 * - (@since XD 34) Auto-height Text - Fixed width. Text is automatically wrapped (soft line wrapping) to fit the width. The height is expanded to match all the text lines.
 *
 * Use layoutBox to determine the type of a text node.
 * 
 * Deprecated: XD 34
 * Check whether areaBox is null to determine if the type of a Text node.
 * 
 * Text bounds and layout work differently depending on the type of text:
 * - Point Text - The baseline is at y=0 in the node's local coordinate system. Horizontally, local x=0 is the anchor point that the text grows from / shrinks toward when edited. This anchor depends on the justification: for example, if the text is centered, x=0 is the horizontal centerpoint of the text. The bounding box leaves enough space for descenders, uppercase letters, and accent marks, even if the current string does not contain any of those characters. This makes aligning text based on its bounds behave more consistently.
 * - Area Text / Auto-height text - The baseline is at a positive y value in local coordinates, and its local (0, 0) is the top left of anchor point the areaBox. Text always flows to the right and down from this local origin regardless of justification.
 */
export class Text extends GraphicNode {
    /**
     * @default " " (a single space character)
     * 
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
    styleRanges: {
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
    }[];

    /**
     * @since XD 14
     * 
     * Set the font family across all style ranges, or get the font family of the last style range (font family of all the text if one range covers all the text). Plugins should not assume any particular default value for fontFamily.
     */
    fontFamily: string;

    /**
     * @since XD 14
     * @default non-italic normal weight style
     * 
     * Set the font style across all style ranges, or get the font style of the last style range (font style of all the text if one range covers all the text).
     */
    fontStyle: string;

    /**
     * @since XD 14
     * 
     * Font size in document pixels. Set the font size across all style ranges, or get the font size of the last style range (font size of all the text if one range covers all the text). Plugins should not assume any particular default value for fontSize.
     */
    fontSize: number;

    /**
     * @default null
     * 
     * Set the text color across all style ranges, or get the color of the last style range (color of all the text if one range covers all the text). Unlike most other nodes, text only allows a solid color fill - gradients and image fills are not supported.
     */
    fill: Color | null;

    /**
     * @since XD 14
     * @default 0
     * 
     * Character spacing in increments of 1/1000th of the fontSize, in addition to the font's default character kerning. May be negative.
     *
     * Set the character spacing across all style ranges, or get the character spacing of the last style range (character spacing of all the text if one range covers all the text).
     */
    charSpacing: number;

    /**
     * @since XD 14
     * @default false
     * 
     * Set underline across all style ranges, or get the underline of the last style range (underline of all the text if one range covers all the text).
     */
    underline: boolean;

    /**
     * @since XD 19
     * @default false
     * 
     * Set strikethrough across all style ranges, or get the strikethrough of the last style range (strikethrough of all the text if one range covers all the text).
     */
    strikethrough: boolean;

    /**
     * @since XD 19
     * @default "none"
     * 
     * Set textTransform ("none", "uppercase", "lowercase", or "titlecase") across all style ranges, or get the textTransform of the last style range.
     */
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'titlecase';

    /**
     * @since XD 20
     * @default "none"
     * 
     * Set textScript ("none" or "superscript" or "subscript") across all style ranges, or get the textScript of the last style range.
     */
    textScript: 'none' | 'superscript' | 'subscript';

    /**
     * If true, the text is drawn upside down.
     */
    flipY: boolean;

    /**
     * @default Text.ALIGN_LEFT
     * 
     * Horizontal alignment: Text.ALIGN_LEFT, ALIGN_CENTER, or ALIGN_RIGHT. This setting affects the layout of multiline text, and for point text it also affects how the text is positioned relative to its anchor point (x=0 in local coordinates) and what direction the text grows when edited by the user.
     *
     * Changing textAlign on existing point text will cause it to shift horizontally. To change textAlign while keeping the text in a fixed position, shift the text horizontally (moving its anchor point) to compensate:
     */
    textAlign: 'ALIGN_LEFT' | 'ALIGN_CENTER' | 'ALIGN_RIGHT' // string;
    static readonly ALIGN_LEFT = 'ALIGN_LEFT';
    static readonly ALIGN_CENTER = 'ALIGN_CENTER';
    static readonly ALIGN_RIGHT = 'ALIGN_RIGHT';

    /**
     * @default 0
     * 
     * Distance between baselines in multiline text, in document pixels. The special value 0 causes XD to use the default line spacing defined by the font given the current font size & style.
     *
     * This property is not automatically adjusted when fontSize changes, if line spacing is not set to 0, the line spacing will stay fixed while the font size changes, shifting the spacing’s proportional relationship to font size. If the value is 0, then the rendered line spacing will change to match the new font size, since 0 means the spacing is dynamically calculated from the current font settings.
     */
    lineSpacing: number;

    /**
     * @since XD 14
     * @default 0
     *
     * Additional distance between paragraphs, in document pixels, added to the lineSpacing amount (soft line breaks in area text are separated only by lineSpacing, while hard line breaks are separated by lineSpacing + paragraphSpacing). Unlike lineSpacing, 0 is not a special value; it just means no added spacing.
     *
     * Similar to {@link lineSpacing}, this property is not automatically adjusted when fontSize changes. The paragraph spacing amount will stay fixed while the font size changes, shifting the spacing's proportional relationship to font size.
     */
    paragraphSpacing: number;

    /**
     * @deprecated XD 34 - Please use layoutBox which supports all text types.
     * 
     * `Null` for point text. For area text, specifies the size of the rectangle within which text is wrapped and clipped.
     *
     * Changing point text to area text or vice versa will change the origin / anchor point of the text, thus changing its localBounds, but it will also automatically change the node's transform so its globalBounds and boundsInParent origins remain unchanged.
     *
     * Changing area text to point text will also automatically insert hard line breaks ("\n") into the text to match the previous line wrapping's appearance exactly.
     */
    areaBox: null | { width: number; height: number };


    /**
     * @since XD 34
     * 
     * Type: Text.POINT (for point text also referred as auto width), FIXED_HEIGHT (for area text also referred as fixed size) or AUTO_HEIGHT (for the new auto height text)
     * 
     * Width: number between 0-999999. This is ignored and can be omitted for Text.POINT
     * 
     * Height: number between 0-999999. This is ignored and can be omitted for Text.POINT and Text.AUTO_HEIGHT
     * 
     * Changing POINT text to FIXED_HEIGHT or AUTO_HEIGHT text or vice versa will change the origin / anchor point of the text, thus changing its localBounds, but it will also automatically change the node's transform so its globalBounds and boundsInParent origins remain unchanged.
     * 
     * Changing FIXED_HEIGHT or AUTO_HEIGHT text to POINT text will automatically insert hard line break ("\n") into the text to match the previous line wrapping's appearance exactly.
     * 
     * Changing from FIXED_HEIGHT to AUTO_HEIGHT text will automatically change the height of the bounds to match the height of the total text (can be a no-op).
     * 
     * Changing from AUTO_HEIGHT to FIXED_HEIGHT text will not change the bounds, transform or origin (no-op).
     */
    layoutBox: {
        type: 'POINT' | 'FIXED_HEIGHT' | 'AUTO_HEIGHT', // string,
        width?: number,
        height?: number
    }
    static readonly POINT = 'POINT';
    static readonly FIXED_HEIGHT = 'FIXED_HEIGHT';
    static readonly AUTO_HEIGHT = 'AUTO_HEIGHT';

    /**
     * Always false for point text. For area text, true if the text does not fit in the content box and its bottom is being clipped.
     */
    readonly clippedByArea: boolean;
}
