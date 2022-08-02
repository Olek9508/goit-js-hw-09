function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const COLORCHANGE_DELAY = 1000;
let timeIntervalId = null;

const refs = {
  bodyColor: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

refs.buttonStart.addEventListener('click', onColorChangingStart);
refs.buttonStop.addEventListener('click', onColorChangingStop);

function onColorChangingStart() {
  refs.buttonStart.setAttribute('disabled', 'disabled');
  refs.buttonStop.removeAttribute('disabled', 'disabled');
  timeIntervalId = setInterval(() => {
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  }, COLORCHANGE_DELAY);
}

function onColorChangingStop() {
  refs.buttonStop.setAttribute('disabled', 'disabled');
  refs.buttonStart.removeAttribute('disabled', 'disabled');
  clearInterval(timeIntervalId);
}
