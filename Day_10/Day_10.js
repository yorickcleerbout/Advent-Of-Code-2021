const { input } = require('./input');

function part_one(input) {
    const opposite = { '(': ')', '[': ']', '{': '}', '<': '>' };
    const opening = ['(', '[', '{', '<'];
    const value = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

    const foundErrors = [];

    input.forEach(line => {
        const stack = [];
        for (let i = 0; i < line.length; i++) {
            const curr = line[i];
            if (opening.includes(curr)) {
                stack.push(curr);
            } else {
                const lastInStack = stack.pop();
                if (opposite[lastInStack] != curr) {
                    foundErrors.push(curr);
                    break;
                }
            }
        }
    })

    let totalScore = foundErrors.reduce((total, curr) => total + value[curr], 0);

    return totalScore;
}

function part_two(input) {
    const opposite = { '(': ')', '[': ']', '{': '}', '<': '>', ')': '(', ']': '[', '}': '{', '>': '<' };
    const opening = ['(', '[', '{', '<'];
    const value = { ')': 1, ']': 2, '}': 3, '>': 4 };

    const isLineIncomplete = line => {
        const stack = [];
        for (let i = 0; i < line.length; i++) {
            const curr = line[i];
            if (opening.includes(curr)) {
                stack.push(curr);
            } else {
                const lastInStack = stack.pop();
                if (opposite[lastInStack] != curr)
                    return false;
            }
        }
        return stack.length == 0 ? false : true;
    }

    const incompleteLines = input.filter(isLineIncomplete);

    const allScores = [];

    incompleteLines.forEach(line => {
        const stack = [];
        for (let i = 0; i < line.length; i++) {
            const curr = line[i];
            if (opening.includes(curr)) {
                stack.push(curr);
            } else {
                stack.pop();
            }
        }

        const needToAdd = [];
        while (stack.length > 0) {
            needToAdd.push(opposite[stack.pop()]);
        }

        const totalValueOnLine = needToAdd.reduce((total, curr) => (total * 5) + value[curr], 0);
        allScores.push(totalValueOnLine);
    })

    const allScoresOrdered = allScores.sort((a, b) => a - b);

    return allScoresOrdered[Math.floor(allScoresOrdered.length / 2)];
}

console.log("What is the total syntax error score for those errors?", part_one(input));
console.log("What is the middle score?", part_two(input));