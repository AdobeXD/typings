const {Text, Ellipse, Color} = require("scenegraph");
const clipboard = require("clipboard");
const application = require("application");
const shell = require("uxp").shell;
const fs = require("uxp").storage.localFileSystem;

/**
 * @param {Selection} selection
 * @param {RootNode} documentRoot
 */
async function test(selection, documentRoot) {
    selection.items.forEach(node => {
        console.log("Hello world: ", node);
        if (node instanceof Text) {
            clipboard.copyText(node.text);
        } else if (node instanceof Ellipse) {
            node.fill = new Color("#ffaaee");
            shell.openExternal('https://adobe-xd.gitbook.io/plugin-api-reference/uxp-api-reference/network-apis/shell');
        }
    });
    const tempFolder = await fs.getTemporaryFolder();
    const newFile = await tempFolder.createEntry("tempfile.txt", {overwrite: true});
    newFile.write("Hello, world!");
    await newFile.moveTo(tempFolder, {overwrite: true});
}

module.exports = {
    commands: {
        test: test
    }
};
