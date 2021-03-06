// Declaring Variables
var startButton = document.querySelector("#start-game-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");
var saveButton = document.querySelector("#save-btn");
var timerEl = document.querySelector("#timer");
var question = document.querySelector("#question");
var answerEl1 = document.querySelector("#answer1");
var answerEl2 = document.querySelector("#answer2");
var answerEl3 = document.querySelector("#answer3");
var answerEl4 = document.querySelector("#answer4");
var scoresList = document.querySelector("#high-scores");
var initialsEl = document.querySelector('#initials');


var timeLeft = "";
var score = 0;
var i = 0;

// Questions are declared in global scope
var questionArr = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Page is loaded
    // High scores element is shown on page*
        // High scores are retrieved from local storage*
    // Start game button is shown*
function init() {
    document.querySelector(".question-card").style.display = "none";
    document.querySelector(".end-card").style.display = "none";
    displayScores();
}

function displayScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];    
    
    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.name + " - " + score.score;

        var olEl = document.getElementById("high-scores");
        olEl.appendChild(liTag);
    });
}

function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
} 

clearScoresBtn.addEventListener("click", clearScores);

init ();

// Button click starts quiz
    // High scores element is hidden*
    // Score is set to zero*
    // Timer resets to 60 seconds and starts counting down*
            // Timer function checks if =0 every second*
                // If timer =0 quiz ends. gemeOver function is called*
        // Timer element is shown on page*
    // Question element is shown with question and answers displayed*

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
    question.textContent = questionArr[i].title;
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
    // If incorrect, 10 seconds is subtracted from clock*
    // Else. If correct, score is increased by 1*
        // If all questions are answered, then end quiz. gameOver function is called.*
    // Else. Next question appears*

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
    // Question, timer, score sections are hidden*
    // User initials input box is shown*
        // on Button clock, Initials and score are saved to local storage*
            // Resets back to initial page

function gameOver() {
    clearInterval(timer);
    document.querySelector(".question-card").style.display = "none";
    document.querySelector(".end-card").style.display = "inherit";
    document.querySelector("#score").textContent = score;
}

function saveScores() {
    var initials = initialsEl.value.trim();
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newscore = {
        name: initials,
        score: score
    };
    console.log(highscores);
    highscores.push(newscore);
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    var topScores = highscores.slice(0, 5);
    window.localStorage.setItem("highscores", JSON.stringify(topScores));

    window.location.reload();

}

saveButton.addEventListener("click", saveScores);


