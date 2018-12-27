/*
    The standard JavaScript environment provides another data structure called Set.
    Like an instance of Map, a set holds a collection of values. Unlike Map, it does
    not associate other values with those—it just tracks which values are part of the set.
    A value can be part of a set only once—adding it again doesn’t have any effect.
    
    Write a class called Group (since Set is already taken). Like Set, it has add, delete,
    and has methods. Its constructor creates an empty group, add adds a value to the group
    (but only if it isn’t already a member), delete removes its argument from the group (if it was a member),
    and has returns a Boolean value indicating whether its argument is a member of the group.

    Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

    Give the class a static from method that takes an iterable object as argument and creates a
    group that contains all the values produced by iterating over it.

    example:
    class Group {
      // Your code here.
    }

    let group = Group.from([10, 20]);
    console.log(group.has(10));
    // → true
    console.log(group.has(30));
    // → false
    group.add(10);
    group.delete(10);
    console.log(group.has(10));
    // → false
 */

require("./resources/deep-comparison.js");

class Group {

    constructor() {
        this.elements = [];
    }

    static from(iterable) {
        let g = new Group();
        for (let i of iterable) {
            g.add(i);
        }
        return g;
    }

    add(value) {
        if (!this.elements.includes(value)) {
            this.elements.push(value);
        }
    }

    delete(value) {
        if (this.elements.includes(value)) {
            this.elements.splice(this.elements.indexOf(value), 1);
        }
    }

    has(value) {
        for (let i of this.elements) {
            if (Comparator.deepEqual(i, value)) {
                return true;
            }
        }
        return false;
    }
}

let group = new Group();
group.add(2);
group.add(3);
console.log(group);
console.log(group.has(1)); //false
console.log(group.has(2)); //true
console.log(group);
group.delete(2);
console.log(group);
console.log(group.has(2)); //false

let group2 = Group.from([{name: 'name', val: 1}, {name: 'name2', val: 2}, {name: 'name3', val: 3}, {
    name: 'name4',
    val: 4
}]);
console.log(group2);
console.log(group2.has({name: 'name', val: 1})); //true
console.log(group2.has({name: 'name', val: 8})); //false
