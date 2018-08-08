import {Color, SceneNode} from "./scenegraph";

interface RenditionSettings {
    /**
     * Root of scenegraph subtree to render
     */
    node: SceneNode;

    /**
     * File to save the rendition to (overwritten without warning if it already exists)
     */
    outputFile: File;

    /**
     * File type: RenditionType.PNG, JPG, PDF, or SVG
     */
    type: string;

    /**
     * (PNG & JPG renditions) DPI multipler in the range [0.1, 100], e.g. 2.0 for @2x DPI.
     */
    scale: number;

    /**
     * (JPG renditions) Compression quality in the range [1, 100].
     */
    quality: number;

    /**
     * (PNG & JPEG renditions) Alpha component ignored for JPG. Optional: defaults to transparent for PNG, solid white for JPG.
     */
    background?: Color;

    /**
     * (SVG renditions) If true, SVG code is minified.
     */
    minify: boolean;

    /**
     * (SVG renditions) If true, bitmap images are stored as base64 data inside the SVG file. If false, bitmap images are saved as separate files linked from the SVG code.
     */
    embedImages: boolean;
}

/**
 * The application module exposes useful information about XD's state, along with APIs for exporting content.
 */
declare class application {
    /**
     * Generate renditions of nodes in the document in a batch. Overwrites any existing files without warning.
     * @param renditions List of renditions to generate
     * @return Promise which is fulfilled with an array of the `outputFile`'s originally passed in, or rejected with a string error code if one or more renditions failed for any reason.
     */
    public static createRenditions(renditions: RenditionSettings[]): Promise<Array, string>;

    /**
     * Adobe XD version number in the form "major.minor.patch.build"
     */
    public static readonly version: string;

    /**
     * Current language the application UI is using. This may not equal the user's OS locale setting: it is the closest locale supported by XD - use this when you want your plugin's UI to be consistent with XD's UI. Specifies language only, with no region info (e.g. "fr", not "fr_FR").
     */
    public static readonly appLanguage: string;

    /**
     * User's OS-wide locale setting. May not match the XD UI, since XD does not support all world languages. Includes both language and region (e.g. "fr_CA" or "en_US").
     */
    public static readonly systemLocale: string;
}

export = application;
