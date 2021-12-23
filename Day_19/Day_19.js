const fs = require('fs');
const { Scanner } = require('./scanner');

const input = ('\n' + fs.readFileSync('input.txt', 'utf8')).split('\n--- scanner ').slice(1).map(a => a.split(' ---\n'));

function part_one(input) {
    let toScan = [];

    input.forEach(info => {
        const curr = new Scanner();
        curr.id = Number(info[0]);
        curr.detected = info[1].split('\n').map(a => a.split(',').map(Number)).filter(a => a.length === 3);
        toScan.push(curr);
    });

    const initialScanner = toScan.shift();
    const beacons = initialScanner.detected.map(a => [a[0] - initialScanner.detected[0][0], a[1] - initialScanner.detected[0][1], a[2] - initialScanner.detected[0][2]]);

    while (toScan.length > 0) {
        const newFounds = [];
        for (let i = 0; i < toScan.length; i++) {
            const newBeacons = toScan[i].getBeaconsIfCommonWith(beacons);
            if (newBeacons.length >= 12) {
                newFounds.push(toScan[i]);
                newBeacons.forEach(newBeacon => {
                    if (beacons.filter(b => b[0] === newBeacon[0] && b[1] === newBeacon[1] && b[2] === newBeacon[2]).length === 0) {
                        beacons.push(newBeacon);
                    }
                });
            }
        }
        if (newFounds.length > 0) {
            newFounds.forEach(newFound => {
                toScan = toScan.filter(s => s.id !== newFound.id);
            });
        }

    }

    return beacons.length;
}

function part_two(input) {
    let toScan = [];

    input.forEach(info => {
        const curr = new Scanner();
        curr.id = Number(info[0]);
        curr.detected = info[1].split('\n').map(a => a.split(',').map(Number)).filter(a => a.length === 3);
        toScan.push(curr);
    });

    const initialScanner = toScan.shift();
    const beacons = initialScanner.detected.map(a => [a[0] - initialScanner.detected[0][0], a[1] - initialScanner.detected[0][1], a[2] - initialScanner.detected[0][2]]);
    const positions = [initialScanner.pos];

    while (toScan.length > 0) {
        const newFounds = [];
        for (let i = 0; i < toScan.length; i++) {
            const newBeacons = toScan[i].getBeaconsIfCommonWith(beacons);
            if (newBeacons.length >= 12) {
                newFounds.push(toScan[i]);
                newBeacons.forEach(newBeacon => {
                    if (beacons.filter(b => b[0] === newBeacon[0] && b[1] === newBeacon[1] && b[2] === newBeacon[2]).length === 0) {
                        beacons.push(newBeacon);
                    }
                });
            }
        }
        if (newFounds.length > 0) {
            newFounds.forEach(newFound => {
                positions.push(newFound.pos);
                toScan = toScan.filter(s => s.id !== newFound.id);
            });
        }

    }

    const manhattan = (pos1, pos2) => {
        return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]) + Math.abs(pos1[2] - pos2[2]);
    };


    const ansss = positions.map(a => [a[0] + initialScanner.detected[0][0], a[1] + initialScanner.detected[0][1], a[2] + initialScanner.detected[0][2]]);
    ansss[0] = [0, 0, 0];

    let maxDist = 0;
    for (let i = 0; i < ansss.length; i++) {
        for (let j = 0; j < ansss.length; j++) {
            if (i !== j)
                maxDist = Math.max(maxDist, manhattan(ansss[i], ansss[j]));
        }
    }
    return maxDist;
}

console.log("THIS CODE TAKES LONG, DIDNT HAD THE TIME TO REFACTOR!")
console.log("How many beacons are there?", part_one(input));
console.log("What is the largest Manhattan distance between any two scanners?", part_two(input))