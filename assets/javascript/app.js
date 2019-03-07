console.log("Welcome to the game of Questions and Answers!");

// tracks the state of the trivia game 
let game = {
    // index of the current trivia question
    qIndex: 0,

    // number of right or wrong answers
    aRight: 0,
    aWrong: 0,

    // game.seconds per question
    seconds: 30,

    // delay in game.seconds after answering a question
    delay: 6,

    // trivia question
    questions: ["What is the average air speed velocity of a European unladen swallow?",
                "What type of bird is a Gadwall?",
                "How many species of humming birds exist?",
                "The California Thrasher was named after which of the following?",
                "A Killdeer may perform which of the following behavior?"],
    // trivia answers
    answers:   ["11 meters per second",
                "duck",
                "about 330",
                "a mix between the words thrush and threshing grain",
                "luring away predators from their young with a broken wing display"],
    // trivia answer choices
    choices:   [["8 meters per second", "11 meters per second", "14 meters per second", "19 meters per second"],
                ["gull", "falcon", "goose", "duck"],
                ["about 110", "about 220", "about 330", "about 440"],
                ["a mix between the words thrush and threshing grain", "the birds agressive behavior", "the skateboard magazine 'Thrasher'", "the ornithologist, William T. Thrasher"],
                ["swooping down at predators that get too close to its young", "imitating the sounds of other birds", "luring away predators from their young with a broken wing display", "screeching loudly and performing acrobatic loops in the air at sunrise"]],
    
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

startButton.textContent = "press start to play";
startButton.addEventListener("click", initTriviaQuest);
startSection.append(startButton);

// displays the trivia questions and starts the timers
function initTriviaQuest() {
    startSection.innerHTML = "";
    let questionSection = document.getElementById("question");
    let answersSection = document.getElementById("answers");

    // If the question index is less than the number of questions, we move on to the next question
    if (game.qIndex < game.questions.length) {

        // sets up the timer for the question
        startTimer(game.seconds);
        
        // displays the question to the main web page
        questionSection.innerHTML = "<h2>" + game.questions[game.qIndex] + "</h2>";

        // creating a list to append our possible answers to
        let list = document.createElement("ul");

        // creates a list and assigns the index relating to the relevant game choice
        let choices = [];
        for (i=0; i < game.choices[game.qIndex].length; i++) {
            choices.push(document.createElement("li"));

            // tracks which choice relates to the choices given by the game object
            choices[i].setAttribute("data-index", i);
        }

        // assigns the possible answer to the appropriate choice
        for(i in game.choices[game.qIndex]) {

            // gets the choice at i from the question at qIndex and assigns it to the appropriate list element
            choices[i].innerHTML = game.choices[game.qIndex][i];

            // appends the list element to the unordered list
            list.append(choices[i]);

            // adding event listener to determine which choice the user clicks on
            choices[i].addEventListener("click", clickOnAnswer);
        }

        //remove the previous answer from the web page
        answersSection.innerHTML="";

        // displays the list of choices to the main web page
        answersSection.append(list);
    }

    // Otherwise we are at the end of the game
    else {
        let timeSection = document.getElementById("time");

        // removes the text stating how much time was left for the previously asked qeustion
        timeSection.innerHTML = "";

        // Game Over text is displayed on the main web page with the users statistics
        questionSection.innerHTML = "<h2>Game Over!</h2>";
        answersSection.innerHTML = "<p>You answered " + game.aRight + " questions correctly</p>"
                                 + "<p>You answered " + game.aWrong + " questions incorrectly</p>";
    }
}

// sets the timers for the Trivia questions based on the game state
function startTimer() {

    // stores multiple values for each timer
    let timeAry = [];
    for (i=0; i<=game.seconds; i++) {
        timeAry.push(i);
    }

    // time array will continue to reduce in size while we create more timers    
    while (timeAry.length > 0) {

        // popping reduces the length of the time array
        let t = timeAry.pop();

        // All but the last timer should display the time remaining
        if (t > 0) {
            game.timeOutTracker.push(
                setTimeout(function() {
                let timeSection = document.getElementById("time");
    
                timeSection.innerHTML = "<p>Time Remaining: " + t + " left</p>";
    
            }, ((t - game.seconds) * -1) * 1000));
        }
        
        // final timer displayes the answer and states times up
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
    
                game.nextQuestion();
                game.timeOutTracker[0] = setTimeout(initTriviaQuest, game.delay * 1000);

            }, ((t - game.seconds) * -1) * 1000));
        }   
    }
}

function clickOnAnswer() {

    for (i in game.timeOutTracker) {
        clearTimeout(game.timeOutTracker[i]);
    }

    let answer = this.getAttribute("data-index");

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

    game.nextQuestion();
    game.timeOutTracker[0] = setTimeout(initTriviaQuest, game.delay * 1000);
}