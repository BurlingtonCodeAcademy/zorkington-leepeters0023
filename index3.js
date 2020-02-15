const readline = require('readline');
 
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// | - - - starter code - do not change above - - - |

let currentRoom = "outside";

// player object 
let player = {
  currentState: currentRoom, 
  inventory: []
}

let rooms = {
  'outside': {canChangeTo: ['sign'],   // outside is also known as "182 Main St."
              welcomeMessage: `182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.
              (If you ever want to exit, just type - exit )`
            },
  'sign':   {canChangeTo: ['foyer', 'outside'],
             welcomeMessage: `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."`
            },
  'foyer': {canChangeTo: ['stairway', 'sign'],
            welcomeMessage: 
            `You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr". You see a stairway ahead of you. A copy of Seven Days lies in a corner.`
            },
  'stairway': {canChangeTo: ['hallway', 'foyer'],
               welcomeMessage:
              `You walk to the top of a long stair way and arrive at a landing. Ahead of you is a hallway`
              },
  'hallway': {canChangeTo: ['classroom', 'kitchen'],
              welcomeMessage:
              `You have entered a hallway and see the Burlington Code Academy classroom entrance with a kitchen to its left`
              },
  'classroom': {canChangeTo: ['hallway'],
              welcomeMessage:
              `You enter the BCA classroom and find instructor Bob lecturing to an empty classroom about recursion. He's clearly stuck in an infinite loop. You notice his tea mug is empty`
               },
  'kitchen': {canChangeTo : ['hallway'],
              welcomeMessage:
              `You enter the kitchen. There, you find some utensils, a coffee machine, and the ingredients to make some delicious green tea`
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
async function directions() {
  let input = await ask(`Welcome to zorKington, a land of many mysteries and immense beauty. Throughout the game, you will encounter many treasures. To take an item with you, simply type the name of the item. To drop an item, type 'drop_ item name'. To view your inventory, type 'inventory. Press enter to begin.`)
  if (input.includes('')) {
    start()
  } else { 
    directions() 
  }
}
// | - - - begin game  - - - |
async function start() {
  console.log(rooms[currentRoom].welcomeMessage);

  let answer = await ask('What would you like to do? \n >_');
      answer = inputConverter(answer) // standardizes input to lower case, trimmed, string

  while(answer !== 'exit') {
    if (answer === 'read sign') {
      enterState('sign')
      console.log(rooms[currentRoom].welcomeMessage);
    } 
    if (answer.includes('inventory')) {
      showInventory()
      start()
      }
    else if (answer === 'take sign') {
      console.log ('That would be selfish. How will other students find their way?')
    } 
    else if (answer.includes('12345')) {
        console.log('Success! The door opens. You enter the foyer and the door shuts behind you\n ');
        enterState('foyer')
        console.log(rooms[currentRoom].welcomeMessage)
      } 

    else if (answer.includes('take seven days')) {
      console.log ('You pick up the paper and leaf through it looking for comics\nand ignoring the articles, just like everbody else does. What would you like to do now?');
      player.inventory.push('seven days')
    } 
    //else if (answer.includes('drop') || answer.includes('leave')) {
      //console.log (`You toss the "Seven Days" to the ground.`);
      //player.inventory.pop()
      //start()
    //}
    else if (answer.includes('stair') || answer.includes('up')) {
      enterState('stairway')
      console.log(rooms[currentRoom].welcomeMessage)
      start()
    }

    else if (answer.includes('hall')) {
      enterState('hallway')
      console.log(rooms[currentRoom].welcomeMessage);
    }

    else if (answer.includes('kitchen')) {
      enterState('kitchen')
      console.log(rooms[currentRoom].welcomeMessage)
      if (answer.includes('tea')) {
        player.inventory.push('tea')
      } 
    }

    else if (answer.includes('class')) {
      enterState('classroom')
      console.log(rooms[currentRoom].welcomeMessage)
      if (answer.includes('leave')) {
        enterState('hallway')
        console.log(rooms[currentRoom].welcomeMessage)
        start()
      }
    } 
    else if (answer.includes('class')) {
      enterState('classroom')
      console.log(rooms[currentRoom].welcomeMessage)
      if (answer.includes('give bob tea')) {
        console.log('You win the game!')
        process.exit
      }
    }
    else {
      console.log("Sorry, I don't understand that.");
    }
  //answer = await ask('What would you like to do? \n >_');  
   process.exit();
  }
}

directions();

// | - - - process functions - do not change below  - - - |

// func to standardize input returning a lower case, trimmed, string
function inputConverter(string) { 
  let converted = string.toString().trim().toLowerCase();
  return converted;
}
// func to return player inventory at a given time as a string 
function showInventory() {
  console.log('You are carrying, ' + player.inventory.toString())
}