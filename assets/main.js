let cards = document.querySelectorAll('.flip-card-inner');
let numberOfMatches = cards.length / 2;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer = null;
let sec = 0;

function pad ( seconds ) { return seconds > 9 ? seconds : "0" + seconds; }

function flipCard() {
  if (timer === null){
    timer = setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
  }
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.imagename === secondCard.dataset.imagename;

  if(isMatch){
    disableCards();
    --numberOfMatches;

    if(numberOfMatches === 0){
        window.clearInterval(timer);
        setTimeout(endGame, 5000);
    }
   }else {
    unflipCards();
   }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
    document.querySelectorAll('.flip-card').forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

cards.forEach(card => card.addEventListener('click', flipCard));

function endGame (){
    timer = null;
    cards.forEach(card => {
        card.classList.remove('flip');
    });
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
    sec = 0;

}
shuffle();