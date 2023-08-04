/* eslint-disable */
import "./style.css";

let iconsArray = ["fa-clover", "fa-spa", "fa-heart", "fa-diamond"];
// let numbersAndLetter = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
let letters = { J: 11, Q: 12, K: 13, A: 1 };

let cards = []; // CONTAINS ALL THE CARDS

const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max - min) + min);

// FUNCTIONS TO GET CARD DATA

const getColor = icon => {
  let numbersOfIcons = 2;
  let color = "";
  for (let i = 0; i < numbersOfIcons; i++) {
    icon === "fa-clover" || icon === "fa-spa"
      ? (color = "black")
      : (color = "red");
  }
  return color;
};

const getIcon = () => iconsArray[getRandomNumber(0, iconsArray.length)];
const getNumberOrLetter = () => numbers[getRandomNumber(0, numbers.length)];

// GETTING CARD INFO

const createGeneratedCard = () => {
  const icon = getIcon();
  const color = getColor(icon);
  const number = getNumberOrLetter();

  return { icon, color, number };
};

// SHOW CARD

const showGeneratedCard = () => {
  let cardContainer = document.querySelector(".card-container");
  let cardsHTML = "";

  cards = []; // CLEANING CARDS ARRAY

  // GENERATE CARDS
  const inputValue = Number(document.getElementsByTagName("input")[0].value);
  for (let i = 0; i < inputValue; i++) cards.push(createGeneratedCard());

  for (let i = 0; i < cards.length; i++) {
    const { icon, color, number } = cards[i];

    // CHECK IF THE NUMBER IS EQUAL TO A LETTER
    for (let letter in letters) {
      if (number == letters[letter]) number = letter;
    }

    cardsHTML += `
			<div class="card">
				<header class="card-header">
					<i class="fa-solid ${icon}" style="color: ${color};"></i>
				</header>
				<article class="card-body">
					<p id="face">${number}</p>
				</article>
				<footer class="card-footer">
					<i class="fa-solid ${icon}" style="color: ${color};"></i>
				</footer>
			</div>
		`;
  }

  cardContainer.innerHTML = cardsHTML;
};

/* AÚN NO PUEDO COMPLETAR EL ORDER CARDS */

const orderCards = (arr = cards) => {
  let min = 0;
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length - 1; i++) {
      if (arr[min] > arr[i]) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
      }
    }
    min++;
  }
  return arr;
};

const showOrderCards = () => {
  let orderContainer = document.querySelector(".order-container");
  let orderCardsHTML = `<div class="select-sort"></div>`;

  let text = "";
  for (let i = 0; i < cards.length; i++) {
    const { icon, color, number } = cards[i];

    // CHECK IF THE NUMBER IS EQUAL TO A LETTER
    for (let letter in letters) if (number == letters[letter]) number = letter;

    text += `
      <div class="card">
        <header class="card-header">
          <i class="fa-solid ${icon}" style="color: ${color};"></i>
        </header>
        <article class="card-body">
          <p id="face">${number}</p>
        </article>
        <footer class="card-footer">
          <i class="fa-solid ${icon}" style="color: ${color};"></i>
        </footer>
      </div>
		`;
  }
  orderContainer.innerHTML = orderCardsHTML;
  document.querySelector(".select-sort").innerHTML = text;
};

document.getElementById("button").addEventListener("click", () => {
  showGeneratedCard();
  orderCards();
  showOrderCards();
  console.log(cards);
});
