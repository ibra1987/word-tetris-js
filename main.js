import "./style.css";
import loadWord from "./loadWord";
import checkInputResult from "./checkInputResult";

document.querySelector("#app").innerHTML = `
  <div class="container">
   <div class="playground">
   <div id="currentWord" class="wordDiv"></div>
   <div id="score"></div>
   </div>
   <input id="textInput" type="text" class="inputText"/>
  </div>
`;

document.addEventListener("DOMContentLoaded", async () => {
  const currentWord = document.querySelector("#currentWord");
  const textInput = document.querySelector("#textInput");
  const wordContainer = document.querySelector("#currentWord");
  const scoreDiv = document.querySelector("#score");
  let lettersObject = {};
  let userScore = 0;

  await gameLoop();

  async function gameLoop() {
    let word = "";
    if (userScore > 0) {
      scoreDiv.innerHTML = userScore;
    }

    if (!word.length > 0) {
      word = await loadWord(4);
    }

    let letters = word && word.length > 0 && [...word];

    if (letters && letters.length > 0) {
      //construct  a letter object to keep track of letters and their indexes
      for (let i = 0; i < letters.length; i++) {
        if (lettersObject[letters[i]]) {
          lettersObject[letters[i]] = [...lettersObject[letters[i]], i];
        } else {
          lettersObject[letters[i]] = [i];
        }
      }
      //
      letters.map((letter, index) => {
        const letterSpan = document.createElement("span");
        letterSpan.className = "letterSpan";
        letterSpan.id = index;
        letterSpan.innerHTML = letter;
        wordContainer.appendChild(letterSpan);
      });
    }

    //create an object from letters with a letter as a key and index as value in order to compare it against user input later

    textInput?.addEventListener("input", async (e) => {
      if (!e.target.value > 0) {
        const alreadyFound = document.getElementsByClassName("charFound");
        [...alreadyFound].forEach((item) => item.classList.remove("charFound"));
        return;
      }
      let { matches } = checkInputResult(e.target.value, lettersObject);
      matches?.map((match) => {
        document.getElementById(match).classList.add("charFound");
      });
      if (e.target.value === word) {
        currentWord.innerHTML = "";
        userScore += 1;
        e.target.value = "";
        letters = [];
        word = "";
        lettersObject = {};
        window.requestAnimationFrame(gameLoop);
      }

      // if (e.target.value.length !== word.length) {
      //   [...document.getElementsByClassName("charFound")].forEach((el) => {
      //     el.classList.remove("charFound");
      //   });
      // }
    });
  }
});
