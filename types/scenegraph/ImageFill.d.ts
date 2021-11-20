import { storage } from "uxp";

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