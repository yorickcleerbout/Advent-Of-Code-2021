const { input } = require('./input');

function part_one(input) {
    let t = Date.now()
    let data = input
    let total = 0
    data.split("\n").forEach(v => { total += v.split(" | ")[1].split(" ").filter(e => { return [2, 3, 4, 7].includes(e.length) }).length })
    return total;

}

function part_two(input) {
    let t = Date.now()
    let data = input
    let left = []
    let right = []

    data.split("\n").forEach(v => {
        let s = v.split(" | ");
        left.push(s[0].split(" ").map(l => l.split("").sort()));
        right.push(s[1].split(" ").map(r => r.split("").sort().join("")));
    })

    let leftSort = []
    left.forEach(l => leftSort.push(l.filter(function (e) { return [2, 3, 4, 7].includes(e.length) })))
    let normFrequencies = { t: 8, lt: 6, rt: 8, m: 7, lb: 4, rb: 9, b: 7 }
    let total = 0

    for (let i = 0; i < left.length; i++) {
        let segments = {}
        let frequencies = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }
        for (let j in left[i]) {
            for (let k in left[i][j]) frequencies[left[i][j][k]]++
        }

        let one = leftSort[i].find(function (e) { return e.length == 2 })
        let seven = leftSort[i].find(function (e) { return e.length == 3 })
        let four = leftSort[i].find(function (e) { return e.length == 4 })
        let eight = leftSort[i].find(function (e) { return e.length == 7 })
        segments.t = seven.find(function (e) { return !one.includes(e) })

        for (let f in normFrequencies) {
            for (let g in frequencies) {
                if (normFrequencies[f] == frequencies[g] && (f == "lb" || f == "rb" || f == "lt")) {
                    segments[f] = g
                }
            }
        }

        segments.rt = one.find(function (e) { return e != segments.rb })
        segments.m = four.find(function (e) { return ![segments.lt, segments.rt, segments.rb].includes(e) })
        segments.b = eight.find(function (e) { return ![segments.t, segments.lt, segments.rt, segments.m, segments.lb, segments.rb].includes(e) })

        let two = [segments.t, segments.rt, segments.m, segments.lb, segments.b]
        let three = [segments.t, segments.rt, segments.m, segments.rb, segments.b]
        let five = [segments.t, segments.lt, segments.m, segments.rb, segments.b]
        let six = [segments.t, segments.lt, segments.m, segments.rb, segments.lb, segments.b]
        let nine = [segments.t, segments.lt, segments.rt, segments.m, segments.rb, segments.b]
        let zero = [segments.t, segments.lt, segments.rt, segments.lb, segments.rb, segments.b]

        let values = [zero, one, two, three, four, five, six, seven, eight, nine].map(v => v.sort().join(""))
        let num = ""
        for (let j = 0; j < right[i].length; j++) {
            num += values.indexOf(right[i][j])
        }
        total += Number(num)
    }
    return total;

}

console.log("In the output values, how many times do digits 1, 4, 7, or 8 appear?", part_one(input));
console.log("What do you get if you add up all of the output values?", part_two(input));
