const { input } = require('./input');


function part_one(input) {

    let fuelCost = {};

    input.forEach(toMatch => {
        let totalCost = 0;
        input.forEach(position => {
            if (position > toMatch) totalCost += position - toMatch;
            if (position < toMatch) totalCost += toMatch - position;
        });
        fuelCost[toMatch] = totalCost;
    });

    let min = Infinity;
    for (const [key, value] of Object.entries(fuelCost)) {
        if (value <= min) min = value;
    }
    return min;
}

function part_two(input) {
    input.sort();
    let fuelCost = {};

    let first = input[0];
    let last = input[input.length - 1];

    for (let i = first; i <= last; i++) {
        let totalCost = 0;
        let posToMove = 0;
        input.forEach(position => {
            if (position > i) posToMove = position - i;
            if (position < i) posToMove = i - position;

            totalCost += countFuelCost(posToMove);

        });
        fuelCost[i] = totalCost;
    }

    let min = Infinity;
    for (const [key, value] of Object.entries(fuelCost)) {
        if (value <= min) min = value;
    }
    return min;
}

function countFuelCost(moves) {

    /*
        REKENKUNDIGE RIJEN

        tn = t1 + (n - 1)v

        tn = fuel cost last move
        t1 = fuel cost first move
        n = total moves
        v = fuel increment
    */

    /* 
        sn = 1/2n(t1 + tn)

        sn = total fuel cost for move
        n = total moves
        t1 = fuel cost first move
        tn = fuel cost last move
    */

    let tn = 1 + (moves - 1);
    let sn = 0.5 * moves * (1 + tn);
    return sn;
}

console.log("How much fuel must they spend to align to that position?", part_one(input));
console.log("How much fuel must they spend to align to that position?", part_two(input));


