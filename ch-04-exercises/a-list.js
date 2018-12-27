/*
    let list = {
      value: 1,
      rest: {
        value: 2,
        rest: {
          value: 3,
          rest: null
        }
      }
    };

    Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
    Also write a listToArray function that produces an array from a list. Then add a helper function prepend, which takes an element and a list
    and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns
    the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

    If you haven’t already, also write a recursive version of nth.

    example:

    console.log(arrayToList([10, 20]));
    // → {value: 10, rest: {value: 20, rest: null}}
    console.log(listToArray(arrayToList([10, 20, 30])));
    // → [10, 20, 30]
    console.log(prepend(10, prepend(20, null)));
    // → {value: 10, rest: {value: 20, rest: null}}
    console.log(nth(arrayToList([10, 20, 30]), 1));
    // → 20
 */

function arrayToList(array) {
    let list = {};
    let currentNode = list;
    for (let i = 0; i < array.length; i++) {
        currentNode.value = array[i];
        currentNode.rest = {};
        currentNode = currentNode.rest;
    }
    return list;
}

function listToArray(list) {
    let array = [];
    let currentNode = list;
    for (let i = 0; currentNode.rest !== undefined; i++) {
        array[i] = currentNode.value;
        currentNode = currentNode.rest;
    }
    return array;
}

function listToArray2(list) {
    let array = [];
    for (let node = list; node.rest !== undefined; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

let list0 = arrayToList([1, 2, 3]);
console.log(listToArray2(list0));

function prepend(element, list) {
    let newList = {};
    newList.value = element;
    newList.rest = list;
    return newList;
}

function nth(list, position) {
    let currentNode = list;
    for (let i = 0; i <= position && currentNode.rest !== undefined; i++) {
        if (i === position) {
            return currentNode.value;
        }
        currentNode = currentNode.rest;
    }
    return undefined;
}

function recursiveNth(list, position, currentPosition = 0) {
    if (position === currentPosition) {
        return list.value;
    }
    if (list.rest === undefined) {
        return undefined;
    }
    return recursiveNth(list.rest, position, ++currentPosition);
}

function recursiveNth2(list, position) {
    if (position === 0) {
        return list.value;
    }
    if (list.rest === undefined) {
        return undefined;
    }
    return recursiveNth(list.rest, --position);
}

let list = arrayToList([1, 2, 3]);
let array = listToArray(list);

console.log(list);
console.log(array);
console.log(prepend(10, list));
console.log(prepend(10, prepend(20, null)));

let list2 = arrayToList([10, 20, 30]);
console.log(nth(list2, 2));
console.log(recursiveNth(list2, -1));
console.log(recursiveNth(list2, 2));
console.log(recursiveNth2(list2, 2));