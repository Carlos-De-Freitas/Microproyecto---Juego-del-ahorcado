const wordDisplay = document.querySelector(".word");
const keyboardDiv = document.querySelector(".keyboard");

let currentWord;

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        console.log(clickedLetter, "existe en la palabra")
    } else {
        console.log(clickedLetter, "no existe en la palabra")
    }
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