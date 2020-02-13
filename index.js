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

// | - - - - - state machine - - - - - |

let states = {
  'roomOne': { canChangeTo: [ 'roomTwo' ] },
  'roomTwo': { canChangeTo: [ 'roomThree' ] },
  'roomThree': { canChangeTo: [ 'roomOne' ] }
};

let currentState = "green";
function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

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

  