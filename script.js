const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word");
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard");

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/Hangman-box.${wrongGuessCount}-cut.png`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

for (let i = 97; i <= 122; i++) {
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, e.target.innerText));
}

// Añadir botones adicionales
const extraLetters = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'];
extraLetters.forEach(letter => {
    let button = document.createElement("button");
    button.innerText = letter;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, e.target.innerText));
});

getRandomWord();