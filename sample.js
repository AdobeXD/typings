const {Text, Ellipse, Color} = require("scenegraph");
const clipboard = require("clipboard");
const shell = require("uxp").shell;
const fs = require("uxp").storage.localFileSystem;
const assets = require('assets');
const uxp = require('uxp');

/**
 * @param {XDSelection} selection
 * @param {import('scenegraph').RootNode} documentRoot
 */
async function test(selection, documentRoot) {
    for (const node of selection.items) {
        console.log("Hello world: ", node);
        if (node instanceof Text) {
            clipboard.copyText(node.text);
        } else if (node instanceof Ellipse) {
            node.fill = new Color("#ffaaee");
            await shell.openExternal('https://adobe-xd.gitbook.io/plugin-api-reference/uxp-api-reference/network-apis/shell');
        }
    }
    const tempFolder = await fs.getTemporaryFolder();
    const newFile = await tempFolder.createFile("tempfile.txt", {overwrite: true});
    await newFile.write("Hello, world!");
    await newFile.moveTo(tempFolder, {overwrite: true});

    const anotherFile = await tempFolder.getEntry('tempfile.txt');
    if (anotherFile.isFile) {
        anotherFile.write("Good day");
    } else if (anotherFile.isFolder) {
        console.log("That's a folder. It shouldn't be a folder. What have you done?")
    }

    const colors = assets.colors.get();
    console.log(colors);
}

module.exports = {
    commands: {
        test: test
    }
};
