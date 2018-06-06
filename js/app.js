const deck = document.querySelector(".deck");
const newGame = document.querySelector(".restart");
const moves = document.querySelector(".moves");
let clickCounter = 0;
let openCards = document.getElementsByClassName("open");
let openArray = [];
let matches = document.getElementsByClassName("match");

let cards = ["fa-diamond", "fa-diamond",
      "fa-paper-plane-o", "fa-paper-plane-o",
      "fa-anchor", "fa-anchor",
      "fa-bolt", "fa-bolt",
      "fa-cube", "fa-cube",
      "fa-leaf", "fa-leaf",
      "fa-bicycle", "fa-bicycle",
      "fa-bomb", "fa-bomb"];

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

// Flip cards back over by removing open and show classes
function flip() {
  openArray[0].classList.remove("open", "show");
  openArray[1].classList.remove("open", "show");
  openArray = [];
}

// lock a match by removing open and show and setting match classes
function match(){
  openArray[0].classList.add("match");
  openArray[0].classList.remove("open", "show");
  openArray[1].classList.add("match");
  openArray[1].classList.remove("open", "show");
  openArray = [];
}

function compare(){
  if (openArray[0].innerHTML == openArray[1].innerHTML){
    match();
  } else {
    setTimeout(function() { flip(); }, 1000);
  }
}

function gameOver() {
  if (matches.length === 16){
    alert("You won!");
  }
}

// counts every pair of cards that's clicked
function count(){
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

// create new deck when restart button is clicked, delete old deck, reset counter
newGame.addEventListener("click", function(){
  deck.innerHTML="";
  createDeck();
  clickCounter = 0;
  moves.innerText = "";
  console.log("New Deck created");
  openArray = [];
})

// card flips and shows on click
deck.addEventListener("click", function(event){
  if (event.target.nodeName == "LI" && openCards.length < 2 && !event.target.classList.contains("match")){
    //event should not fire when - UL is clicked instead of LI - AND when 2 cards are already open - AND when
    //the target element already has the class match
  event.target.classList.add("open", "show");
  openArray.push(event.target);
  count();
  compare();
  gameOver();
  }
  // check for matches and run flip or match function
})


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
