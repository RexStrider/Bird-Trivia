console.log("Welcome to the game of Questions and Answers!");

// tracks the state of the trivia game 
let game = {
    // index of the current trivia question
    qIndex: 0,

    // number of right or wrong answers
    aRight: 0,
    aWrong: 0,

    // trivia question
    questions: ["What is the average air speed velocity of a European unladen swallow?",
                "What type of bird is a Gadwall?"],
    // trivia answers
    answers:   ["11 meters per second",
                "duck"],
    // trivia answer choices
    choices:   [["9 meters per second", "11 meters per second", "13 meters per second", "15 meters per second"],
                ["gull", "falcon", "goose", "duck"]],
    
    // tracks the time out intervals used to move from game state to next game state
    timeOutTracker: [],

    // functions for changing the state of the game
    nextQuestion: function() { this.qIndex++; },
    answeredRight: function() { this.aRight++; },
    answeredWrong: function() { this.aWrong++; }
}

// create and append a game start button to the initial web page
let startSection = document.getElementById("start");
let startButton = document.createElement("button");
startButton.textContent = "Start";
startButton.addEventListener("click", startGame);
startSection.append(startButton);

function startGame() {
    startSection.innerHTML = "";

    // start the timer
    let seconds = 10;

    startTimer(seconds);
    
    let questionSection = document.getElementById("question");
    questionSection.innerHTML = "<h2>" + game.questions[game.qIndex] + "</h2>";

    // print answers to console
    let answersSection = document.getElementById("answers");

    let list = document.createElement("ul");

    let choices = [];
    for (i=0; i < game.choices[game.qIndex].length; i++) {
        choices.push(document.createElement("li"));
        choices[i].setAttribute("data-value", i);
    }

    for(i in game.choices[game.qIndex]) {
        choices[i].innerHTML = game.choices[game.qIndex][i];
        list.append(choices[i]);

        choices[i].addEventListener("click", clickOnAnswer);
    }

    answersSection.append(list);
}

function startTimer(seconds) {

    let timeAry = [];
    for (i=0; i<=seconds; i++) {
        timeAry.push(i);
    }

    // length will change when popping values from the array,
    //   so lets store the length value first
    let length = timeAry.length;
    
    for (i=0; i<length; i++) {

        let t = timeAry.pop();

        if (t > 0) {
            game.timeOutTracker.push(
                setTimeout(function() {
                let timeSection = document.getElementById("time");
    
                timeSection.innerHTML = "<h2>Time Remaining: " + t + " left</h2>";
    
            }, ((t - seconds) * -1) * 1000));
        }
        else {
            game.timeOutTracker.push(
                setTimeout(function() {
                let timeSection = document.getElementById("time");
                let questionSection = document.getElementById("question");
                let answersSection = document.getElementById("answers");
    
                timeSection.innerHTML = "<h2>Times up!</h2>";
                questionSection.innerHTML = "";
                answersSection.innerHTML = "<p>The answer was: " + game.answers[game.qIndex] + "</p>";
                game.answeredWrong();
    
            }, ((t - seconds) * -1) * 1000));
        }   
    }
}

function clickOnAnswer() {

    for (i in game.timeOutTracker) {
        clearTimeout(game.timeOutTracker[i]);
    }

    let answer = this.getAttribute("data-value");

    if (game.choices[game.qIndex][answer] === game.answers[game.qIndex]) {
        game.answeredRight();
        console.log("answered Right: " + game.aRight);
        let questionSection = document.getElementById("question");
        let answersSection = document.getElementById("answers");

        questionSection.innerHTML = "<h2>Congratulations, your answer was correct!</h2>";
        answersSection.innerHTML = "";
    }
    else {
        game.answeredWrong();
        console.log("answered Wrong: " + game.aWrong);
        let questionSection = document.getElementById("question");
        let answersSection = document.getElementById("answers");

        questionSection.innerHTML = "<h2>Wrong!</h2>";
        answersSection.innerHTML = "<p>The answer was " + game.answers[game.qIndex] + "</p>";
    }

    // get next question
    game.nextQuestion();
    // update web page
    // start new timer
    // may need to cear timeout interval?
    game.timeOutTracker[0] = setTimeout(startGame, 6 * 1000);
}