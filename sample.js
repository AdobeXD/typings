/*
 * Copyright (c) 2018.  Pablo Klaschka <contact@pabloklaschka.de>.
 */
const {Text, Ellipse, Color} = require("scenegraph");
const clipboard = require("clipboard");

/**
 *
 * @param {Selection} selection
 */
function test(selection) {
    selection.items.forEach(node => {
        console.log("Moin", node);
        if (node instanceof Text) {
            clipboard.copyText(node.text);
            node.text = "Moin";
        } else if (node instanceof Ellipse) {
            node.fill = new Color("#ffaaee");
        }
    });
}

// @ts-ignore
return {
    commands: {
        test: test
    }
};