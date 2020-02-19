const MapTransform = require('../../map-transform');
const {finished, PassThrough} = require('stream');

describe('MapTransform', () => {

    let input;
    let output;
    let transform;

    const dataIn = [1, 2, 3, null];
    const dataOut = [1, 4, 9];
    let dataOutIndex;

    beforeEach(() => {
        input = new PassThrough({objectMode: true});
        output = new PassThrough({objectMode: true});
        dataOutIndex = 0;
    });

    it('maps stream values with synchronous functions', () => {
        transform = new MapTransform((x) => x ** 2, {objectMode: true});
    });

    it('maps stream values with asynchronous functions', () => {
        transform = new MapTransform(async (x) => x ** 2, {objectMode: true});
    });

    it('maps stream values with promise-based functions', () => {
        transform = new MapTransform((x) => Promise.resolve(x ** 2), {objectMode: true});
    });

    afterEach((done) => {
        input.pipe(transform).pipe(output);

        output.on('data', actual => {
            const expected = dataOut[dataOutIndex++];
            expect(actual).toEqual(expected, `Expected ${expected}, got ${actual}`)
        });
        finished(output, (err) => {
            done(err);
            [input, output, transform].forEach(s => s.destroy());
        });
        dataIn.forEach(data => input.push(data));
    });
});
