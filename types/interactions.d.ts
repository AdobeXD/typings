import {Artboard, SceneNode} from "scenegraph";

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
    static readonly homeArtboard?: Artboard;

    /**
     * Returns a collection of *all* interactions across the entire document, grouped by triggering scenenode. Each entry in this array specifies a `triggerNode` and the result of getting [`triggerNode.triggeredInteractions`](./scenegraph.md#SceneNode-triggeredInteractions).
     *
     * May include interactions that are impossible to trigger because the trigger node (or one of its ancestors) has `visible` = false.
     *
     * Note: currently, this API excludes all of the document's keyboard/gamepad interactions.
     */
    static readonly allInteractions: Array<{ triggerNode: SceneNode, interactions: Array<Interaction> }>;
}

export = interactions;
