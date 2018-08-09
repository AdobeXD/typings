const {Text, Ellipse, Color} = require("scenegraph");
const clipboard = require("clipboard");
const shell = require("uxp").shell;

/**
 * @param {Selection} selection
 * @param {RootNode} documentRoot
 */
function test(selection, documentRoot) {
    selection.items.forEach(node => {
        console.log("Hello world: ", node);
        if (node instanceof Text) {
            clipboard.copyText(node.text);
        } else if (node instanceof Ellipse) {
            node.fill = new Color("#ffaaee");
            shell.openExternal('https://adobe-xd.gitbook.io/plugin-api-reference/uxp-api-reference/network-apis/shell');
        }
    });
}

module.exports = {
    commands: {
        test: test
    }
};
