// Declaring Variables
var startButton = document.querySelector("#start-game-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");
var timerEl = document.querySelector("#timer");
var question = document.querySelector("#question");
var answerEl1 = document.querySelector("#answer1");
var answerEl2 = document.querySelector("#answer2");
var answerEl3 = document.querySelector("#answer3");
var answerEl4 = document.querySelector("#answer4");

// var timeLeft = "";
// var score = 0;
// var i = 0;

// Questions are declared in global scope
var questionArr = [
    {
        question : "What is the capital of UK?",
        choices : ["Scotland", "London", "Istanbul", "The Moon"],
        answer : "London",
    },
    {
        question: "Who framed Roger Rabbit?",
        choices: ["Donald Trump", "Daffy Duck", "Doom", "A tree"],
        answer: "Doom",
      },
      {
        question: "What time is it?",
        choices: ["Now", "Later", "Before", "Never"],
        answer: "Now",
      },
      {
        question: "Best football player?",
        choices: ["Maradona", "Pele", "Zidane", "Goater"],
        answer: "Goater",
      }
]

// Page is loaded
    // High scores element is shown on page
        // High scores are retrieved from local storage
    // Start game button is shown
function init () {
document.querySelector(".question-card").style.display = "none";
document.querySelector(".end-card").style.display = "none";
}

init();

// Button click starts quiz
    // High scores element is hidden*
    // Score is set to zero*
    // Timer resets to 60 seconds and starts counting down*
            // Timer function checks if =0 every second
                // If timer =0 quiz ends. gemeOver function is called
        // Timer element is shown on page*
    // Question element is shown with question and answers displayed

startButton.addEventListener("click", startGame);

function startGame () {
    document.querySelector(".start-card").style.display = "none";
    document.querySelector(".question-card").style.display = "inherit";
    startTimer();
    renderQuestions(0); 
    score = 0;
    timeLeft = 60;
    i = 0;     
}

function startTimer () {
    // Sets timer    
    timeLeft = "60";
    timer = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft;
        // Tests if time has run out
    if (timeLeft <= 0) {
        // Clears interval
        gameOver();
      }
    }, 1000);
}

function renderQuestions (i) {
    // Renders questions and answers
    question.textContent = questionArr[i].question;
    answerEl1.textContent = questionArr[i].choices[0];
    answerEl2.textContent = questionArr[i].choices[1];
    answerEl3.textContent = questionArr[i].choices[2];
    answerEl4.textContent = questionArr[i].choices[3];  
}

// Runs checkAnswer function on each answer when clicked
answerEl1.addEventListener("click", function() {
    checkAnswer(answerEl1);
});
answerEl2.addEventListener("click", function() {
    checkAnswer(answerEl2);
});
answerEl3.addEventListener("click", function() {
    checkAnswer(answerEl3);
});
answerEl4.addEventListener("click", function() {
    checkAnswer(answerEl4);
});

// Question answered
    // If incorrect, 10 seconds is subtracted from clock
    // Else. If correct, score is increased by 1
        // If all questions are answered, then end quiz. gameOver function is called.
    // Else. Next question appears

function checkAnswer(element) {
    correct = questionArr[i].answer;
    console.log(correct);    
    if (element.textContent === correct) {
        score ++;
        console.log(score);
    } else {
        // decrease 10 seconds of time
        timeLeft = timeLeft -10;
        if (timeLeft <= 0) {
            gameOver();
        }
    }
    i ++;
    if (i === questionArr.length) {
        gameOver();
    } else {
        renderQuestions(i);
    }  
}


// gameOver function
    // Question, timer, score sections are hidden
    // User initials input box is shown
        // on Button clock, Initials and score are saved to local storage
            // Resets back to initial page

function gameOver () {
    clearInterval(timer);
    document.querySelector(".question-card").style.display = "none";
    document.querySelector(".end-card").style.display = "inherit";

}