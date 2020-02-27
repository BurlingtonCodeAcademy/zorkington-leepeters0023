// project #2 Zorkington, a text adventure game - Lee and Denis 

const readline = require('readline');
 
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
// | - - - starter code - do not change above - - - |

let currentRoom = "outside";

// player inventory
let inventory = []

// | - - - room definitions including messages and allowable state (location) transitions - - - |
let rooms = {
  'outside': {canChangeTo: ['sign', 'outside', 'foyer'],   // outside is also known as "182 Main St."
              welcomeMessage: `182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.`
            },
  'sign':   {canChangeTo: ['outside', 'sign'],
             welcomeMessage: `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."`
            },
  'foyer': {canChangeTo: ['stairway', 'sign', 'foyer'],
            welcomeMessage: 
            `You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander\nvocabulary, and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr". You see a stairway ahead of you. A copy of Seven Days lies in a corner.`,
            locked : true
            },
  'stairway': {canChangeTo: ['hallway', 'foyer', 'stairway'],
               welcomeMessage:
              `You walk to the top of a long stair way and arrive at a landing. Ahead of you is a hallway`
              },
  'hallway': {canChangeTo: ['classroom', 'kitchen', 'hallway'],
              welcomeMessage:
              `You have entered a hallway and see the Burlington Code Academy classroom entrance with a kitchen to its left`
              },
  'classroom': {canChangeTo: ['hallway', 'classroom'],
              welcomeMessage:
              `You enter the BCA classroom and find instructor Bob lecturing to an empty classroom about recursion. He's clearly stuck in an infinite loop.\nYou notice his tea mug is empty`
               },
  'kitchen': {canChangeTo : ['hallway', 'kitchen'],
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
    console.log(`Can't go that way`);
  }
}


// | - - - begin game / top to bottom flow - - - |

async function start() {
  console.log(rooms[currentRoom].welcomeMessage);

  let answer = await ask('What would you like to do? \n >_');
      answer = inputConverter(answer) // standardizes input to lower case, trimmed, string

  while(answer !== 'exit') {
    if (answer.includes('read')) {
      enterState('sign')
      console.log(rooms[currentRoom].welcomeMessage);
    } 
    else if (answer.includes('inventory')) {
      showInventory() // call to show inventory function displaying 'inventory' array
      }
    else if (answer === 'take sign') {
      console.log ('That would be selfish. How will other students find their way?')
    } 

    else if (answer !== '12345' && currentRoom === 'sign') {
      console.log('Sorry, that is the wrong code, try again\n ');
    }
    else if (answer.includes('12345')) {
        console.log('Success! The door opens. You enter the foyer and the door shuts behind you\n ');
        rooms.foyer.locked = false
        rooms.sign.canChangeTo.push('foyer')
        enterState('foyer')
        console.log(rooms[currentRoom].welcomeMessage)
      } 

    else if ((answer.includes('take seven') && currentRoom === 'foyer')) {
      console.log ('You pick up the paper and leaf through it looking for comics\nand ignoring the articles, just like everbody else does.');
      addToInventory('Seven Days') 
    }   
    
    else if (answer.includes('drop seven')) {
      dropFromInventory('Seven Days')
    }
  
    else if (answer.includes('stair') || answer.includes('up') || answer.includes('climb')) {
      enterState('stairway')
      console.log(rooms[currentRoom].welcomeMessage)
    }

    else if (answer.includes('hall')) {
      enterState('hallway')
      console.log(rooms[currentRoom].welcomeMessage);
    }

    else if (answer.includes('kitchen')) {
      enterState('kitchen')
      console.log(rooms[currentRoom].welcomeMessage)
    }

    else if ((answer.includes('take tea') || answer.includes('make tea')) && currentRoom === 'kitchen') {
      addToInventory('tea')
    } 
    
    else if (answer.includes('class')) {
      enterState('classroom')
      console.log(rooms[currentRoom].welcomeMessage)
    } 

    else if ((answer.includes('give bob tea') || answer.includes('drop tea')) && currentRoom === 'classroom') {
      dropFromInventory('tea')
      console.log('You win the game!')
      process.exit()
    }
    else {
      console.log("Sorry, I don't understand that.")
    }
  answer = await ask('What would you like to do? \n >_') 
  }
}

directions();

// | - - - process functions - do not change below  - - - |

// | - - - initialize game  - - - |
async function directions() {
  let input = await ask(`Welcome to zorKington, a land of many mysteries and immense beauty. Throughout the game, you will encounter many treasures. To take an item with you, simply type the name 'take' and of the item. To drop an item, type 'drop_ item name'. To view your inventory, type 'inventory. \nIf you ever want to exit, just type 'exit'.\nPress enter to begin.`)
  if (input.includes('')) {
    start()
    enterState('outside')
  } else { 
    directions() 
  }
}

// func to standardize input returning a lower case, trimmed, string
function inputConverter(string) { 
  return string.toString().trim().toLowerCase();

}
// func to return player inventory at a given time as a string 
function showInventory() {
  console.log('You are carrying, ' + inventory.toString())
}
// func to add items to player's 'inventory' array
function addToInventory(toAdd) {
  inventory.push(toAdd)
  console.log('You have added ' + toAdd)
}
// func to remove items from player 'inventory' array
function dropFromInventory(toDrop) {
  console.log('You have dropped ' + toDrop)
  let dropIndex = inventory.indexOf(toDrop);
  inventory.splice(dropIndex, 1)
}
