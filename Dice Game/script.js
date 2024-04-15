'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

let scores, playing, currentScore, activePlayer;
const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Displaing Dice with appropriate picture
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Checking if is 1 is rolled
    if (dice !== 1) {
      // Add the scores of player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

// Holding the score of a player

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player has 100 points
    if (scores[activePlayer] >= 100) {
      playing = false;
      // alert('score is equal or greater than 20');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // alert('active class is being applied');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Resetting the values after clicking New Game Button
btnNew.addEventListener('click', init);
