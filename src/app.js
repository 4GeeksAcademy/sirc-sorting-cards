/* eslint-disable */
import "./style.css";

let cards = []; // CONTAINS ALL THE CARDS

let iconsArray = ["fa-clover", "fa-spa", "fa-heart", "fa-diamond"];
let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
let letters = { J: 11, Q: 12, K: 13, A: 1 };

// ----- MAKE CARD CONTAINER BIGGER OR SMALLER ---------

const modifyGridSystem = inputValue => {
  document
    .querySelector(".order-container")
    .style.setProperty(
      "grid-template-columns",
      "repeat(" + (inputValue + 1) + ", 1fr)"
    ); // ORDER CONTAINER
  if (inputValue >= 12) inputValue = Math.floor(inputValue / 2);
  if (inputValue <= 4) inputValue *= 2;
  document
    .querySelector(".card-container")
    .style.setProperty(
      "grid-template-columns",
      "repeat(" + inputValue + ", 1fr)"
    ); // CARD CONTAINER
};

// ----- FUNCTIONS TO GET CARD DATA ---------

const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max - min) + min);
const getIcon = () => iconsArray[getRandomNumber(0, iconsArray.length)];
const getNumberOrLetter = () => numbers[getRandomNumber(0, numbers.length)];
const getColor = icon =>
  icon === "fa-clover" || icon === "fa-spa" ? "black" : "red";

// ----- GETTING CARD INFO ---------

const createGeneratedCard = inputValue => {
  cards = [];
  for (let i = 0; i < inputValue; i++) {
    const icon = getIcon();
    const color = getColor(icon);
    const number = getNumberOrLetter();

    cards.push({ icon, color, number });
  }
  showCards(cards, "card-container"); // SHOW RANDOM CARDS
};

// ----- PUT IN AN HTML TEMPLATE ---------

const getCardsHTML = (icon, color, number) => `
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

// ----- SHOW CARD ---------

let cardHTML = "";

const showCards = (array, container) => {
  if (container === "card-container") cardHTML = "";
  for (let i = 0; i < array.length; i++) {
    const { icon, color, number } = array[i];

    // CHECK IF THE NUMBER IS EQUAL TO A LETTER
    for (let letter in letters) {
      if (number == letters[letter]) number = letter;
    }

    // GET HTML OF THE CARD
    cardHTML += getCardsHTML(icon, color, number);
  }
  let cardContainer = document.querySelector(`.${container}`);
  cardContainer.innerHTML = "";
  cardContainer.innerHTML = cardHTML;
};

// ----- ORDER CARTS ---------

const orderCards = () => {
  cardHTML = "";

  let array = cards.slice();
  let wall = 0;
  while (wall < array.length) {
    for (let i = wall + 1; i < array.length; i++) {
      const left = array[wall];
      const right = array[i];
      if (left.number > right.number) {
        array[wall] = right;
        array[i] = left;
      }
    }
    cardHTML += `<p class="order-iterations">${wall + 1}</p>`;
    showCards(array, "order-container"); // SHOW ORDER CARDS
    wall++;
  }
};

// ----- ADD EVENTS ---------

document.getElementById("draw").addEventListener("click", () => {
  document.querySelector(".order-container").innerHTML = ""; // CLEAN ORDER CONTAINER
  const inputValue = Number(document.getElementById("amountOfCards").value); // INPUT AMOUNT OF CARDS
  createGeneratedCard(inputValue); // CREATE CARDS
  modifyGridSystem(inputValue); // CREATE COLUMNS
});

document.getElementById("sort").addEventListener("click", () => {
  orderCards(); // ORDER CARDS
});
