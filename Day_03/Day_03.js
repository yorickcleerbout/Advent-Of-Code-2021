const { input } = require('./input');


function part_one(input, depth, gamma, epsilon) {

    // Base Case
    if (depth == input[0].length) return parseInt(gamma, 2) * parseInt(epsilon, 2);

    let counts = { "0": 0, "1": 0 }

    input.forEach(element => { counts[element[depth]] += 1 });

    if (counts["0"] > counts["1"]) {

        gamma += "0";
        epsilon += "1";

    } else {
        gamma += "1";
        epsilon += "0";
    }

    return part_one(input, depth + 1, gamma, epsilon);
}

function part_two(input, depth, system) {

    // Base Case
    if (input.length == 1) return parseInt(input[0], 2);


    let counts = { "0": [], "1": [] }

    input.forEach(element => {
        if (element[depth] == "0") {
            counts["0"].push(element);
        } else {
            counts["1"].push(element);
        }
    });

    if (system == "oxygen") {

        if (counts["0"].length > counts["1"].length) return part_two(counts["0"], depth + 1, "oxygen");
        else return part_two(counts["1"], depth + 1, "oxygen");

    } else {

        if (counts["0"].length > counts["1"].length) return part_two(counts["1"], depth + 1, "co2");
        else return part_two(counts["0"], depth + 1, "co2");

    }
}


console.log("What is the power consumption of the submarine?", part_one(input, 0, "", ""));
console.log("What is the life support rating of the submarine?", part_two(input, 0, "oxygen") * part_two(input, 0, "co2"));