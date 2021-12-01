const { input } = require('./input');


function part_one(input) {
    let count = 0;
    for (let i = 0; i < input.length - 1; i++) {
        let current = input[i];
        let next = input[i + 1];

        if (next > current) {
            count++;
        }
    }
    return count;

}

function part_two(input) {
    let count = 0;
    for (let i = 0; i < input.length - 1; i++) {
        let a = input[i];
        let b = input[i + 1];
        let c = input[i + 2];
        let d = input[i + 3];

        let current = a + b + c;
        let next = b + c + d;

        if (next > current) {
            count += 1;
        }
    }
    return count;
}


console.log("How many measurements are larger than the previous measurement?", part_one(input));
console.log("How many sums are larger than the previous sum?", part_two(input));