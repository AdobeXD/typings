import { GraphicNode, ImageFill, SceneNode } from "scenegraph";

/**
 * [RepeatGrid on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/RepeatGrid/)
 *
 * Repeat Grid container node containing multiple grid cells, each one a child Group. Changes within one cell are automatically synced to all the other cells - with certain exceptions, called "overrides." A Repeat Grid also defines a rectangular clipping mask which determines how may cells are visible (new cells are automatically generated as needed if the Repeat Grid is resized larger).
 * Each grid cell is a Group that is an immediate child of the RepeatGrid. These groups are automatically created and destroyed as needed when the RepeatGrid is resized.
 * It is not currently possible for plugins to create a new RepeatGrid node, aside from using commands.duplicate to clone existing RepeatGrids.
 */
export class RepeatGrid extends SceneNode {
    
    /**
     * Defines size of the RepeatGrid. Cells are created and destroyed as necessary to fill the current size. Cells that only partially fit will be clipped.
     */
    width: number;

    /**
     * Defines size of the RepeatGrid. Cells are created and destroyed as necessary to fill the current size. Cells that only partially fit will be clipped.
     */
    height: number;

    /**
     * Number of grid columns
     */
    numColumns: number;

    /**
     * Number of grid rows
     */
    numRows: number;

    /**
     * Horizontal spacing between grid cells/columns
     */
    paddingX: number;

    /**
     * Vertical spacing between grid cells/rows
     */
    paddingY: number;

    /**
     * The size of each grid cell. The size of each cell’s content can vary slightly due to text overrides; the cell size is always set to the width of the widest cell content and the height of the tallest cell content.
     */
    cellSize: { width: number; height: number };

    /**
     * Attach a sequence of text values to the instances of a given text node across all the cells of a Repeat Grid. The sequence is repeated as necessary to cover all the grid cells. This is a persistent data binding, so if the Repeat Grid is resized later to increase the number of grid cells, items from this sequence will be used to fill the text values of the new cells.
     * You can call this API from either of two different edit contexts:
     * - Edit context is the parent node of this RepeatGrid (i.e. a context where the RepeatGrid could be selected)
     * - Edit context is the RepeatGrid cell which is the parent of textNode (i.e. a context where textNode could be selected)
     * @param textNode A Text node exemplar that is an immediate child of one of this RepeatGrid's cells. The data series will be bound to this text node and all corresponding copies of it in the other grid cells.
     * @param textValues Array of one or more strings. Empty strings are ignored.
     */
    attachTextDataSeries(textNode: Text, textValues: string[]): void;

    /**
     * Attach a sequence of image fills to the instances of a given shape node across all the cells of a Repeat Grid. The sequence is repeated as necessary to cover all the grid cells. This is a persistent data binding, so if the Repeat Grid is resized later to increase the number of grid cells, items from this sequence will be used to set the image fill in the new cells.
     * You can call this API from either of two different edit contexts:
     * - Edit context is the parent node of this RepeatGrid (i.e. a context where the RepeatGrid could be selected)
     * - Edit context is the RepeatGrid cell which is the parent of shapeNode (i.e. a context where shapeNode could be selected)
     * @param shapeNode A shape node exemplar that is an immediate child of one of this RepeatGrid's cells. The image series will be bound to this node and all corresponding copies of it in the other grid cells. Must be a node type that supports image fills (e.g. Rectangle, but not Text or Line).
     * @param images Array of one or more ImageFills.
     */
    attachImageDataSeries(shapeNode: GraphicNode, images: ImageFill[]): void;

}