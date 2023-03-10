//declaration area
let letters = "abcdefghijklmnopqrstuvwxyz";
let keys = document.querySelector(".keys");
let gussed = document.querySelector(".letter-gussed");
let wordFrom = document.querySelector(".word");

let letterArray = [...letters]; //destructing the string into array of letters
//end declaration area

letterArray.forEach((letter) => {
  let span = document.createElement("span");
  span.textContent = letter.toUpperCase();
  span.classList.add("letter");
  keys.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

//declaration area
let keyNames = Object.keys(words); // getting key names from the object
let keyIndex = Math.floor(Math.random() * keyNames.length); //generating random index
let randomCategory = keyNames[keyIndex];

wordFrom.textContent = randomCategory;

let randomWordArray = words[randomCategory];

let randomWordIndex = Math.floor(Math.random() * randomWordArray.length);

let randomWord = randomWordArray[randomWordIndex];

console.log(randomWord);
//end declaration area

[...randomWord].forEach((ele) => {
  //creating the space to write on based on the length of the word
  let span = document.createElement("span");
  if (ele !== " ") {
    span.classList.add("space");
  } else {
    span.classList.add("with-space");
  }
  gussed.appendChild(span);
});
//  declaration area
let paintParts = document.querySelectorAll(".full-paint div");
let spaces = document.querySelectorAll(".space");

let failedAttempts = 0;
let sucessAttempts = 0;
let won = false;
let wordWithoutSpace = [...randomWord].filter((ele) => {
  return ele != " ";
});

import popUp from "./popUp.js"; // importing the popUp module

let success = document.getElementById("success");
let fail = document.getElementById("fail");
//end declaration area

//sound playing using howler
function playSound(state) {
  let sound = new Howl({
    src: state ? ["./sounds/success.mp3"] : ["./sounds/fail.mp3"],
  });
  sound.play();
}

keys.addEventListener("click", (e) => {
  let state = false;
  if (e.target.classList.contains("letter")) {
    e.target.style.backgroundColor = "#ccc";
    e.target.style.pointerEvents = "none";

    wordWithoutSpace.forEach((element, index) => {
      // if the letter is correct
      if (element.toLowerCase() == e.target.textContent.toLowerCase()) {
        state = true;
        playSound(state);
        spaces[index].textContent = e.target.textContent.toLowerCase();
        sucessAttempts++;
        if (sucessAttempts == wordWithoutSpace.length) {
          won = true;
          popUp(won);
        }
      }
    });

    if (state == false) {
      playSound(state);
      paintParts[failedAttempts].style.display = "block";
      failedAttempts++;
      console.log(failedAttempts);

      if (failedAttempts == 6) {
        popUp(won);
      }
    }
  }
});
