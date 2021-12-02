const { input } = require('./input');

function part_one(input) {
    let horizontal = 0;
    let vertical = 0;

    input.forEach(element => {
        let instruction = element.split(" ");

        switch (instruction[0]) {
            case "forward":
                horizontal += parseInt(instruction[1]);
                break;
            case "up":
                vertical -= parseInt(instruction[1]);
                break;
            case "down":
                vertical += parseInt(instruction[1]);
                break;

            default:
                break;
        }
    });

    return horizontal * vertical;
}


function part_two(input) {
    let horizontal = 0;
    let vertical = 0;
    let aim = 0;

    input.forEach(element => {
        let instruction = element.split(" ");

        switch (instruction[0]) {
            case "forward":
                horizontal += parseInt(instruction[1]);
                vertical += (aim * parseInt(instruction[1]));
                break;
            case "up":
                aim -= parseInt(instruction[1]);
                break;
            case "down":
                aim += parseInt(instruction[1]);
                break;

            default:
                break;
        }
    });

    return horizontal * vertical;
}



console.log("What do you get if you multiply your final horizontal position by your final depth?", part_one(input));
console.log("What do you get if you multiply your final horizontal position by your final depth?", part_two(input));