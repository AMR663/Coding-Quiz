var contentArea = document.getElementsByClassName('content')[0];

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
    });
    contentContainer.appendChild(btnEl);

    contentArea.appendChild(contentContainer);


}

function createEndScreen() {
    contentArea.innerHTML = '';

    var contentContainer = document.createElement('div')
    contentContainer.classlist = 'start,screen';

    var h3El = document.createElement('h3')
    h3El.textContent = 'All Done'
    contentContainer.appendChild(h3El)

    var pEl_1 = document.createElement('p');
    pEl_1.textContent = 'Your final score is _';
    var pEl_2 = document.createElement('p');
    pEl_2.textContent = 'enter initials';
    contentContainer.appendChild(pEl_1);
    contentContainer.appendChild(pEl_2);

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
            if (questionIndex === (questions.length - 1)) {
                createEndScreen();
            }

            else {
                if (event.target.dataset.answer === questions[questionIndex].correctAnswer) {
                    createQuestionScreen(questionIndex + 1);
                }
                else {
                    var h2El = document.createElement('h2');
                    h2El.textContent = "Wrong!";
                    contentContainer.appendChild(h2El);
                    setTimeout(function () {
                        h2El.remove();
                    }, 3000);
                }
            }
        });
        liEl.appendChild(btnEl);
        ulEl.appendChild(liEl);
    }

    var divEl = document.createElement('div');


    contentContainer.appendChild(ulEl);

    contentArea.appendChild(contentContainer);
}


createStartScreen();