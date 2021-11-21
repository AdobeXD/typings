import { storage } from "uxp";

/** [ImageFill on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/ImageFill/) */
export class ImageFill {

    constructor(fileOrDataURI: storage.File | string)

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#clone */
    clone(): ImageFill

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#assetid */
    assetId: string

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#scalebehavior */
    scaleBehavior: 'SCALE_COVER' | 'SCALE_STRETCH' // string
    static readonly SCALE_COVER = 'SCALE_COVER';
    static readonly SCALE_STRETCH = 'SCALE_STRETCH';

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#naturalwidth */
    readonly naturalWidth: number

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#naturalheight */
    readonly naturalHeight: number

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#mimetype */
    readonly mimeType: string

    /** https://www.adobe.io/xd/uxp/develop/reference/ImageFill/#islinkedcontent */
    readonly isLinkedContent: boolean

}