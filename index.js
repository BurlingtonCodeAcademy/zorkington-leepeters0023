const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines
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


/* 
at least 5 rooms
  one locked
players object
  let player = {
    inventory : []
    health : 10
    location, present and past : [] use this like a stack with pop and push 
  }
rooms object {
  room = " "
  story = " "
  inventory = []
  enter_event = 
  exit_event = 
  lock = locked true or false 
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