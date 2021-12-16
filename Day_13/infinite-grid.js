class InfiniteGrid {

    constructor({ defaultFactory = (x, y) => 0, string_map = {}, load, parseAs } = {}) {
        this.defaultFactory = defaultFactory.bind(this);
        this.string_map = string_map;
        this.grid = new Map();
        this.max_x = -Infinity;
        this.min_x = Infinity;
        this.max_y = -Infinity;
        this.min_y = Infinity;

        if (load) {
            this.load(load, parseAs);
        }
    }

    static toId(x, y) {
        return `${x},${y}`;
    }


    static toCoords(id, return_as_object = false) {
        let [x, y] = id.split(',');
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        return return_as_object ? { x, y } : [x, y];
    }


    static split(two_dimensional_string) {
        return two_dimensional_string.split('\n').map((row) => row.split(''));
    }

    reset() {
        this.grid = new Map();
        this.max_x = -Infinity;
        this.min_x = Infinity;
        this.max_y = -Infinity;
        this.min_y = Infinity;
        return this;
    }

    load(input, parseAs = String) {
        this.reset();
        let grid = input;
        if (typeof input === 'string') {
            grid = InfiniteGrid.split(input);
        }

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                this.set(x, y, parseAs(grid[y][x]));
            }
        }
    }

    neighbors(x, y, diagonals = false) {
        const neighboring_cells = new Map();
        if (!this.inBounds(x, y)) {
            return neighboring_cells;
        }

        const neighbors_lookup = [
            ['N', [x, y - 1]],
            ['W', [x - 1, y]],
            ['E', [x + 1, y]],
            ['S', [x, y + 1]],
            ...(diagonals && [
                ['NW', [x - 1, y - 1]],
                ['NE', [x + 1, y - 1]],
                ['SW', [x - 1, y + 1]],
                ['SE', [x + 1, y + 1]],
            ]),
        ];

        for (let [key, coord] of neighbors_lookup) {
            let [cx, cy] = coord;
            if (this.inBounds(cx, cy)) {
                neighboring_cells.set(key, { coord, value: this.get(cx, cy) });
            }
        }

        return neighboring_cells;
    }

    set(x, y, value) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error(`x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`);
        }
        if (x < this.min_x) this.min_x = x;
        if (x > this.max_x) this.max_x = x;
        if (y < this.min_y) this.min_y = y;
        if (y > this.max_y) this.max_y = y;
        const id = InfiniteGrid.toId(x, y);
        this.grid.set(id, value);
    }


    get(x, y) {
        const id = InfiniteGrid.toId(x, y);
        if (!this.grid.has(id)) {
            this.set(x, y, this.defaultFactory(x, y));
        }
        return this.grid.get(id);
    }

    findAll(value, as_coords = true) {
        const found = [];
        for (let [id, cell] of this.grid) {
            const check = value instanceof RegExp ? value.test(cell) : value === cell;
            if (check) {
                found.push([cell, as_coords ? InfiniteGrid.toCoords(id) : id]);
            }
        }

        return found;
    }

    inBounds(x, y) {
        return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
    }

    clone() {
        const infinite_grid_clone = new InfiniteGrid();
        const new_map = new Map();
        for (let [key, val] of this.grid) {
            new_map.set(key, typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val);
        }
        infinite_grid_clone.defaultFactory = this.defaultFactory.bind(this);
        infinite_grid_clone.string_map = JSON.parse(JSON.stringify(this.string_map));
        infinite_grid_clone.grid = new_map;
        infinite_grid_clone.max_x = this.max_x;
        infinite_grid_clone.min_x = this.min_x;
        infinite_grid_clone.max_y = this.max_y;
        infinite_grid_clone.min_y = this.min_y;

        return infinite_grid_clone;
    }

    toGrid() {
        let grid = [];
        for (let y = this.min_y; y <= this.max_y; y++) {
            let row = [];
            for (let x = this.min_x; x <= this.max_x; x++) {
                let cell = this.get(x, y);
                row.push(cell);
            }
            grid.push(row);
        }

        return grid;
    }

    sum() {
        let sum = 0;
        for (let value of this.grid.values()) {
            sum += value;
        }

        return sum;
    }

    resize() {
        this.max_x = -Infinity;
        this.min_x = Infinity;
        this.max_y = -Infinity;
        this.min_y = Infinity;

        for (let [id, value] of this.grid) {
            let [x, y] = InfiniteGrid.toCoords(id);
            if (x < this.min_x) this.min_x = x;
            if (x > this.max_x) this.max_x = x;
            if (y < this.min_y) this.min_y = y;
            if (y > this.max_y) this.max_y = y;
        }
    }

    toString() {
        let grid = this.toGrid();
        let rows = '';
        for (let y = 0; y < grid.length; y++) {
            let row = '';
            for (let x = 0; x < grid[y].length; x++) {
                let cell = grid[y][x];
                let cell_string = cell in this.string_map ? this.string_map[cell] : String(cell);
                row += cell_string;
            }
            rows += rows.length ? '\n' + row : row;
        }

        return rows;
    }

    *[Symbol.iterator]() {
        yield* this.grid.entries();
    }
}

module.exports = {
    InfiniteGrid,
};