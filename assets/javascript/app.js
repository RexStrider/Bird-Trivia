console.log("Welcome to the game of Questions and Answers!");

let game = {
    qIndex: 0,

    aRight: 0,
    aWrong: 0,

    questions: ["What is the average air speed velocity of a European unladen swallow?",
                "What type of bird is a Gadwall?"],
    answers:   ["11 meters per second",
                "duck"],
    choices:   [["9 meters per second", "11 meters per second", "13 meters per second", "15 meters per second"],
                ["gull", "falcon", "goose", "duck"]],

    nextQuestion: function() { this.qIndex++; },
    answeredRight: function() { this.aRight++; },
    answeredWrong: function() { this.aWrong++; }
}

let startSection = document.getElementById("start");
let startButton = document.createElement("button");

startButton.textContent = "Start";

// console.log(startButton);
// console.log(startSection);

startButton.addEventListener("click", startGame);

startSection.append(startButton);

function startGame() {

    // start the timer
    let seconds = 10;
    // console.log("starting timer with " + seconds + " seconds")
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

    // console.log(choices);

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

    // console.log(timeAry);

    // length will change when popping values from the array,
    //   so lets store the length value first
    let length = timeAry.length;
    
    for (i=0; i<length; i++) {
        let t = timeAry.pop();
        // console.log(t);

        if (t > 0) {
            setTimeout(function() {
                let timeSection = document.getElementById("time");
    
                timeSection.innerHTML = "<h2>Time Remaining: " + t + " left</h2>";
    
            }, ((t - seconds) * -1) * 1000);
        }
        else {
            setTimeout(function() {
                let timeSection = document.getElementById("time");
                let questionSection = document.getElementById("question");
                let answersSection = document.getElementById("answers");
    
                timeSection.innerHTML = "<h2>Times up!</h2>";
                questionSection.innerHTML = "";
                answersSection.innerHTML = "<p>The answer was: " + game.answers[game.qIndex] + "</p>";
                game.answeredWrong();
    
            }, ((t - seconds) * -1) * 1000);
        }   
    }
}

function clickOnAnswer() {
    // console.log(this);

    let answer = this.getAttribute("data-value");
    // console.log(answer);

    // console.log(game.choices[game.qIndex][answer]);
    // console.log(game.answers[game.qIndex]);

    if (game.choices[game.qIndex][answer] === game.answers[game.qIndex]) {
        game.answeredRight();
        console.log("answered Right: " + game.aRight);
    }
    else {
        game.answeredWrong();
        console.log("answered Wrong: " + game.aWrong);
    }
}