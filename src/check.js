'use strict';

var arrayChecks = [
    containsKeys, hasKeys, containsValues,
    hasValues, hasValueType, hasLength
];

var stringChecks = [
    hasLength, hasWordsCount
];

var functionChecks = [
    hasParamsCount
];

var objectChecks = [
    containsKeys, hasKeys, containsValues,
    hasValues, hasValueType
];

exports.init = function () {
    Object.defineProperty.call(this, Object.prototype, 'check', {
        get: function () {
            return getChecks.call(this);
        }
    });
};

function getChecks() {
    var availableFunctions = {};
    switch (Object.getPrototypeOf(this)) {
        case Array.prototype:
            addMethods.call(this, availableFunctions, arrayChecks);
            break;
        case String.prototype:
            addMethods.call(this, availableFunctions, stringChecks);
            break;
        case Function.prototype:
            addMethods.call(this, availableFunctions, functionChecks);
            break;
        case Object.prototype:
            addMethods.call(this, availableFunctions, objectChecks);
            break;
    }
    return availableFunctions;
}

function addMethods(availableFunctions, methods) {
    for (var i = 0; i < methods.length; i++) {
        availableFunctions[methods[i].name] = methods[i].bind(this);
    }
}

function containsKeys(keys) {
    var thisKeys = Object.keys(this);
    return keys.every(function (key) {
        return thisKeys.indexOf(key) >= 0;
    }, this);
}

function hasKeys(keys) {
    var thisKeys = Object.keys(this);
    if (thisKeys.length === keys.length && this.check.containsKeys(keys)) {
        return true;
    }
    return false;
}

function containsValues(values) {
    var keys = Object.keys(this);
    var thisValues = keys.map(function (key) {
        return this[key];
    }, this);
    return values.every(function (value) {
        return thisValues.indexOf(value) >= 0;
    }, this);
}

function hasValues(values) {
    return Object.keys(this).length ===
        values.length && this.check.containsValues(values) ? true : false;
}

function hasValueType(key, type) {
    if (this[key] === null) {
        return false;
    }
    return typeof this[key] === type.name.toLowerCase();
}

function hasLength(length) {
    return this.length === length;
}

function hasParamsCount(count) {
    return this.length === count;
}

function hasWordsCount(count) {
    var words = this.split(' ');
    var wordsCount = 0;
    words.forEach(function (word) {
        if (word !== '') {
            wordsCount++;
        }
    });
    return wordsCount === count;
}
