import { quizData } from "./data.js";

let start = document.getElementById("str");
let question = document.getElementById("question");
let option = document.getElementById("options");
let button = document.getElementById("btn");
let box = document.getElementById("quiz")
button.style.display = "none";
let score = 0;
let selectedAnswers = []; // Array to store selected options
let quesNo = 0;

start.addEventListener("click", quiz);

export function quiz() {
  // Clear previous content
  start.style.display = "none"
  question.innerHTML = "";
  option.innerHTML = "";
  box.style.border = "1px solid black"
  // Display question
  question.innerHTML = quizData[quesNo]["question"];

  // Create options dynamically
  let char = "a".charCodeAt();
  for (let i = 0; i < Object.keys(quizData[quesNo]).length - 2; i++) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "option");
    input.setAttribute("value", [String.fromCharCode(char)]);

    let label = document.createElement("label");
    label.innerHTML = quizData[quesNo][String.fromCharCode(char)] + "<br>";

    option.appendChild(input);
    option.appendChild(label);
    char++;
  }

  button.style.display = "inline";
  button.innerHTML = quesNo === quizData.length - 1 ? "Submit" : "Next";

  // Remove previous event listener before adding a new one
  button.replaceWith(button.cloneNode(true));

  button = document.getElementById("btn");

  button.addEventListener("click", () => {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
      selectedAnswers.push(selected.value); // Store selected answer
    } else {
      selectedAnswers.push(null); // Store null if no option is selected
    }

    if (quesNo < quizData.length - 1) {
      quesNo++;
      quiz();
    } else {
      assesment();
    }
  });
}

function assesment() {
  box.style.display = "none"
  for (let i = 0; i < quizData.length; i++){
    if (selectedAnswers[i] == quizData[i]["correct"]) {
      score++;
    }
  }
  console.log(score)
  console.log("Selected Answers:", selectedAnswers);
  alert("Quiz completed!");
  document.getElementById("score").innerHTML = `Your Score ${score} / ${quizData.length}`;
}
