import {Artboard, SceneNode} from "scenegraph";

export {};

declare global {
    /**
     * Imports classes from a module (e.g. ```const { Text } = require('scenegraph'); ```)
     * @param module The module name
     */
    function require(module: string): void;

    let module: { exports: any };

    /**
     * The selection object represents the currently selected set of nodes in the UI. You can set the selection to use it as input for commands, or to determine what is left selected for the user when your plugin’s edit operation completes.
     *
     * The current selection state is passed to your command handler function as an argument.
     *
     * The selection can only contain items within the current edit context:
     *
     *  - If the user has drilled down into a container node, the container is the current edit context and only its immediate children can be selected.
     *  - If the user hasn’t drilled into any container, the root of the document is the edit context, and the selection may contain any artboard or any combination of the pasteboard’s immediate children and one or more artboards’ immediate children. The selection cannot contain both artboards and non-artboards at the same time, however.
     *
     * Note that when in the root edit context, the selection can contain items with multiple different parents.
     *
     * Items that are locked cannot be in the selection. If the user or your plugin attempts to select any locked items, they are automatically filtered into a separate list (itemsIncludingLocked) which is generally only used by the Unlock command.
     */
    interface Selection {
        /**
         * Array representing the current selection. Empty array if nothing is selected (never null). Never includes locked nodes.
         *
         * As a convenience, the setter also accepts a single node or null as valid input. However, the getter always returns an array.
         *
         * If the user selects nodes one-by-one, by Shift-clicking, this array lists the nodes in the order they were added to the selection.
         *
         * Returns a fresh array each time, so this can be mutated by the caller without interfering with anything. Mutating the array does not change the selection - only invoking the ‘items’ setter changes selection.
         */
        items: Array<SceneNode>;
        /**
         * Array representing the current selection plus any locked items that the user has attempted to select.
         */
        itemsIncludingLocked: Array<SceneNode>;
        /**
         * True if the selection isn’t empty and consists of one or more non-Artboards. Never true at the same time as hasArtboards.
         */
        hasArtwork: boolean;
        /**
         * True if the selection isn’t empty and consists of one or more Artboards. Never true at the same time as hasArtwork.
         */
        hasArtboards: boolean;
        /**
         * The context in which selection and edit operations must occur. If the user hasn’t drilled into any container node, this value is the document root, and its scope includes all immediate children of the pasteboard (including Artboards), and all immediate children of all those Artboards.
         */
        editContext: SceneNode;
        /**
         * The preferred parent to insert newly added content into. Takes into account the current edit context as well as the “focused artboard” if in the root context.
         */
        insertionParent: SceneNode;
        /**
         * The artboard the user is currently most focused on (via recent selection or edit operations). May be null, for example if no artboards exist or if the user just deleted an artboard.
         */
        focusedArtboard: Artboard | null | undefined;
    }

    /**
     * An interaction consists of a Trigger + Action pair and is attached to a single, specific scenenode.
     *
     * @example ```javascript
     {
    trigger: {
        type: "tap"
    },
    action: {
        type: "goToArtboard",
        destination: Artboard node,
        preserveScrollPosition: false,
        transition: {
            type: "dissolve",
            duration: 0.4,
            easing: "ease-out"
        }
    }
}```
     * Note: Interaction objects are not plain JSON -- they may reference scenenodes (as seen above) and other strongly-typed objects.
     */
    type Interaction = {
        /**
         * User gesture or other event which will trigger the action.
         */
        trigger: Trigger;
        /**
         * Action that occurs
         */
        action: Action;
    }

    type Trigger = {
        /**
         * One of the trigger types listed below.
         *
         * ### `"tap"`
         * When the user clicks or taps on a scenenode.
         *
         * ### `"drag"`
         * When the user drags or swipes a scenenode. Can only trigger a `goToArtboard` action with the `autoAnimate` transition style.
         *
         * ### `"time"`
         * Once a set amount of time elapses (this trigger type only exists on Artboard nodes). Additional Trigger properties:
         * *  {@link delay}
         *
         * ### `"voice"`
         * When the user speaks a specific voice command. Additional Trigger properties:
         * * {@link speechCommand}
         */
        type: 'tap' | 'voice' | 'time' | 'drag'

        /**
         * Delay time in ms.
         *
         * Only when type is `'time'`
         */
        delay?: number;

        /**
         * Phrase the user speaks to trigger this command.
         *
         * Only when type is `'voice'`
         */
        speechCommand?: string;
    }

    /**
     * Action performed when the trigger occurs.
     */
    type Action = {
        /**
         * One of the action types listed below.
         *
         * ### "goToArtboard"
         * Navigate the entire screen to view a different artboard. Additional Action properties:
         * * {@link destination}
         * * {@link transition}
         * * {@link preserveScrollPosition}
         *
         * ### "overlay"
         * Displays a second artboard overlaid on top of the current one. Additional Action properties:
         * * {@link overlay}
         * * {@link transition}
         * * {@link overlayTopLeft}
         *
         * ### "goBack"
         * Reverse the last `"goToArtboard"` or `"overlay"` action, replaying in reverse whatever transition it used.
         *
         * ### "speak"
         * Speak with audio output to the user. Additional Action properties:
         * * {@link speechOutput}
         * * {@link locale}
         * * {@link voice}
         */
        type: 'goToArtboard' | 'overlay' | 'speak' | 'goBack';

        /**
         *  Artboard to navigate to.
         */
        destination?: Artboard;
        /**
         *  Animation style with which the view transitions from the old Artboard to the new one.
         *  Only certain transition types are allowed for overlays.
         */
        transition?: Transition;
        /**
         * If both Artboards are [taller than the viewport](./scenegraph.md#Artboard-viewportHeight), attempts to keep the user's current scroll position the same as in the outgoing artboard.
         */
        preserveScrollPosition?: boolean;
        /**
         *  Artboard to show on top.
         */
        overlay?: Artboard;

        /**
         *  Position of the overlay Artboard, in the current/base Artboard's coordinate space.
         */
        overlayTopLeft: { x: number, y: number };

        /**
         *  Phrase to speak to the user.
         */
        speechOutput?: string;
        /**
         * Locale determines the pronounciation and accent of the digital voice. Includes both language *and* region (e.g. "en-us").
         */
        locale?: string;
        /**
         * "Persona" of the digital voice to use. Available personas vary by locale.
         */
        voice?: string;
    }

    /**
     * Animation style with which `"goToArtboard"` and `"overlay"` actions transition from/to Artboards.
     */
    type Transition = {
        /**
         * One of: `autoAnimate´, `dissolve`, `push`, `slide`, `none`
         */
        type: 'autoAnimate' | 'dissolve' | 'push' | 'slide' | 'none';

        /**
         * _(If type = "push" or "slide")._ One of: `"L"`, `"R"`, `"T"`, `"B"`
         */
        fromSide?: string;

        /**
         * Length of animation in seconds
         */
        duration: number;

        /**
         * One of: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `wind-up`, `bounce`, `snap`
         */
        easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'wind-up' | 'bounce' | 'snap';
    }
}
