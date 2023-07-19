const settingsBtn = document.getElementById('settings');
const inputs = document.querySelectorAll('input[type=number]');
const settings = document.querySelector('.settings__wrapper');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const cancelBtn = document.querySelector('.close-btn2');
const workDurationInput = document.querySelector('#work-duration');
const restDurationInput = document.querySelector('#rest-duration');

let workDuration = 25 * 60;
let restDuration = 5 * 60;
let currentStatus = 'work';
let currentTime = workDuration;
let interval = null;

let counter = document.querySelector('.timer-container__counter');
settingsBtn.addEventListener('click', () => {
    settings.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    settings.style.display = 'none';
});

Array.from(inputs).forEach(input => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('input', () => {
        const value = +input.value;
        if (value > max) { input.value = max }
        else if (value < min) { input.value = "" }
    })
});

function alarm() {
    const sound = new Audio(
        './alarm-clock-beep-1_zjgin-vd.mp3'
    );
    sound.play();
}

let updateTimer = (value) => {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    counter.innerHTML = minutes + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
};

let startTimer = () => {
    if (interval) {
        clearInterval(interval);
    }

    updateTimer(currentTime);
    interval = setInterval(() => {
        currentTime--;
        updateTimer(currentTime);
        if (currentTime <= 0) {
            alarm();
            clearInterval(interval);
            currentStatus = currentStatus == 'work' ? 'rest' : 'work';
            currentTime = currentStatus == 'work' ? workDuration : restDuration;
        }
    }, 1000);
};

startBtn.addEventListener('click', startTimer);

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});


saveBtn.addEventListener('click', () => {
    workDuration = workDurationInput.value * 60;
    restDuration = restDurationInput.value * 60;

    if (!interval) {
        if (currentStatus == 'work') {
            currentTime = workDuration;
        } else {
            currentTime = restDuration;
        }
        updateTimer(currentTime);
    }
    settings.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    workDurationInput.value = workDuration / 60;
    restDurationInput.value = restDuration / 60;

    if (!interval) {
        if (currentStatus == 'work') {
            currentTime = workDuration;
        } else {
            currentTime = restDuration;
        }
        updateTimer(currentTime);
    }
    settings.style.display = 'none';
});