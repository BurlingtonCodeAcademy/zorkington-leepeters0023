/*const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  }); 
}
*/
// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

// | - - - - - room creation begin - - - - - |

class Room {
  constructor(desc, inv, locked) {
    this.desc = desc
    this.inv = inv
    this.locked = locked
  }
}

let outside = createRoom('message a', [1, 2, 3], 'locked')
let foyer = createRoom('message b', [5, 6, 7], 'locked')
let classRoom = createRoom()
let kitchen = createRoom()
let cityMarket = createRoom()
let eMainSt = createRoom()
let uvmFrat = createRoom()
let wMainSt = createRoom()
let cityHallPark = createRoom()
let kkd = createRoom()

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

function createRoom(desc, inv, locked) {
  return new Room(' ', [], 'locked')
}

console.log(outside)
console.log(foyer)

  
// | - - - - - room creation end - - - - - |

// | - - - - - state machine begin - - - - - |
/*
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

changeLocation(foyer)

// | - - - - - state machine end - - - - - |

// | - - - - player attributes begin - - - - |

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
// | - - - - player attributes end - - - - |

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
let answer = await ask(welcomeMessage);
if (answer === commands.actions.includes[answer]) {
  currentLocation === foyer
  console.log(currentLocation)
} 

  /*console log the sign says x y z
if answer === actions.includes(answer) 
  player.inventory.push(item)

call start function again

answer = await ask ' what do you want to do?'
if answer === actions.includes(answer), desired response here is for player to enter correctly door code
if code === correct code 
  currentlocation === foyer
  console log foyer message
else 
  console log incorrect code 

call start function again

answer = await ask 'what do you want to ?'
if answer === actions.includes(answer) // desired response, player goes up stairs to enter classroom
  currentlocation === classroom
  console log classroom message // desired action, player gets tea for bob "leave classroom" -> "enter kitchen"
....

call start function again

answer = await ask 'what do you want to ?'
currentlocation === kitchen
console log kitchen message // desired action, player makes tea "make tea"
if answer === actions.includes(answer) 
  player.inventory.push(item)
else 
call start function again

answer = await ask 'what do you want to ?'
if answer === actions.includes(enter classroom)
currentlocation === classroom
console log new classroom message triggerd by second time player enters 
  -- > Bob asks where is my tea?
if answer === give tea to bob
  player.inventory.pop[]
  console.log here's a coupon for KKD!
  player.push[coupon]

call start function again

answer = await ask 'what do you want to ?'
if answer === actions.includes(leave classroom)
 -> if kitchen, inventory of kitchen must no longer include tea
 -> if foyer, must now be unlocked
    desired action here is player enters foyer
if answer === actions.includes(enter street, leave foyer, etc etc)
currrentlocation === outside

call start function again

answer = await ask 'what do you want to ?'
if answer === actions.include(e, east, east main)
  currentlocation === eMainSt 
  consoleLog eMainst Message

call start function again
answer = await ask 'what do you want to ?'
if answer === actions.includes(city market, north, n)
  console log cityMarket message
  process.exit
*/









