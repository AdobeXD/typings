import {Artboard, SceneNode} from "./scenegraph";

/**
 * The `interactions` module represents all document interactions.
 *
 * **Since:** XD 19
 *
 * @example ```javascript
 * // Get the home Artboard
 const home = interactions.homeArtboard;
 console.log(`Home artboard name: ${home.name} guid: ${home.guid}`);

 // Get all of the document interactions
 const allInter = interactions.allInteractions;
 allInter.forEach(inter => {
     console.log(`triggerNode guid: ${inter.triggerNode.guid}`);
     console.log(`triggerNode Name: ${inter.triggerNode.name}`);
     console.log(JSON.stringify(inter.interactions, null, 2));
})
 ```
 */
declare class interactions {
    /**
     * The home artboard of the interaction model. This is a special designation indicating this is the first artboard to display in a shared prototype.
     */
    public static readonly homeArtboard?: Artboard;

    /**
     * Get all interactions by serializing the document interactions to JSON. An array of all the interactions is returned.
     */
    public static readonly allInteractions: Array<{ triggerNode: SceneNode, interactions: Array<InteractionData> }>;
}

/**
 * @example ```javascript
 * {
    trigger: {
        type: 'tap'
    },
    action: {
        type: 'goToArtboard',
        destination:
            Artboard ('iPhone 6/7/8') {
                width: 375, height: 667
                global X,Y: 1040, -14
                parent: RootNode
                children: [Group, Group, Group]
                fill: ffffffff
            },
       preserveScrollPosition: false,
       transition: [transitionData]
    }
}
 * ```
 */
type InteractionData = {
    trigger: {
        /**
         * Possible values: `tap`, `voice`, `time`, `drag`
         */
        type: 'tap' | 'voice' | 'time' | 'drag'
    }

    action: {
        /**
         * Possible values: `goToArtboard`, `overlay`, `speak`, `goBack`
         */
        type: 'goToArtboard' | 'overlay' | 'speak' | 'goBack';
        /**
         * The destination scenegraph node
         */
        destination: SceneNode;

        /**
         * Fixed scroll position indicator
         */
        preserveScrollPosition: boolean;

        /**
         * Data about transitions triggered by `trigger`
         */
        transition: Array<TransitionData>;
    }
}

type TransitionData = {
    /**
     * Possible values: `autoAnimate´, `dissolve`, `push`, `slide`, `none`
     */
    type: 'autoAnimate' | 'dissolve' | 'push' | 'slide' | 'none';

    /**
     * Possible values: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `wind-up`, `bounce`, `snap`
     */
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'wind-up' | 'bounce' | 'snap';
}

export = interactions;
