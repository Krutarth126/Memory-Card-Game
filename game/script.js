const cards = document.querySelectorAll(".memory-card");
let winingNumber = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  secondCard = this;

  checkResult();
}

function checkResult() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  checkWinner();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
})();

function resetPage() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
}

document.querySelector("#reset").addEventListener("click", resetPage);
function checkWinner() {
  let newCards = [];
  cards.forEach((data) => {
    let check = data.classList.contains("flip");
    if (check === true) {
      newCards.push(true);
      return true;
    } else {
      false;
    }
  });
  setTimeout(() => {
    if (cards.length === newCards.length) {
      console.log("winner");
      winingNumber = winingNumber + 1;
      document.querySelector("#score").innerHTML = winingNumber;
    }
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
document.querySelector("#score").innerHTML = winingNumber;
