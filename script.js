// Variables globales para elementos del DOM y datos del juego
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word");
const guessesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-over-screen");
const playAgain = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount, score = 0;
const maxGuesses = 6;

// Reinicia el juego, reestableciendo las variables y elementos del DOM
const resetGame = (isGameOver = false) => {
    if (isGameOver && wrongGuessCount === maxGuesses) {
        score = 0; // Si el juego termina por llegar al máximo de intentos fallidos, el puntaje se reinicia a cero
    }
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/Hangman-box.${wrongGuessCount}-cut.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
    updateScore(); // Actualiza el puntaje mostrado en la interfaz
}

// Obtiene una palabra aleatoria del array de palabras y muestra su pista
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint b").innerText = hint;
    resetGame(false); // Reinicia el juego sin terminarlo por completo
}

// Maneja el evento de fin de juego (victoria o derrota)
const gameOver = (isVictory) => {
    if (!isVictory) {
        score = 0; // Restablece el puntaje a cero si el jugador pierde
    } else {
        score += 100; // Incrementa el puntaje en 100 si el jugador gana
    }
    setTimeout(() => {
        // Configura y muestra la pantalla de Game Over con la imagen correspondiente y el mensaje adecuado
        const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'duck-supreme-victory' : 'duck-its-over'}.jpg`;
        gameModal.querySelector("h4").innerText = `${isVictory ? '¡Felicidades!' : 'Más suerte la próxima'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        const scoreText = isVictory ? `Tu puntaje es: ${score}` : `Perdiste todos tus puntos. Puntaje: 0`;
        gameModal.querySelector("p").innerHTML += `<br><b id="game-over-score">${scoreText}</b>`;
        gameModal.classList.add("show");

        // Deshabilita todos los botones de letras para evitar más interacciones durante la pantalla de Game Over
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
    }, 1000)
}

// Inicializa el juego cuando se hace clic en un botón de letra
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        // Si la letra está en la palabra, la muestra en la interfaz
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        // Si la letra no está en la palabra, incrementa el contador de intentos fallidos
        wrongGuessCount++;
        hangmanImage.src = `images/Hangman-box.${wrongGuessCount}-cut.png`;
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        if(wrongGuessCount === maxGuesses) {
            // Bloquear todos los botones de letras cuando se alcanza el límite de intentos fallidos
            keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
            return gameOver(false); // Si alcanza el límite de intentos fallidos, termina el juego
        }
    }
    button.disabled = true;
    if(correctLetters.length === currentWord.length) return gameOver(true); // Si se adivinan todas las letras, termina el juego
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

// Actualiza el puntaje mostrado en la interfaz
const updateScore = () => {
    const scoreTextElement = document.querySelector(".score-text b");
    if (scoreTextElement) {
        scoreTextElement.innerText = score;
    } else {
        const scoreText = document.createElement("h4");
        scoreText.classList.add("score-text");
        scoreText.innerHTML = `Puntaje: <b>${score}</b>`;
        document.querySelector(".game-box").prepend(scoreText);
    }
};

// Maneja el evento de pulsación de tecla
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    if ((keyPressed >= 'a' && keyPressed <= 'z') || extraLetters.includes(keyPressed)) {
        const button = Array.from(keyboardDiv.querySelectorAll('button')).find(btn => btn.innerText === keyPressed);
        if (button && !button.disabled) {
            initGame(button, keyPressed);
        }
    }
});

// Actualiza el puntaje, obtiene una nueva palabra y reinicia el juego cuando se hace clic en "Jugar de nuevo"
updateScore();
getRandomWord();
playAgain.addEventListener("click", () => {
    getRandomWord();
    resetGame(false);
});