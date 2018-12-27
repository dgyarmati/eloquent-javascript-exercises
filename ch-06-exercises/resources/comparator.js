/*
    Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties,
    where the values of the properties are equal when compared with a recursive call to deepEqual.

    To find out whether values should be compared directly (use the === operator for that) or have their properties compared,
    you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison.

    But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

    The Object.keys function will be useful when you need to go over the properties of objects to compare them.

    examples:

    let obj = {here: {is: "an"}, object: 2};
    console.log(deepEqual(obj, obj));
    // → true
    console.log(deepEqual(obj, {here: 1, object: 2}));
    // → false
    console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
    // → true
 */

class Comparator {
    static deepEqual(val1, val2) {
        if (val1 === null || val2 === null) {
            return val1 === null && val2 === null;
        }

        if (typeof val1 === "object" && typeof val2 === "object") {
            let obj1Keys = Object.keys(val1);
            let obj2Keys = Object.keys(val2);

            if ((obj1Keys === null && obj2Keys === null) || (obj1Keys.length === obj2Keys.length)) {
                for (let key of obj1Keys) {
                    if (val2.hasOwnProperty(key)) {
                        let value1 = val1[key];
                        let value2 = val2[key];

                        if (typeof value1 === typeof value2) {
                            if (typeof value1 === "object") {
                                if (!deepEqual(value1, value2)) {
                                    return false;
                                }
                            } else {
                                if (value1 !== value2) {
                                    return false;
                                }
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
            return true;
        } else if (typeof val1 !== typeof  val2) {
            return false;
        } else {
            return val1 === val2;
        }
    }
}

// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the method.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
    module.exports = Comparator;
if (typeof global != "undefined" && !global.Comparator)
    global.Comparator = Comparator;
