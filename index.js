const displayerTimeLeft = document.querySelector('.display__time-left');
const displayerEndTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('#custom');



let countdown;

const displayTimeLeft = (e) => {
    let secLeft;

    if (!e.target.dataset.time) {
        e.preventDefault();
        secLeft = (e.target.querySelector('input').value) * 60;
    } else {
        secLeft = e.target.dataset.time;
    }

    const now = Date.now();
    const then = now + secLeft * 1000;

    displayerTimeLeft.innerHTML = toMinAndSec(secLeft);
    endTime(then);

    clearInterval(countdown);

    countdown = setInterval(() => {
        const secendsLeft = Math.round((then - Date.now())/1000);
        if (secendsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        document.title = toMinAndSec(secendsLeft);
        displayerTimeLeft.innerHTML = toMinAndSec(secendsLeft);
    },1000)
}

const toMinAndSec = sec => {
    const minutes = Math.floor(sec/60);
    const secends = sec % 60;
    const transformed = `${minutes}:${secends<10 ? '0' : ''}${secends}`;
    return transformed;
}

const endTime = timeStamp => {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const mins = end.getMinutes();
    displayerEndTime.textContent = `Come back at ${hour}:${mins<10 ? '0' : ''}${mins}`
}

buttons.forEach(button => button.addEventListener('click', displayTimeLeft));
form.addEventListener('submit', displayTimeLeft);