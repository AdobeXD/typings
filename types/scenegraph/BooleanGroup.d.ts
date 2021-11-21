import { GraphicNode } from "scenegraph";

/**
 * [BooleanGroup on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/BooleanGroup/)
 * 
 * BooleanGroup container node - although it has fill/stroke/etc. properties like a leaf shape node, it is a container with children. Its visual appearance is determined by generating a path via a nondestructive boolean operation on all its children's paths.
 * 
 * It is not currently possible for plugins to create a new BooleanGroup node, aside from using commands.duplicate() to clone existing BooleanGroups.
 */
export class BooleanGroup extends GraphicNode {
    /**
     * Which boolean operation is used to generate the path: BooleanGroup. PATH_OP_ADD, PATH_OP_SUBTRACT, PATH_OP_INTERSECT, or PATH_OP_EXCLUDE_OVERLAP.
     */
    readonly pathOp: 'PATH_OP_ADD' | 'PATH_OP_SUBTRACT' | 'PATH_OP_INTERSECT' | 'PATH_OP_EXCLUDE_OVERLAP' // string;
    static readonly PATH_OP_ADD = 'PATH_OP_ADD';
    static readonly PATH_OP_SUBTRACT = 'PATH_OP_SUBTRACT';
    static readonly PATH_OP_INTERSECT = 'PATH_OP_INTERSECT';
    static readonly PATH_OP_EXCLUDE_OVERLAP = 'PATH_OP_EXCLUDE_OVERLAP';

}
