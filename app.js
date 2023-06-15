let lettersArr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ];

const buttonStart = document.getElementById('buttonStart');
const buttonRestart = document.getElementById('lose-window__button-restert');
const buttonWinStart = document.getElementById('win-window__button-start');
const buttonStartWrapper = document.querySelector('.buttonStart-wrapper');
const progressBar = document.getElementById('progressBar');
const progressBarWrapper = document.querySelector('.progress-bar-wrapper');
const loseWindow = document.querySelector('.lose-window__wrapper');
const winWindow = document.querySelector('.win-window__wrapper');
const lettersWrapper = document.getElementById('lettersWrapper');

let arrLetters = [];

function addLetters() {
      for (let i = 0; i < 10; i++) {
            let rand = Math.floor(Math.random() * lettersArr_en.length);
            arrLetters.push(lettersArr_en[rand]);
      }
      for (let i = 0; i < arrLetters.length; i++) {
            let wrapperLetterDiv = document.createElement('div')
            let letterDiv = document.createElement('p')
            letterDiv.innerText = arrLetters[i];
            wrapperLetterDiv.appendChild(letterDiv);
            lettersWrapper.appendChild(wrapperLetterDiv);
      }
};


buttonStart.addEventListener('click', (ev) => {
      document.addEventListener('keydown', keyEvent);
      progressBarWrapper.classList.remove('hidden-element');
      buttonStartWrapper.classList.add('hidden-element');
      addLetters();
      startTimer();
});

buttonRestart.addEventListener('click', (ev) => {
      document.addEventListener('keydown', keyEvent);
      loseWindow.classList.add('hidden-element');
      arrLetters = [];
      progressBar.value = 0;
      lettersWrapper.replaceChildren();
      addLetters();
      startTimer();
      correctAnswer = 0;
      wrongAnswer = 0;
});

buttonWinStart.addEventListener('click', (ev) => {
      document.addEventListener('keydown', keyEvent);
      winWindow.classList.add('hidden-element');
      arrLetters = [];
      progressBar.value = 0;
      lettersWrapper.replaceChildren();
      addLetters();
      startTimer();
});

let wrongAnswer = 0;
let correctAnswer = 0;

function keyEvent(e) {
      let letterBox = Array.from(lettersWrapper.children);
      const key = e.key.toLowerCase();
      const firstLatter = arrLetters.shift();
      if (key === firstLatter) {
            correctAnswer++;
            let letter = letterBox.find((item) => {
                  return item.innerText === firstLatter;
            });
            letter.classList.add('animation-right-letter');
            letter.firstChild.innerHTML = '';
            if (correctAnswer >= 10) { 
                  winWindow.style.visibility = 'visible';
                  winWindow.classList.remove('hidden-element');
                  stopTimer();
                  correctAnswer = 0;
                  document.removeEventListener('keydown', keyEvent);
            }
      } else {
            wrongAnswer++;
            let letter = letterBox.find((item) => {
                  return item.innerText === firstLatter
            });
            progressBar.value = wrongAnswer;
            letter.firstChild.innerHTML = '';
            letter.classList.add('animation-wrong-letter');
            if (wrongAnswer >= 1) {
                  loseWindow.style.visibility = 'visible';
                  loseWindow.classList.remove('hidden-element');
                  stopTimer();
                  document.removeEventListener('keydown', keyEvent);
            };
      };
}

let time = document.getElementById('time');
let sec = 0;
let min = 0;
let hrs = 0;
let timeID = null;


function tick(){
      sec++;
      if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                  min = 0;
                  hrs++;
            }
      }
      add()
};

function add() {
      time.textContent = (hrs > 9 ? hrs : "0" + hrs) 
            + ":" + (min > 9 ? min : "0" + min)
            + ":" + (sec > 9 ? sec : "0" + sec);
};

function stopTimer() {
      clearTimeout(timeID);
      
};

function startTimer() {
      timeID = setInterval(tick, 1000)
      sec = 0;
      min = 0;
      hrs = 0;
};