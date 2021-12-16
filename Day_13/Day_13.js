const { input, folds } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

function part_one() {
    let grid = new InfiniteGrid({
        defaultFactory: () => 0,
        string_map: {
            0: ' ',
            1: '#',
        },
    });

    for (let [x, y] of input) {
        grid.set(x, y, 1);
    }

    let { axis, line } = folds[0];

    let points_to_fold_across = [];
    for (let [id, cell] of grid) {
        if (cell === 0) {
            continue;
        }

        let [x, y] = InfiniteGrid.toCoords(id);
        const compare = axis === 'x' ? x : y;

        if (compare < line) {
            continue;
        }

        points_to_fold_across.push([x, y]);
    }

    for (let [x, y] of points_to_fold_across) {
        if (axis === 'x') {
            let new_x = line - Math.abs(x - line);
            grid.set(new_x, y, 1);
        } else {
            let new_y = line - Math.abs(y - line);
            grid.set(x, new_y, 1);
        }

        grid.grid.delete(InfiniteGrid.toId(x, y));
    }

    grid.resize();

    return grid.sum();
}

function part_two() {
    let grid = new InfiniteGrid({
        defaultFactory: () => 0,
        string_map: {
            0: ' ',
            1: '#',
        },
    });

    for (let [x, y] of input) {
        grid.set(x, y, 1);
    }

    for (let { axis, line } of folds) {
        let points_to_fold_across = [];
        for (let [id, cell] of grid) {

            if (cell === 0) {
                continue;
            }

            let [x, y] = InfiniteGrid.toCoords(id);
            const compare = axis === 'x' ? x : y;

            if (compare < line) {

                continue;
            }

            points_to_fold_across.push([x, y]);
        }

        for (let [x, y] of points_to_fold_across) {
            if (axis === 'x') {
                let new_x = line - Math.abs(x - line);
                grid.set(new_x, y, 1);
            } else {
                let new_y = line - Math.abs(y - line);
                grid.set(x, new_y, 1);
            }

            grid.grid.delete(InfiniteGrid.toId(x, y));
        }
    }

    grid.resize();

    return grid.toString();
}

console.log("How many dots are visible after completing just the first fold instruction on your transparent paper?", part_one());
console.log("What code do you use to activate the infrared thermal imaging camera system?\n", part_two())