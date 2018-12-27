/*
    Analogous to the some method, arrays also have an every method. This one returns true when the given function
    returns true for every element in the array.

    In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.
    Implement every as a function that takes an array and a predicate function as parameters.
    Write two versions, one using a loop and one using the some method.
 */

// 1
function everyIterative(array, predicate) {
    for (let element of array) {
        if (!predicate(element)) {
            return false;
        }
    }
    return true;
}

// 2
function everyUsingSome(array, predicate) {
    return !array.some(element => !predicate(element));
}

let array = [1, 2, 3, 4, 5];
console.log(array.every(x => x < 6));
console.log(array.every(x => x < 5));
console.log(array.some(x => x < 5));
console.log(`using custom iterative function: ${everyIterative(array, i => i < 6)}`);
console.log(`using custom iterative function: ${everyIterative(array, i => i < 5)}`);
console.log(`using custom function with some: ${everyUsingSome(array, i => i < 6)}`);
console.log(`using custom function with some: ${everyUsingSome(array, i => i > 100)}`);