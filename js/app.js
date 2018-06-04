const deck = document.querySelector(".deck");
const newGame = document.querySelector(".restart");
const moves = document.querySelector(".moves");
let clickCounter = 0;
let openCards = document.getElementsByClassName("open");
let openArray = [];

/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-diamond", "fa-diamond",
      "fa-paper-plane-o", "fa-paper-plane-o",
      "fa-anchor", "fa-anchor",
      "fa-bolt", "fa-bolt",
      "fa-cube", "fa-cube",
      "fa-leaf", "fa-leaf",
      "fa-bicycle", "fa-bicycle",
      "fa-bomb", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function createDeck(){
  cards = shuffle(cards);
  console.log(cards);
  for (i=0; i<cards.length; i++){
    const newCard = document.createElement("li");
    newCard.classList.add("card");
    deck.appendChild(newCard);
    const icon = document.createElement("i");
    icon.classList.add("fa", cards[i]);
    newCard.appendChild(icon);
  }
}
createDeck();

/* create new deck when restart button is clicked, delete old deck*/
newGame.addEventListener("click", function(){
  deck.innerHTML="";
  createDeck();
  clickCounter = 0;
  moves.innerText = "";
  console.log("New Deck created");
})

/* card flips and shows on click */
deck.addEventListener("click", function(event){
  if (event.target.nodeName == "LI"){
  event.target.classList.add("open", "show");
  clickCounter += 0.5;
  console.log ("clicks: " + clickCounter);
  if (clickCounter === 0 || clickCounter === 0.5){
      moves.innerText = "";
  } else if (clickCounter === 1 || clickCounter === 1.5) {
    moves.innerText = Math.floor(clickCounter) + " Move";
  } else {
    moves.innerText = Math.floor(clickCounter) + " Moves";
  }
  }
})

/* Flip cards back over by removing open and show classes */
function flip() {
  for (i=0; i<openCards.length; i++ ){
    openArray.push(openCards[i]);
  }
  openArray[0].classList.remove("open", "show");
  openArray[1].classList.remove("open", "show");
}

function match(){
  for (i=0; i<openCards.length; i++ ){
    openArray.push(openCards[i]);
  }
  openArray[0].classList.add("match");
  openArray[0].classList.remove("open", "show");
  openArray[1].classList.add("match");
  openArray[1].classList.remove("open", "show");
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
