/*
    Arrays have a reverse method that changes the array by inverting the order in which its elements appear.
    For this exercise, write two functions, reverseArray and reverseArrayInPlace.
    The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order.
    The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements.
    Neither may use the standard reverse method.

    Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one runs faster?

    example:

    console.log(reverseArray(["A", "B", "C"]));
    // → ["C", "B", "A"];
    let arrayValue = [1, 2, 3, 4, 5];
    reverseArrayInPlace(arrayValue);
    console.log(arrayValue);
    // → [5, 4, 3, 2, 1]
 */

// 1
function reverseArray(array) {
    let reversed = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
}

function reverseArrayUsingUnshift(array) {
    let reversed = [];
    for (let i = 0; i < array.length; i++) {
        reversed.unshift(array[i]);
    }
    return reversed;
}

// 1
function reverseArrayUsingWhileLoop(array) {
    let reversed = [];
    let i = array.length;
    while (i--) {
        reversed.push(array[i]);
    }
    return reversed;
}

console.log(reverseArrayUsingUnshift([1, 2, 3, 4]));
console.log(reverseArrayUsingWhileLoop([1, 2, 3, 4]));
console.log(reverseArrayUsingUnshift([1, 2, 3, 4]));

// 2
function reverseArrayInPlace(array) {
    let max = array.length - 1;
    for (let i = 0; i <= max; i++, max -= 1) {
        let temp = array[i];
        array[i] = array[max];
        array[max] = temp;
    }
    return array;
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7]));
console.log(reverseArrayInPlace(['A', 2, 'C', 4, 'K', 5]));

// 2
function reverseArrayInPlaceUsingWhileLoop(array) {
    let max = array.length,
        min = -1,
        temp = null;
    while (--max > ++min) {
        temp = array[max];
        array[max] = array[min];
        array[min] = temp;
    }
    return array;
}

console.log(reverseArrayInPlaceUsingWhileLoop([1, 2, 3, 4, 6, 800]));
console.log(reverseArrayInPlaceUsingWhileLoop([1, 'Z', 3, 4, 900, 'F']));

let testArray = [];
for (let i = 0; i < 10000000; i++) {
    testArray.push(i);
}

// bonus: https://stackoverflow.com/questions/32418443/reverse-array-in-place
function reverseSO (array) {
    let i = 0,
        n = array.length,
        middle = Math.floor(n / 2),
        temp = null;

    for (; i < middle; i++) {
        temp = array[i];
        array[i] = array[n - 1 - i];
        array[n - 1 - i] = temp;
    }
    return array;
}

console.log(reverseSO([1, 2, 3, 4]));

// benchmark
let start, end;

start = new Date();
testArray.reverse();
end = new Date();
console.log(`time it took to reverse array using native reverse method: ${end.getTime() - start.getTime()} ms`);

start = new Date();
reverseArray(testArray);
end = new Date();
console.log(`time it took to reverse array using backward iteration: ${end.getTime() - start.getTime()} ms`);

start = new Date();
reverseArrayUsingWhileLoop(testArray);
end = new Date();
console.log(`time it took to reverse array using while loop: ${end.getTime() - start.getTime()} ms`);

start = new Date();
reverseArrayInPlace(testArray);
end = new Date();
console.log(`time it took to reverse array in place: ${end.getTime() - start.getTime()} ms`);

start = new Date();
reverseArrayInPlaceUsingWhileLoop(testArray);
end = new Date();
console.log(`time it took to reverse array in place using while loop: ${end.getTime() - start.getTime()} ms`);

start = new Date();
reverseSO(testArray);
end = new Date();
console.log(`time it took to reverse array with a swap function found on stackoverflow: ${end.getTime() - start.getTime()} ms`);