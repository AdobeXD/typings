const {Text, Ellipse, Color} = require("scenegraph");
const clipboard = require("clipboard");
const shell = require("uxp").shell;

/**
 * @param {Selection} selection
 */
function test(selection) {
    selection.items.forEach(node => {
        console.log("Hello world: ", node);
        if (node instanceof Text) {
            clipboard.copyText(node.text);
        } else if (node instanceof Ellipse) {
            node.fill = new Color("#ffaaee");
        }
    });
}

module.exports = {
    commands: {
        test: test
    }
};
