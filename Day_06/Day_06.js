const { input } = require("./input");


function part_one() {
    let fishes = [...input];

    for (let i = 0; i < 80; i++) {
        let new_fishes = [];
        for (let f = 0; f < fishes.length; f++) {
            fishes[f]--;
            if (fishes[f] < 0) {
                new_fishes.push(8);
                fishes[f] = 6;
            }
        }

        fishes.push(...new_fishes);
    }

    return fishes.length;
}

function part_two() {
    const days = Array(9).fill(0);
    for (let day of input) {
        days[day]++;
    }

    for (let i = 0; i < 256; i++) {
        let six_fish = 0;
        let eight_fish = 0;
        for (let day = 0; day < days.length; day++) {
            let count = days[day];
            if (day === 0) {
                // Double the fish that are at age zero

                // The same fish loop back around to age 6
                six_fish = count;

                // The "spawned" fish get an age of 8
                eight_fish = count;
            } else {
                // Otherwise, "shift" each group of fish to the left (e.g. get 1 day younger)
                days[day - 1] = count;
            }
        }

        // After a complete day, add the "looped back" fish at age 6 to our array
        days[6] += six_fish;

        // Set the fish at age 8 to the number of fish that were spawned (don't add, because we don't "shift" in a 0 for day 8's slot)
        days[8] = eight_fish;
    }

    const all_fish = days.reduce((a, b) => a + b);
    return all_fish;
}

console.log("How many lanternfish would there be after 80 days?", part_one());
console.log("How many lanternfish would there be after 256 days?", part_two());
