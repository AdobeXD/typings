import {Color, SceneNode} from "scenegraph";

/**
 * All rendition settings fields are required (for a given rendition type) unless otherwise specified.
 */
type RenditionSettings = {
    /**
     * Root of scenegraph subtree to render. This may be any node in the scenegraph, regardless of the current edit context.
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
    background: Color;
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
 * Type that gets returned by `application.createRenditions`
 */
type RenditionResult = {
    /**
     * File the rendition was written to (equal to outputFile in RenditionSettings)
     */
    outputFile: File;
}

type DocumentInfo = {
    /**
     * Document name as displayed in the titlebar. For untitled documents, this will be a localized string such as "Untitled-1."
     */
    name: string,
    /**
     * *Semi*-unique document identifier. Duplicating an .xd file on disk will result in two files with the same GUID. Duplicating a document via "Save As" will change its GUID; thus two *cloud* documents will never have the same GUID. The GUID of an Untitled document doesn't change when it is saved for the first time. <br><br>This returns the same value as `scenegraph.root.guid`.
     */
    guid: string
};

/**
 * Generate renditions of nodes in the document in a batch. Overwrites any existing files without warning.
 *
 * A single createRenditions() call can generate any number of renditions, including multiple renditions of the same node (with different output settings) or renditions of multiple different nodes. Only one createRenditions() call can be executing at any given time, so wait for the Promise it returns before calling it again.
 *
 * @param renditions List of renditions to generate
 * @return Promise<Array<RenditionResult>, string> - Promise which is fulfilled with an array of RenditionResults (pointing to the same outputFiles that were originally passed in, or rejected with an error string if one or more renditions failed for any reason.
 */
export function createRenditions(renditions: RenditionSettings[]): Promise<RenditionResult[] | string>;

/**
 * Adobe XD version number in the form "major.minor.patch.build"
 */
export const version: string;

/**
 * Current language the application UI is using. This may not equal the user's OS locale setting: it is the closest locale supported by XD - use this when you want your plugin's UI to be consistent with XD's UI. Specifies language only, with no region info (e.g. "fr", not "fr_FR").
 */
export const appLanguage: string;

/**
 * User's OS-wide locale setting. May not match the XD UI, since XD does not support all world languages. Includes both language and region (e.g. "fr_CA" or "en_US").
 */
export const systemLocale: string;

/**
 * Information about the document which this instance of the plugin is attached to.
 *
 * > **Tip**
 * >
 * > _This does **not** indicate the frontmost "active" document window in the XD application._
 * >
 * > In XD, each document window loads a separate copy of your plugin. When a given instance of your plugin calls this API, you will always receive information about the document that this instance of the plugin is attached to, even if it's not the active window.
 *
 * @example ```js
let application = require("application");
let documentInfo = application.activeDocument;
console.log("Document title: " + documentInfo.name);
console.log("Document ID: " + documentInfo.guid);
 ```
 */
export const activeDocument: DocumentInfo;
