/** 
 * [Blur on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/Blur/)
 */
export class Blur {
    
    /** 
     * Creates an object blur or background blur effect object with the given properties. 
     */
    constructor(blurAmount: number, brightnessAmount: number, fillOpacity: number, visible?: boolean, isBackgroundEffect?: boolean);

    /** 0 - 50 */
    blurAmount: number

    /** 
     * -50 - 50 
     * 
     * For background blur effects, the amount to increase or decrease the brightness of the background. Ignored for object blur effects.
     */
    brightnessAmount: number

    /** 
     * 0.0 - 1.0
     * 
     * For background blur effects, the a multiplier on the opacity of the object's fill drawn over top of the blurred background. Useful to create a color tint on top of the blurred background. Does not affect stroke opacity.
     * 
     * Ignored for object blur effects.
     */
    fillOpacity: number

    /** 
     * If true, renders a background blur effect: all objects beneath the shape are blurred (modulated by brightnessAmount), but the shape itself is still rendered with crisp edges (with its fill modulated by fillOpacity).
     * 
     * If false, renders an object blur effect: the shape itself is blurred, and objects beneath it are unaffected.
     */
    isBackgroundEffect: boolean

    /** 
     * If false, the blur effect is not rendered. The user can toggle this via a checkbox in the Properties panel.
     */
    visible: boolean

}