"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustiveReducer = exports.exhaustive = void 0;
// Validate that a switch/case is exhaustive
function exhaustive(x, ty) {
    const prefix = ty === undefined || ty === null
        ? "Unrecognized tag"
        : `Unrecognized tag for ${ty}`;
    throw new Error(`${prefix}: ${saferStringify(x)}`);
}
exports.exhaustive = exhaustive;
// Validate that a reducer switch/case is exhaustive
//
// In the failing case the provided state will be returned
//
function exhaustiveReducer(_x, state) {
    return state;
}
exports.exhaustiveReducer = exhaustiveReducer;
// JSON.stringify ignores undefined and throws on circular objects
function saferStringify(root) {
    if (root === undefined) {
        return "undefined";
    }
    try {
        return JSON.stringify(root);
    }
    catch (e) {
        if (e instanceof TypeError) {
            return "{...Circular object or BigInt...}";
        }
        throw e;
    }
}
