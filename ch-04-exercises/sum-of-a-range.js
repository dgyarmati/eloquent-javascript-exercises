/*
    The introduction of this book alluded to the following as a nice way to compute the sum of a range of numbers:

    console.log(sum(range(1, 10)));
    Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

    Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the example program and see whether it does indeed return 55.

    As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array.
    If no step is given, the elements go up by increments of one, corresponding to the old behavior.
    The function call range(1, 10, 2) should return [1, 3, 5, 7, 9].
    Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].

    example:

    console.log(range(1, 10));
    // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(range(5, 2, -1));
    // → [5, 4, 3, 2]
    console.log(sum(range(1, 10)));
    // → 55
 */

function range1(start, end) {
    let result = [];

    if (start > end) {
        return range1(end, start).reverse();
    }

    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}

console.log(range1(1, 10));
console.log(range1(10, 25));
console.log(range1(10, 1));

// solution 1
function sumArray(array) {
    let sum = 0;
    for (let element of array) {
        sum += element;
    }
    return sum;
}

let sum = sumArray(range1(1, 10));
console.log(`sum is ${sum}`);

// solution 2
function sumArrayUsingReduce(array) {
    return array.reduce((acc, val) => acc + val);
}

console.log(`sum using reduce is ${sumArrayUsingReduce(range1(1, 10))}`);

// 3
function rangeWithStep(start, end, step) {
    let result = [];

    if (step < 0 && start > end) {
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
        return result;
    } else if (start < end) {
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    } else {
        throw "Numbers are not in range!";
    }
}

console.log(`range 1-10 using step 2: ${rangeWithStep(1, 10, 2)}`);
console.log(`range 1-10 using step -1: ${rangeWithStep(10, 5, -1)}`);

