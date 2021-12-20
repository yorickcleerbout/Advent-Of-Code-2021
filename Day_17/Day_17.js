const { input } = require('./input');
const { getValidTrajectories } = require('./launcher');

function part_one() {
    const solutions = getValidTrajectories(input);
    const { max_y } = solutions.sort((a, b) => b.max_y - a.max_y)[0];
    return max_y;
}

function part_two() {
    const solutions = getValidTrajectories(input);
    return solutions.length;
}

console.log("What is the highest y position it reaches on this trajectory?", part_one())
console.log("How many distinct initial velocity values cause the probe to be within the target area after any step?", part_two())