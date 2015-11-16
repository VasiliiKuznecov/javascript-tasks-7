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

function addMethods(object, methods) {
    for (var i = 0; i < methods.length; i++) {
        object[methods[i].name] = methods[i].bind(this);
    }
}

function containsKeys(keys) {
    var thisKeys = Object.keys(this);
    for (var i = 0; i < keys.length; i++) {
        if (thisKeys.indexOf(keys[i]) === -1) {
            return false;
        }
    }
    return true;
}

function hasKeys(keys) {
    var thisKeys = Object.keys(this);
    if (thisKeys.length === keys.length && this.check.containsKeys(keys)) {
        return true;
    }
    return false;
}

function containsValues(values) {
    var thisKeys = Object.keys(this);
    var thisValues = [];
    for (var i = 0; i < thisKeys.length; i++) {
        thisValues.push(this[thisKeys[i]]);
    }
    for (var i = 0; i < values.length; i++) {
        if (thisValues.indexOf(values[i]) === -1) {
            return false;
        }
    }
    return true;
}

function hasValues(values) {
    var thisKeys = Object.keys(this);
    if (thisKeys.length === values.length && this.check.containsValues(Values)) {
        return true;
    }
    return false;
}

function hasValueType(key, type) {
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
    return words.length === count;
}
