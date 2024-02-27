const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      {text: "Chennai", correct: false},
      {text: "Hyderabad", correct: false},
      {text: "New Delhi", correct: true},
      {text: "kerala", correct: false},
    ]
  },
  {
    question: "What is the National animal of India?",
    answers: [
      {text: "Peacock", correct: false},
      {text: "Tiger", correct: true},
      {text: "Lion", correct: false},
      {text: "Elephant", correct: false},
    ]
  },
  {
    question: "What is the National bird of India?",
    answers: [
      {text: "Peacock", correct: true},
      {text: "Dove", correct: false},
      {text: "Finches", correct: false},
      {text: "Parrot", correct: false},
    ]
  },
  {
    question: "What is the National tree of India?",
    answers: [
      {text: "Mango Tree", correct: false},
      {text: "Neem Tree", correct: false},
      {text: "papaya Tree", correct: false},
      {text: "Banyan Tree", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    
  });
}

function resetState(){
  nextButton.style.display = "none"
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else {
    selectedBtn.classList.add("Incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=> {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else {
    startQuiz();
  }
});
startQuiz();




