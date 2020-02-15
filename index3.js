const readline = require('readline');
 
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// | - - - starter code - do not change above - - - |
let currentRoom = "outside";

let player = {
  currentState: currentRoom, 
  inventory: []
}

function showInventory() {
  console.log('You are carrying, ' + player.inventory.toString())
}

let rooms = {
  'outside': {canChangeTo: ['sign'],   // outside is also known as "182 Main St."
              welcomeMessage: `182 Main St.
              You are standing on Main Street between Church and South Winooski.
              There is a door here. A keypad sits on the handle.
              On the door is a handwritten sign.
              (If you ever want to exit, just type -     exit   )`
            },
          
  'sign':   {canChangeTo: ['foyer'],
             welcomeMessage: `The sign says "Welcome to Burlington Code Academy! Come on
             up to the third floor. If the door is locked, use the code
             12345."`
            },

  'foyer': {canChangeTo: ['stairway'],
            welcomeMessage: 
            `You are in a foyer. Or maybe it's an antechamber. Or a 
            vestibule. Or an entryway. Or an atrium. Or a narthex.
            But let's forget all that fancy flatlander vocabulary,
            and just call it a foyer. In Vermont, this is pronounced
            "FO-ee-yurr". 
            You see a stairway ahead pf you. A copy of Seven Days lies in a corner.`
            },

  'stairway': {canChangeTo: ['hallway'],
               welcomeMessage:
              `You walk to the top of a long stair way 
              and arrive at a landing. Ahead of you is a hallway`
              },
  'hallway': {canChangeTo: ['classroom'],
              welcomeMessage:
              `You have entered a hallway and see the Burlington 
              Code Academy classroom entrance with a kitchen to its left`
              },
  'classroom': {canChangeTo: ['hallway'],
              welcomeMessage:
              `You enter the BCA classroom and find instructor Bob lecturing to 
              an empty classroom about recursion. He's clearly stuck in an infinite loop. 
              You notice his tea mug is empty`
               },
  'kitchen': {canChangeTo : ['hallway'],
              welcomeMessage:
              `You enter the kitchen. There, you find some utensils, 
              a coffee machine, and the ingredients to make some delicious green tea`
              },
};

// | - - - - - state machine - - - - - |

// func to govern allowable state (room) transitions 
function enterState(newState) {
  let validTransitions = rooms[currentRoom].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentRoom = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentRoom + ' to ' + newState;
  }
}

// | - - - initialize game  - - - |

async function start() {
  console.log(rooms[currentRoom].welcomeMessage);

  let answer = await ask('>_');
  answer = inputConverter(answer) // standardizes input to lower case, trimmed, string
  while(answer !== 'exit') {
    if (answer == 'read sign') {
      enterState('sign')
      console.log(rooms[currentRoom].welcomeMessage);
      console.log(currentRoom)
    } 
    else if (answer == 'take sign') {
      console.log ('That would be selfish. How will other students find their way?')
    } 
    else if (answer == 'open door' || 'open') { 
      console.log ('The door is locked. There is a keypad on the door handle.')
    } 
    else if (currentRoom === 'sign' && answer === 'enter code 12345' || currentRoom === 'sign' && answer === 'key in 12345') {
      console.log('Success! The door opens. You enter the foyer and the door\nshuts behind you');
      enterState('foyer')
      console.log(rooms[currentRoom].welcomeMessage);
    } 
    else if (answer == 'enter code 12345'|| answer == 'key in 12345'){ 
      enterState('outside')
      console.log(rooms[currentRoom].welcomeMessage);
    }
    else if (answer.includes("enter code ") && !answer.includes("12345")) {
      console.log("Bzzzzt! The door is still locked.")
    }
    else if (currentRoom === 'foyer' && answer == 'take seven days') {
      console.log ('You pick up the paper and leaf through it looking for comics\nand ignoring the articles, just like everbody else does');
      player.inventory.push('seven days')
    }
    else if (answer === ("drop seven days") && player.inventory.includes("seven days")){
      console.log (`You toss the "Seven Days" to the ground.`);
      player.inventory.pop()
    } 
    else if (answer === )
    else { 
    console.log("Sorry, I don't understand that.");
    }
    if (answer === 'inventory' || answer === 'i') {
    showInventory()
    start()
    }
  answer = await ask('>_');
  }
   process.exit();
}

start();

// | - - - process functions - do not change below  - - - |

// func to standardize input returning a lower case, trimmed, string
function inputConverter(string) { 
  let converted = string.toString().trim().toLowerCase();
  return converted;
}
