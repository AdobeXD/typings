/**
 * [clipboard on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/clipboard/)
 */
declare module 'clipboard' {
    /**
     * Write plain text to the clipboard.
     * @param text Will be automatically converted to string if a different type is passed
     */
    export function copyText(text: string | any): void;
}
