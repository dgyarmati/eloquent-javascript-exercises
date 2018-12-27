/*
    Make the Group class from the previous exercise iterable.
    Refer to the section about the iterator interface earlier in the
    chapter if you aren’t clear on the exact form of the interface anymore.

    If you used an array to represent the group’s members, don’t just return
    the iterator created by calling the Symbol.iterator method on the array.
    That would work, but it defeats the purpose of this exercise.

    It is okay if your iterator behaves strangely when the group is modified during iteration.

    example:
    for (let value of Group.from(["a", "b", "c"])) {
      console.log(value);
    }
    // → a
    // → b
    // → c
 */

require("./resources/group.js");

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.currentIndex = 0;
    }

    next() {
        let currentElement = this.group.elements[this.currentIndex];
        if (currentElement === undefined) {
            return {done: true};
        }
        this.currentIndex++;
        return {value: currentElement, done: false};
    }
}

Group.prototype[Symbol.iterator] = function () {
    return new GroupIterator(this);
};

for (let element of Group.from(["a", "b", "c"])) {
    console.log(element);
}