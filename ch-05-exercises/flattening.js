/*
    Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

    example:
    let arrays = [[1, 2, 3], [4, 5], [6]];
    // → [1, 2, 3, 4, 5, 6]
 */

// procedural solution
function flatten2DimensionalArray(array) {
    let flattenedArray = [];
    for (let subArray of array) {
        for (let element of subArray) {
            flattenedArray.push(element);
        }
    }
    return flattenedArray;
}

// what goes on inside reduce
function reduce1(array, combine, start) {
    let current = start;
    for (let i = 1; i < array.length; i++) {
        current = combine(current, arrays[i]);
    }
    return current;
}

let arrays = [[1, 2, 3], [4, 5], [6]];

console.log(flatten2DimensionalArray(arrays));
console.log(reduce1(arrays, (a, b) => a.concat(b), arrays[0]));
console.log(arrays.reduce((a, b) => a.concat(b)));