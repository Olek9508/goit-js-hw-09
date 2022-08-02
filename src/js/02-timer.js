import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonStartEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEls: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let numberify = null;
let timerId = null;
let diff = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    numberify = selectedDates[0].getTime();
    if (numberify < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.buttonStartEl.removeAttribute('disabled', 'disabled');
    }
  },
};

refs.buttonStartEl.addEventListener('click', () => {
  if (timerId > 0) {
    return;
  }
  timerId = setInterval(() => {
    diff = numberify - Date.now();
    const calculateTime = convertMs(diff);
    clockFace(calculateTime);
    console.log(diff);
  }, 1000);
});

flatpickr(refs.inputEl, options);

refs.buttonStartEl.setAttribute('disabled', 'disabled');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function clockFace({ days, hours, minutes, seconds }) {
  if (diff > 0) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEls.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
  } else {
    clearInterval(timerId);
  }
}
