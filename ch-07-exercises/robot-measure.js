// BOOK CODE BEGINS HERE //

var roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
};

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

// BOOK CODE ENDS HERE //

/*
    It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks
    or the kind of tasks that it is good at, whereas the other didn’t.

    Write a function compareRobots that takes two robots (and their starting memory).
    It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

    For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.

    function compareRobots(robot1, memory1, robot2, memory2) {
      // Your code here
    }

    compareRobots(routeRobot, [], goalOrientedRobot, []);
 */

function runRobotWithMemoryOutput(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function generateTasks() {
    let tasks = [];
    for (let i = 0; i <= 100; i++) {
        let task = VillageState.random();
        tasks.push(task);
    }
    return tasks;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let tasks = generateTasks();
    let totalNumberOfTasks = tasks.length;
    let robot1steps, robot2steps;
    robot1steps = robot2steps = 0;

    for (let task of tasks) {
        robot1steps = robot1steps + runRobotWithMemoryOutput(task, robot1, memory1);
    }
    for (let task of tasks) {
        robot2steps = robot2steps + runRobotWithMemoryOutput(task, robot2, memory2);
    }

    return {
        robot1: {steps: robot1steps, avg: robot1steps / totalNumberOfTasks},
        robot2: {steps: robot2steps, avg: robot2steps / totalNumberOfTasks}
    };
}

let averages1 = compareRobots(goalOrientedRobot, [], randomRobot, []);
let averages2 = compareRobots(goalOrientedRobot, [], routeRobot, []);
console.log(`average steps taken - goal oriented robot: ${averages1.robot1.avg}, random robot: ${averages1.robot2.avg}`);
console.log(`average steps taken - goal oriented robot: ${averages2.robot1.avg}, route robot: ${averages2.robot2.avg}`);