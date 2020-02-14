const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  }); 
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

// | - - - - - room creation - - - - - |

const roomLookUp = {
  'outside' : outside,
  'foyer' : foyer,
  'classRoom' : classRoom,
  'kitchen' : kitchen,
  'cityMarket' : cityMarket,
  'eMainSt' : eMainSt,
  'uvmFrat' : uvmFrat,
  'wMainSt' : wMainSt,
  'cityHallPark' : cityHallPark,
  'kdd' : kkd
} 
class Room {
  constructor(desc, inv, unlocked) {
    this.desc = desc
    this.inv = inv
    this.locked = unlocked 
  }
}
 
function createRoom(inventory) {
  return new Room(' ', [], unlocked) /
}

let outside = createRoom()
let foyer = createRoom()
let classRoom = createRoom()
let kitchen = createRoom()
let cityMarket = createRoom()
let eMainSt = createRoom()
Let uvmFrat = createRoom()
let wMainSt = createRoom()
let cityHallPark = createRoom()
let kkd = createRoom() 

// | - - - - - room creation - - - - - |

// | - - - - - state machine - - - - - |

let location = {
  'outside' : { canChangeTo: [ 'foyer', 'eMainSt', 'wMainSt' ] },
  'foyer' : { canChangeTo: [ 'outside', 'classRoom' ] },
  'classRoom' : { canChangeTo: [ 'kitchen' ] },
  'kitchen' : { canChangeTo: [ 'classRoom' ] },
  'cityMarket' : { canChangeTo: [ 'eMainSt' ] },
  'eMainSt' : { canChangeTo: [ 'cityMarket', 'uvmFrat' ] },
  'uvmFrat' : { canChangeTo: [ 'eMainSt' ] },
  'wMainSt' : { canChangeTo: [ 'outside', 'cityHallPark', 'kkd' ] },
  'cityHallPark' : { canChangeTo: [ 'wMainSt' ] },
  'kdd' : { canChangeTo: [ 'wMainSt' ] }
};

let currentLocation = "outside";

function changeLocation(newLocation) {
  let validTransitions = location[currentLocation].canChangeTo;
  if (validTransitions.includes(newLocation)) {
    currentLocation = newLocation;
  } else {
    throw 'Invalid state transition attempted - from ' + currentLocation + ' to ' + newLocation;
  }
}
// | - - - - - state machine - - - - - |

// | - - - - player attributes - - - - |

let player = {
  inventory: [],
  health: []
  }

let commands = {
    affirmative: ['y', 'yes', 'ya', 'yeah', 'yeah'],
    negative: ['no', 'n', 'nope', 'nay'],
    direction: ['north', 'n', 'south', 's', 'east', 'e', 'west', 'w'],
    movement: ['go', 'move', 'enter', 'walk'],
    actions: ['read', 'take', 'use', 'get', 'eat', 'buy', 'make', 'open', 'unlock', 'enter', 'give', 'drop', 'leave']
  }
// | - - - - player attributes - - - - |
// | - - - - - action functions - - - - - |
function pickUpItem(item) {
  this.inventory.push(item)
}
function dropItem(item) {
  this.inventory. // come back to this 
}

function 
// | - - - - - action functions - - - - - |
start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}


// ------ example of a state machine ------ 
// this is where our look up table applies if we want our light or room status to map to an object rather than a string,
// this way, we can refer to each room before its been initialized in the code and allows us to process strings as the come in from the user

}
let states = {
  'green' : {allowableChange: ['yellow', 'flashing green']},
  'flashing green' : {allowableChange: ['yellow']},
  'yellow' : {allowableChange: ['flashing yellow', 'red']},
  'red' : {allowableChange: ['flashing red', 'green']},
  'flashing red' : {allowableChange: ['red']}
}
let lightStatus = 'green'
function changeLight(change) {
  if (states[lightStatus].allowableChange.includes(change)) {  // since allowable state transitions are arrays, we can use array methods!
    lightStatus = change
  } else {
    throw('invalid state transition attempted') // throw exits the program 
    // could also console.log a message
  }
}
changeLight('yellow')

/* 
at least 5 rooms
  one locked
players object
  let player = {
    inventory : []
    health : 10
    location, present and past : [] use this like a stack with pop and push 
  }

a person to interact with 
prompts noting player status based on input / things acquired / persons interacted with
a way to win (player acquires Rise and Shiner from KKD)
a way to exit and start over // possibly a way to loose

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} 

start()

async function start() {
  console.log

