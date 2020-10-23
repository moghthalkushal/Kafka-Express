const async = require('async');

const create = function (initMiddleWares) {
    let middleWares = [];

    if (typeof initMiddleWares === 'function') {
        middleWares.push(initMiddleWares);
    } else if (Array.isArray(initMiddleWares)) {
        initMiddleWares.forEach(middleWare => {
            if (typeof middleWare === 'function') {
                return middleWares.push(middleWare);
            }
            console.warn('initial middlewares array should be include functions');
        });
    } else if (initMiddleWares !== undefined) {
        console.warn('initial argument should be a function or an array');
    } else {
        // do nothing
    }

    const use = function (fn) {
        if (typeof fn === 'function') {
            return middleWares.push(fn);
        }
        console.warn('use middleware should be a function');
    };

    const unuse = function (fn) {
        middleWares = middleWares.filter(func => func !== fn);
    };

    const clean = function () {
        middleWares = [];
    };

    const handle = function () {
        return function (req, res, next) {
            async.each(middleWares, function (fn, callback) {
                fn(req, res, callback);
            }, function (err) {
                if (err) {
                    return console.error(err);
                }

                next();
            });
        };
    };

    const get = function () {
        return middleWares;
    };

    return {
        use,
        unuse,
        clean,
        handle,
        get
    };
};

module.exports = {
    create
};