const gameContainer = document.getElementById("game");


const COLORS = [
  "#FF0099",
  "#3399FF",
  "#33CC99",
  "#FFFF66",
  "#9933CC",
  "#FF0099",
  "#3399FF",
  "#33CC99",
  "#FFFF66",
  "#9933CC"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(shuffledColors) {
  for (let color of shuffledColors) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



let count = 0;
let noClicking = false;
let cardsMatched = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // Make sure that you can not click too quickly and guess more than two cards at a time.
  if (noClicking) return;
  const currentCard = event.target
  const color = currentCard.classList[0];


  //as long as < 2 cards have been selected and card is not already face up, allow user to select a card
  if ((count < 2) && (!currentCard.classList.contains("faceUp"))) {
    // increment guess count,  mark card faceUp, assign card as guess1 or guess2
    count++;
    currentCard.classList.toggle("faceUp")
    count === 1 ? guess1 = currentCard : guess2 = currentCard;
   }

  if (count === 2) {
    noClicking = true;
    // if the 2 cards selected match, add matched to classList and clear click event
    if (guess1.classList[0] === guess2.classList[0]) {
      console.log("match")
      guess1.classList.add("matched")
      guess2.classList.add("matched")
      guess1.removeEventListener("click", handleCardClick);
      guess1.removeEventListener("click", handleCardClick);
      count = 0;
      cardsMatched += 2;

      setTimeout(function() {
        noClicking = false;
      }, 1000)

    } else {
      //otherwise, it's not a match, toggle faceUp and reset count
      console.log("not a match");
      // When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
      setTimeout(function() {
        guess1.classList.toggle("faceUp")
        guess2.classList.toggle("faceUp")
        noClicking = false;
        count = 0;
        faceUpCheck()
      }, 1000)

      // Run function to turn over any cards without class name of faceUp
      faceUpCheck()

    }
  };

  //Clicking a card should change the background color to be the color of the class it has.
  if (currentCard.classList.contains("faceUp")) {
    currentCard.style.backgroundColor = color
  } else {
    currentCard.style.backgroundColor = "white";
  }

  // Let user know they have won if number of cards matched = the number of colors(or tiles)
if (cardsMatched === COLORS.length) {
  alert("You've won!")
}

};


//Function to turn over any cards without class name of faceUp
function faceUpCheck() {
  for (let div of divs) {
    if (!div.classList.contains("faceUp")) {
      div.style.backgroundColor = "white"
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
const divs = document.querySelectorAll("div")



