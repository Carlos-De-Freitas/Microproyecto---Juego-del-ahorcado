const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word");
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-over-screen");
const playAgain = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/Hangman-box.${wrongGuessCount}-cut.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'duck-supreme-victory' : 'duck-its-over'}.jpg`;
        gameModal.querySelector("h4").innerText = `${isVictory ? '¡Felicidades!' : 'Más suerte la próxima'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    }, 300)
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
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

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

const createButton = (letter) => {
    let button = document.createElement("button");
    button.innerText = letter;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, letter));
}

// Añadir botones para letras del alfabeto
for (let i = 97; i <= 122; i++) {
    createButton(String.fromCharCode(i));
}

// Añadir botones adicionales
const extraLetters = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'];
extraLetters.forEach(letter => createButton(letter));


document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    if ((keyPressed >= 'a' && keyPressed <= 'z') || extraLetters.includes(keyPressed)) {
        const button = Array.from(keyboardDiv.querySelectorAll('button')).find(btn => btn.innerText === keyPressed);
        if (button && !button.disabled) {
            initGame(button, keyPressed);
        }
    }
});

getRandomWord();
playAgain.addEventListener("click", getRandomWord)