'use strict';

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
