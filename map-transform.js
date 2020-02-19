const {Transform} = require('stream');

module.exports = class MapTransform extends Transform {

    constructor(fn, options = {}) {
        super(options);
        this._function = fn;
    }

    _transform(chunk, _, callback) {
        Promise.resolve(chunk)
            .then(value => this._function(value))
            .then(
                result => callback(null, result),
                err => callback(err));
    }
};
