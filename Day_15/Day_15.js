const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid({
    load: input,
    parseAs: Number,
});

function part_one() {
    const path = grid.getShortestWeightedPath(0, 0, grid.max_x, grid.max_y, { include_from: false });
    const path_sum = path.reduce((sum, cell_id) => sum + grid.grid.get(cell_id), 0);

    return path_sum;
}

function part_two() {
    function increaseGrid(grid) {
        let new_grid = grid.clone({ empty: true });
        for (let [id, value] of grid) {
            let new_vale = value + 1;
            if (new_vale > 9) {
                new_vale = 1;
            }

            new_grid.grid.set(id, new_vale);
        }

        return new_grid;
    }

    function concatGrids(...grids) {
        let rows = [];
        for (let i = 0; i < grids.length; i++) {
            let grid = grids[i];
            let inner_rows = grid.toString().split('\n');
            for (let j = 0; j < inner_rows.length; j++) {
                if (rows[j] === undefined) {
                    rows[j] = '';
                }

                rows[j] += inner_rows[j];
            }
        }


        return rows.join('\n');
    }


    function buildGridOutDiagonally(grid, copies = 5) {
        let row_of_grids = [grid];

        for (let x = 1; x < copies; x++) {
            let last_col = row_of_grids[row_of_grids.length - 1];
            row_of_grids.push(increaseGrid(last_col));
        }

        let rows = [row_of_grids];

        for (let y = 1; y < copies; y++) {
            let last_row = rows[rows.length - 1];
            let last_col = last_row[last_row.length - 1];

            row_of_grids = last_row.slice(1);
            row_of_grids.push(increaseGrid(last_col));

            rows.push(row_of_grids);
        }


        const giant_grid_input = rows.map((row) => concatGrids(...row)).join('\n');

        return new InfiniteGrid({
            load: giant_grid_input,
            parseAs: Number,
        });
    }

    const giant_grid = buildGridOutDiagonally(grid, 5);

    const path = giant_grid.getShortestWeightedPath(0, 0, giant_grid.max_x, giant_grid.max_y, {
        include_from: false,
    });
    const path_sum = path.reduce((sum, cell_id) => sum + giant_grid.grid.get(cell_id), 0);

    return path_sum;
}


console.log("What is the lowest total risk of any path from the top left to the bottom right?", part_one())
console.log("what is the lowest total risk of any path from the top left to the bottom right?", part_two())