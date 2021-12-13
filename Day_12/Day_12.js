const fs = require("fs");

const graph = {};

const lines = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map((x) => {
        const [from, to] = x.split("-");
        if (!graph[from]) {
            graph[from] = [];
        }
        if (!graph[to]) {
            graph[to] = [];
        }
        graph[from].push(to);
        graph[to].push(from);

        return { from, to };
    });

function isSmallCave(string) {
    return /[a-z]/.test(string);
}

function part_one() {
    function depthFirstSearch(node, visited, paths) {
        visited.push(node);
        if (node === "end") {
            paths.push(visited.join`,`);
            return;
        }

        for (const neighbor of graph[node]) {
            if (isSmallCave(neighbor) && visited.includes(neighbor)) {
                continue;
            }
            depthFirstSearch(neighbor, [...visited], paths);
        }
    }

    const paths = [];
    depthFirstSearch("start", [], paths);
    return paths.length;
}

function part_two() {
    function depthFirstSearch(node, visited, visitedTwiceAlready, paths) {
        visited.push(node);
        if (node === "end") {
            paths.push(visited.join`,`);
            return;
        }

        for (const neighbor of graph[node]) {
            if (neighbor === "start") {
                continue;
            }
            if (isSmallCave(neighbor) && visited.includes(neighbor)) {
                if (visitedTwiceAlready) {
                    continue;
                }
                if (visited.filter((x) => x === neighbor).length >= 2) {
                    continue;
                }
                depthFirstSearch(neighbor, [...visited], true, paths);
            } else {
                depthFirstSearch(neighbor, [...visited], visitedTwiceAlready, paths);
            }
        }
    }

    const paths = [];
    depthFirstSearch("start", [], false, paths);
    return paths.length;
}

console.log("How many paths through this cave system are there that visit small caves at most once?", part_one());
console.log("How many paths through this cave system are there?", part_two());

