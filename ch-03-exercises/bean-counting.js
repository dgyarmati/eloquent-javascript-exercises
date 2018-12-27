/* Bean counting
You can get the Nth character, or letter, from a string by writing "string"[N].
The returned value will be a string containing only one character (for example, "b").
The first character has position 0, which causes the last one to be found at position string.length - 1.
In other words, a two-character string has length 2, and its characters have positions 0 and 1.

Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string.

Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted
(rather than counting only uppercase “B” characters). Rewrite countBs to make use of this new function.
*/

// 1
function countBs(text) {
    let numberOfBs = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "B") {
            numberOfBs++;
        }
    }
    return numberOfBs;
}

console.log(countBs("BBBb"));
console.log(countBs("bbb"));

// 2
function countChar(text, char) {
    let numberOfChars = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            numberOfChars++;
        }
    }
    return numberOfChars;
}

console.log(countChar("ccc", "c"));
console.log(countChar("ddd", "c"));

// 2 using closure
function countCharUsingClosure(char) {
    return text => {
        let numberOfChars = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === char) {
                numberOfChars++;
            }
        }
        return numberOfChars;
    }
}

console.log("Using closure:");
let countCs = countCharUsingClosure("C");
console.log(countCs("CCC"));
console.log(countCs("ccc"));