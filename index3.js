const readline = require('readline');
 
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let currentRoom = "outside";

let player = {
  currentState: currentRoom, 
  inventory: []
}

function showInventory() {
  console.log('You are carrying, ' + player.inventory.toString())
}

le rooms = {
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
            A copy of Seven Days lies in a corner.`
           },

  'stairway': {canChangeTo: ['hallway']},
  'hallway': {canChangeTo: ['classroom']},
  'classroom': {canChangeTo: ['hallway']},
  'stairway': {canChangeTo: ['foyer']}
};

function enterState(newState) {
  let validTransitions = rooms[currentRoom].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentRoom = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentRoom + ' to ' + newState;
  }
}

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
    else if (answer !== 'open' || 'open door') {
    console.log('Sorry, I do not know how to ' + answer)
    } 
    else if (currentRoom === 'sign' && answer === 'enter code 12345' || currentRoom === 'sign' && answer === 'key in 12345') {
    console.log('Success! The door opens. You enter the foyer and the door\nshuts behind you');
    enterState('foyer')
    console.log(rooms[currentRoom].welcomeMessage);
    } 
    else if (answer == 'enter code 12345'||answer == 'key in 12345')
    { enterState('outside')
      console.log(rooms[currentRoom].welcomeMessage);
    }
   else if (answer.includes("enter code ") && !answer.includes("12345")){
      console.log("Bzzzzt! The door is still locked.")
    }
    else if (currentRoom == 'foyer' && answer == 'take seven days')   // need to add || 'take paper'
    {
      console.log ('You pick up the paper and leaf through it looking for comics\nand ignoring the articles, just like everbody else does');
      player.inventory.push('seven days')
    }
      else if (answer == ("drop seven days") && player.inventory.includes("seven days"))
      {
        console.log (`You toss the "Seven Days" to the ground.`);
        player.inventory.pop('seven days')
       }

 else { 
    console.log("Sorry, I don't understand that.");
  }
  if (answer === 'inventory') {
    showInventory()
  }
  answer = await ask('>_');
  }
   process.exit();
}

  // need to build in the 'i' || 'inventory' || 'take inventory' functionality to 
  // list the array of items you are carrying

start();

function inputConverter(string) { // standardizes input to lower case, trimmed, string
  let converted = string.toString().trim().toLowerCase();
  return converted;
}