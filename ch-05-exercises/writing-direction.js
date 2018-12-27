/*
    Write a function that computes the dominant writing direction in a string of text.
    Remember that each script object has a direction property that can be "ltr" (left to right),
    "rtl" (right to left), or "ttb" (top to bottom).

    The dominant direction is the direction of a majority of the characters that have a script associated with them.
    The characterScript and countBy functions defined earlier in the chapter are probably useful here.

    example:

    console.log(dominantDirection("Hello!"));
    // → ltr
    console.log(dominantDirection("Hey, مساء الخير"));
    // → rtl
 */

/* returns the corresponding script to a given numeric code
    example:
   console.log(characterScript(121));
  → {name: "Latin", …}
 */
// Generated from the Unicode 10 database and https://en.wikipedia.org/wiki/Script_(Unicode)

require("./resources/scripts.js");

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
                return code >= from && code < to;
            })) {
            return script;
        }
    }
    return null;
}

/*
    Takes a collection and a predicate; returns a collection of objects which contain
    the number of elements to which the predicate applies and the ones to which it doesn't.

    example:
    console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
   → [{name: false, count: 2}, {name: true, count: 3}]
 */
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

function dominantDirection(text) {
    let chars = text.split(""),
        codes = chars.map(c => c.codePointAt(0)),
        scriptCounts = countBy(codes, c => characterScript(c));

    scriptCounts.sort((a, b) => b.count - a.count);
    return scriptCounts[0].name.direction;
}

console.log(dominantDirection("Hello!")); // ltr
console.log(dominantDirection("Hey, مساء الخير")); // rtl