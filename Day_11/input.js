const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .map(a => a.split('').map(b => parseInt(b)));

module.exports = {
    input,
};