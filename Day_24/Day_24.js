const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trimEnd();

function solve(input, part) {
    const lines = input.split('\n');

    const terms = [];
    for (let i = 0; i < lines.length; i += 18) {
        // terms [a, b, c] such that z'(a, b, c, w, z) = ~~(z / a) * (25 * +(w !== (z % 26) + b) + 1) + (w + c) * +(w !== (z % 26) + b)
        terms.push([4, 5, 15].map((j) => +lines[i + j].split(' ')[2]));
    }

    const prevs = [];
    const digits = [];
    for (const [i, [a, b, c]] of Object.entries(terms)) {
        if (a === 1) {
            prevs.push([i, c]);
        } else {
            const [prevI, prevC] = prevs.pop();
            const complement = prevC + b;
            digits[prevI] =
                part === 1 ? Math.min(9, 9 - complement) : Math.max(1, 1 - complement);
            digits[i] = digits[prevI] + complement;
        }
    }
    return digits.join('');
}

console.log("What is the largest model number accepted by MONAD?", solve(input, 1));
console.log("What is the smallest model number accepted by MONAD?", solve(input, 2));