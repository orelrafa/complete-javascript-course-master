'use strict';
/*
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

let roll;
const rollDice = function () {
  roll = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `assets/dice-${roll}.png`;
};

document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--hold').addEventListener('click', rollDice);
document.querySelector('.btn--new').addEventListener('click', rollDice);
*/

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2. Display dice
  diceEl.src = `assets/dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  //3. check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    currentScore += dice;
  } else {
    //switch to next player
  }
});
