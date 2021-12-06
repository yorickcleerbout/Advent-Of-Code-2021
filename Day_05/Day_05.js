
const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');


function part_one() {
    const grid = new InfiniteGrid();

    function* range(from, to) {
        let step = to > from ? 1 : -1;
        let steps = Math.abs(from - to) + 1;

        let value = from;
        while (steps--) {
            yield value;
            value += step;
        }
    }

    for (let { from, to } of input) {
        let [from_x, from_y] = from;
        let [to_x, to_y] = to;

        // For now, only consider horizontal and vertical lines
        if (!(from_x === to_x || from_y === to_y)) {
            continue;
        }

        if (from_x === to_x) {
            let x = from_x;
            for (let y of range(from_y, to_y)) {
                let count = grid.get(x, y);
                grid.set(x, y, count + 1);
            }
        }

        if (from_y === to_y) {
            let y = from_y;
            for (let x of range(from_x, to_x)) {
                let count = grid.get(x, y);
                grid.set(x, y, count + 1);
            }
        }
    }

    let two_cells = 0;
    for (let [id, value] of grid) {
        if (value >= 2) {
            two_cells++;
        }
    }
    return two_cells;
}

function part_two() {
    const grid = new InfiniteGrid();
    // All diagonals are `y = x` or `y = -x`
    function* range([from_x, from_y], [to_x, to_y]) {
        let step_x = to_x === from_x ? 0 : to_x > from_x ? 1 : -1;
        let step_y = to_y === from_y ? 0 : to_y > from_y ? 1 : -1;
        let steps_x = Math.abs(from_x - to_x) + 1;
        let steps_y = Math.abs(from_y - to_y) + 1;

        // If we are going horizontal or vertical, one of our steps is 0, so take the larger of the two
        let steps = Math.max(steps_x, steps_y);

        // Error checking
        let slope = Math.abs((to_y - from_y) / (to_x - from_x));
        if (!(slope === 1 || slope === 0 || slope === Infinity)) {
            throw new Error(
                `Invalid slope, ${slope}: [${from_x}, ${from_y}] -> [${to_x}, ${to_y}]`
            );
        }

        let value_x = from_x;
        let value_y = from_y;
        while (steps--) {
            yield [value_x, value_y];
            value_x += step_x;
            value_y += step_y;
        }
    }

    for (let { from, to } of input) {
        for (let [x, y] of range(from, to)) {
            let count = grid.get(x, y);
            grid.set(x, y, count + 1);
        }
    }

    let two_cells = 0;
    for (let [id, value] of grid) {
        if (value >= 2) {
            two_cells++;
        }
    }
    return two_cells;
}

console.log("At how many points do at least two lines overlap?", part_one());
console.log("At how many points do at least two lines overlap?", part_two())

