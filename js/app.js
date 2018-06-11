const deck = document.querySelector(".deck");
const newGame = document.querySelector(".restart");
const moves = document.querySelector(".moves");
let clickCounter = 0;
let openCards = document.getElementsByClassName("open");
let openArray = [];
let matches = document.getElementsByClassName("match");
let stars = document.querySelector(".stars");
let modal = document.getElementById("end-modal");
let modalText = document.getElementById("end-text");
const newGameBtn = document.getElementById("newGame");
const endGameBtn = document.getElementById("closeGame");
let timer = document.getElementsByClassName("timer");
let seconds = 0;
let running;

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

// start a new game, delete old game deck and stats
function startNewGame() {
  deck.innerHTML="";
  seconds = 0;
  createDeck();
  clickCounter = 0;
  moves.innerText = "";
  console.log("New Deck created");
  openArray = [];
  stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
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
    setTimeout(function() {flip(); }, 1000);
    // Give user a chance to memorize cards before flipping them back
  }
}

function starCounter(){
  if (clickCounter <= 8){
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
  } else if (clickCounter > 8 && clickCounter <=10){
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
  } else {
    stars.innerHTML = '<li><i class="fa fa-star"></i>'
  }
}

function gameOver() {
  if (matches.length === cards.length){
    clearInterval(running);
    modalText.innerText = `Congratulations! You finished the game in ${clickCounter} moves in ${seconds} seconds. What would you like to do next?`;
    modal.style.display = "block";
  }
}

function stopwatch(){
  running = setInterval(function(){
    seconds++;
  },1000)
  timer.innerHTML = seconds + " seconds";
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
  stopwatch();
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

// when restart button is clicked:
newGame.addEventListener("click", function(){
  startNewGame();
})

// card flips and shows on click
deck.addEventListener("click", function(event){
  if (event.target.nodeName == "LI" && openCards.length < 2 && !event.target.classList.contains("match")){
    //event should not fire when - UL is clicked instead of LI - AND when 2 cards are already open - AND when
    //the target element already has the class match
  event.target.classList.add("open", "show");
  openArray.push(event.target);
  count();
  if (openArray.length ===2) {
    compare();
    starCounter();
  }
  gameOver();
  }
})

endGameBtn.addEventListener("click", function(){
  modal.style.display = "none";
})

newGameBtn.addEventListener("click", function(){
  modal.style.display = "none";
  startNewGame();
})
