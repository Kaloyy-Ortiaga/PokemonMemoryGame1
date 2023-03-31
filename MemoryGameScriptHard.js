const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const difficulty = document.querySelector(".difficulty");

let cards;
let interval;
let firstCard = false;
let secondCard = false;
//Items array
const items = [
  { name: "Bayleef", image: "Pokemons/Grass/Bayleef.png" },
  { name: "Bellossom", image: "Pokemons/Grass/Bellossom.png" },
  { name: "Cacnea", image: "Pokemons/Grass/Cacnea.png" },
  { name: "Carnivine", image: "Pokemons/Grass/Carnivine.png" },
  { name: "Cherrim", image: "Pokemons/Grass/Cherrim.png" },
  { name: "CherrimSunny", image: "Pokemons/Grass/CherrimSunny.png" },
  { name: "Cherubi", image: "Pokemons/Grass/Cherubi.png" },
  { name: "Chespin", image: "Pokemons/Grass/Chespin.png" },
  { name: "Chikorita", image: "Pokemons/Grass/Chikorita.png" },
  { name: "Fomantis", image: "Pokemons/Grass/Fomantis.png" },
  { name: "Gogoat", image: "Pokemons/Grass/Gogoat.png" },
  { name: "Grotle", image: "Pokemons/Grass/Grotle.png" },
  { name: "Grovyle", image: "Pokemons/Grass/Grovyle.png" },
  { name: "Leafeon", image: "Pokemons/Grass/Leafeon.png" },
  { name: "Lilligant", image: "Pokemons/Grass/Lilligant.png" },
  { name: "Maractus", image: "Pokemons/Grass/Maractus.png" },
  { name: "Meganium", image: "Pokemons/Grass/Meganium.png" },
  { name: "Pansage", image: "Pokemons/Grass/Pansage.png" },
  { name: "Petilil", image: "Pokemons/Grass/Petilil.png" },
  { name: "Quilladin", image: "Pokemons/Grass/Quilladin.png" },  
  { name: "Sceptile", image: "Pokemons/Grass/Sceptile.png" },
  { name: "Seedot", image: "Pokemons/Grass/Seedot.png" },
  { name: "Serperior", image: "Pokemons/Grass/Serperior.png" },
  { name: "Servine", image: "Pokemons/Grass/Servine.png" },
  { name: "Shaymin", image: "Pokemons/Grass/Shaymin.png" },
  { name: "Shroomish", image: "Pokemons/Grass/Shroomish.png" },
  { name: "Simisage", image: "Pokemons/Grass/Simisage.png" },
  { name: "Skiddo", image: "Pokemons/Grass/Skiddo.png" },
  { name: "Snivy", image: "Pokemons/Grass/Snivy.png" },
  { name: "Sunflora", image: "Pokemons/Grass/Sunflora.png" },
  { name: "Sunkern", image: "Pokemons/Grass/Sunkern.png" },
  { name: "Tangela", image: "Pokemons/Grass/Tangela.png" },
  { name: "Tangrowth", image: "Pokemons/Grass/Tangrowth.png" },
  { name: "Treecko", image: "Pokemons/Grass/Treecko.png" },
  { name: "Turtwig", image: "Pokemons/Grass/Turtwig.png" },
];
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time Passed : </span>${minutesValue}:${secondsValue}`;
};
//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Move Count : </span>${movesCount}`;
};
//Pick random objects from the items array
const generateRandom = (size = 7) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
const matrixGenerator = (cardValues, size = 7) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
            if (movesCount == 50) {
                result.innerHTML = `<h2>You Lost</h2>
                <h4>Moves: ${movesCount}</h4>`;
                stopGame();
            }
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  difficulty.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Move Count : </span> ${movesCount}`;
  initializer();
});
//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    difficulty.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};