var contentArea = document.getElementsByClassName('content')[0];
var messageArea = document.getElementsByClassName('message')[0];
var timerArea = document.getElementsByClassName('timer')[0];
var currentTime = 75;
var timer;

var questions = [
    {
        question: 'Commonly used data types does NOT include?',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 'alerts'
    },
    {
        question: 'The condition in an if / else statment is enclosed with _?',
        answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: 'curly brackets'
    },
    {
        question: 'Arrays in JavaScript can be used to store _?',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 'all of the above'
    },
    {
        question: 'String values must be enclosed within _ when being assined variables?',
        answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswer: 'quotes'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is?',
        answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log'
    },
];

function createStartScreen() {
    contentArea.innerHTML = '';

    var contentContainer = document.createElement('div');
    contentContainer.classList = 'start-screen';

    var h1El = document.createElement('h1');
    h1El.textContent = 'Coding Quiz Challenge';
    contentContainer.appendChild(h1El);

    var pEl_1 = document.createElement('p');
    pEl_1.textContent = 'Try to answer the following code-related questions within the time limit.';
    var pEl_2 = document.createElement('p');
    pEl_2.textContent = 'Keep in mind that incorrect answers penelizes your score/time by ten seconds!';
    contentContainer.appendChild(pEl_1);
    contentContainer.appendChild(pEl_2);

    var btnEl = document.createElement('button');
    btnEl.textContent = 'Start Quiz';
    btnEl.addEventListener('click', function () {
        createQuestionScreen(0);

        timerArea.textContent = currentTime;

        timer = setInterval(() => {
            currentTime--;
            timerArea.textContent = currentTime;
            if (currentTime === 0) {
                clearInterval(timer);
                createEndScreen();
            }

        }, 1000);

    });
    contentContainer.appendChild(btnEl);

    contentArea.appendChild(contentContainer);

}

function createEndScreen() {
    contentArea.innerHTML = '';

    var contentContainer = document.createElement('div')
    contentContainer.classList = 'end-screen';

    var h3El = document.createElement('h3')
    h3El.textContent = 'All Done'
    contentContainer.appendChild(h3El)

    var pEl_1 = document.createElement('p');
    pEl_1.textContent = 'Your final score is ' + currentTime;

    var spanEl_2 = document.createElement('span');
    spanEl_2.textContent = 'enter initials:';

    var input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute('id', '');

    var btnEl = document.createElement('button');
    btnEl.textContent = 'Submit';
    btnEl.addEventListener('click', function () {
        var scores;
        if (localStorage.highscores) {
            scores = JSON.parse(localStorage.highscores);
        }
        else {
            scores = [];
        }

        scores.push({ name: input.value, score: currentTime });

        localStorage.setItem("highscores", JSON.stringify(scores));

        createScoreboardScreen();
    });

    contentContainer.appendChild(pEl_1);
    contentContainer.appendChild(spanEl_2);
    contentContainer.appendChild(input);
    contentContainer.appendChild(btnEl);

    contentArea.appendChild(contentContainer);
}

function createQuestionScreen(questionIndex) {
    contentArea.innerHTML = '';

    var contentContainer = document.createElement('div');
    contentContainer.classList = 'question-screen';

    var h1El = document.createElement('h1');
    h1El.textContent = questions[questionIndex].question;
    contentContainer.appendChild(h1El);

    var ulEl = document.createElement('ul');

    var answers = questions[questionIndex].answers;
    for (var i = 0; i < answers.length; i++) {
        var liEl = document.createElement('li');
        var btnEl = document.createElement('button');
        btnEl.textContent = (i + 1) + ". " + answers[i];
        btnEl.dataset.answer = answers[i];
        btnEl.addEventListener('click', function (event) {
            if (event.target.dataset.answer === questions[questionIndex].correctAnswer) {
                var h2El = document.createElement('h2');
                h2El.textContent = "Correct!";
                messageArea.appendChild(h2El);
                setTimeout(function () {
                    h2El.remove();
                }, 3000);
            }
            else {
                currentTime = currentTime - 10;
                timerArea.textContent = currentTime;
                var h2El = document.createElement('h2');
                h2El.textContent = "Wrong!";
                messageArea.appendChild(h2El);
                setTimeout(function () {
                    h2El.remove();
                }, 1000);
            }

            if (questionIndex === (questions.length - 1)) {
                clearInterval(timer);
                createEndScreen();
            }
            else {
                createQuestionScreen(questionIndex + 1);
            }
        });
        liEl.appendChild(btnEl);
        ulEl.appendChild(liEl);
    }

    var divEl = document.createElement('div');


    contentContainer.appendChild(ulEl);

    contentArea.appendChild(contentContainer);
}

function createScoreboardScreen() {
    contentArea.innerHTML = '';

    var contentContainer = document.createElement('div');
    contentContainer.classList = 'Scoreboard';

    var h4El = document.createElement('h4');
    h4El.textContent = 'High scores';

    var olEl = document.createElement('ol');
    olEl.classList = 'Scores';

    var scores;
    if (localStorage.highscores) {
        scores = JSON.parse(localStorage.highscores);
    }
    else {
        scores = [];
    }

    for (var i = 0; i < scores.length; i++) {
        var liEl = document.createElement('li');
        liEl.classList = 'Score';
        liEl.textContent = scores[i].name + " - " + scores[i].score;

        olEl.appendChild(liEl);
    }

    var btnEl_1 = document.createElement('button');
    btnEl_1.textContent = 'Go back';
    btnEl_1.addEventListener('click', function () {
        currentTime = 75;
        createStartScreen();


    });

    var btnEl_2 = document.createElement('button');
    btnEl_2.textContent = 'Clear high scores';
    btnEl_2.addEventListener('click', function () {
        localStorage.setItem('highscores', '[]')
    });

    contentContainer.appendChild(h4El);
    contentContainer.appendChild(olEl);
    contentContainer.appendChild(btnEl_1);
    contentContainer.appendChild(btnEl_2);

    contentArea.appendChild(contentContainer);






}


createStartScreen();