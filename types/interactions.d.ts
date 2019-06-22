import {Artboard, SceneNode} from "./scenegraph";

/**
 * The `interactions` module and related APIs provide _read only_ information about the document's interactive prototype mode, including:
 *
 * * The blue "wires" seen in XD's prototyping UI, known as "interactions," which specify gestures/events which trigger actions to
 occur in the prototype. Accessible as a single consolidated global listing via this module's [`allInteractions`](#module_interactions-allInteractions) API,
 or you can access information from specific nodes in the scenegraph via [`SceneNode.triggeredInteractions`](./scenegraph.md#SceneNode-triggeredInteractions)
 and [`Artboard.incomingInteractions`](./scenegraph.md#Artboard-incomingInteractions).
 * * Which artboard the prototype experience begins on: [`homeArtboard`](#module_interactions-homeArtboard).
 * * Properties that affect Artboard scrolling behavior: Artboard [`viewportHeight`](./scenegraph.md#Artboard-viewportHeight) and
 node [`fixedWhenScrolling`](./scenegraph.md#SceneNode-fixedWhenScrolling).
 *
 * **Since**: XD 19
 *
 * @example ```javascript
 * // Get all interactions in the entire document (grouped by triggering node)
 var allInteractions = require("interactions").allInteractions;
 // Get interactions triggered by the selected node
 var nodeInteractions = selection.items[0].triggeredInteractions;
 // Get all interactions leading to a particular artboard
 var artboard = ...
 var interactionsToArtboard = artboard.incomingInteractions;
 // Print out details of one particular interaction
 var interaction = ...
 console.log("Trigger: " + interaction.trigger.type + " -> Action: " + interaction.action.type);
 ```
 */
declare class interactions {
    /**
     * The starting Artboard seen when the interactive prototype is launched.
     * @see Artboard.isHomeArtboard
     */
    public static readonly homeArtboard?: Artboard;

    /**
     * Returns a collection of *all* interactions across the entire document, grouped by triggering scenenode. Each entry in this array specifies a `triggerNode` and the result of getting [`triggerNode.triggeredInteractions`](./scenegraph.md#SceneNode-triggeredInteractions).
     *
     * May include interactions that are impossible to trigger because the trigger node (or one of its ancestors) has `visible` = false.
     *
     * Note: currently, this API excludes all of the document's keyboard/gamepad interactions.
     */
    public static readonly allInteractions: Array<{ triggerNode: SceneNode, interactions: Array<Interaction> }>;
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

export = interactions;
