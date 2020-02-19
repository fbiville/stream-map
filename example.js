const process = require('process');
const MapTransform = require('./map-transform');

const format = (data) => '\u001b[32m' + data + '\u001b[39m\n';

console.log('Send an integer, Ctrl-C to stop');
process.stdin
    .pipe(
        new MapTransform((x) => {
            const n = parseInt(x, 10);
            if (n === 0) throw new Error('division by zero');
            return format(12 / x);
        })
    )
    .pipe(process.stdout);
