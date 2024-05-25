const wordDisplay = document.querySelector(".word");
const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    document.querySelector(".hint b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

for (let i = 97; i <= 122; i++) {
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}

// Añadir botones adicionales
const extraLetters = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'];
extraLetters.forEach(letter => {
    let button = document.createElement("button");
    button.innerText = letter;
    keyboardDiv.appendChild(button);
});

getRandomWord();