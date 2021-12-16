const { poly, rules } = require('./input');


function part_one() {
    class Element {
        constructor(name) {
            this.name = name;
            this.next = null;
        }

        toString() {
            return this.name;
        }

        reset() {
            this.next = null;
        }
    }

    let list = poly.split('').map((v) => new Element(v));

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < list.length - 1; j++) {
            let a = list[j];
            let b = list[j + 1];

            let pair = '' + a + b;

            if (rules.has(pair)) {
                a.next = new Element(rules.get(pair));
            }
        }

        let new_list = [];
        for (let j = 0; j < list.length; j++) {
            let a = list[j];
            new_list.push(a);

            if (a.next) {
                new_list.push(a.next);
                a.reset();
            }
        }

        list = new_list;
    }

    let obj = list.reduce((obj, item) => {
        obj[item.name] = (obj[item.name] || 0) + 1;
        return obj;
    }, {});

    let things = Object.entries(obj);
    things.sort((a, b) => a[1] - b[1]);

    let min = things[0];
    let max = things[things.length - 1];


    return max[1] - min[1];
}

function part_two() {
    let pairs = new Map();
    for (let c = 0; c < poly.length - 1; c++) {
        const a = poly[c];
        const b = poly[c + 1];
        const pair = a + b;
        pairs.set(pair, (pairs.get(pair) || 0) + 1);
    }

    const STEPS = 40;
    for (let step = 1; step <= STEPS; step++) {
        let new_pairs = new Map();

        for (let [pair, count] of pairs) {
            const rule = rules.get(pair);
            if (rule) {

                let a = pair[0] + rule;
                let b = rule + pair[1];

                new_pairs.set(a, count + (new_pairs.get(a) || 0));
                new_pairs.set(b, count + (new_pairs.get(b) || 0));
            } else {

                new_pairs.set(pair, count);
            }
        }

        pairs = new_pairs;
    }

    const count_totals = {};
    for (let [pair, count] of pairs) {
        let a = pair[0];
        let b = pair[1];

        if (!count_totals[a]) count_totals[a] = 0;
        if (!count_totals[b]) count_totals[b] = 0;

        count_totals[a] += count;
        count_totals[b] += count;
    }

    count_totals[poly[0]]++;
    count_totals[poly[poly.length - 1]]++;


    const elements_sorted = Object.entries(count_totals)
        .map(([name, count]) => [name, count / 2])
        .sort((a, b) => a[1] - b[1]);

    let min = elements_sorted[0];
    let max = elements_sorted[elements_sorted.length - 1];

    return max[1] - min[1];
}

console.log("What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?", part_one());
console.log("What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?", part_two());