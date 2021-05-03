const buttons = document.querySelector('.btn-container');
const button = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

buttons.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    button.forEach((el) => {
      if (el.classList.contains('btn-active')) {
        el.classList.remove('btn-active');
      }
    });
    event.target.classList.add('btn-active');
  }

  if (event.target.classList.contains('btn-letters')) {
    pianoКeys.forEach((el) => {
      el.classList.add('letters');
    });
  }

  if (event.target.classList.contains('btn-notes')) {
    pianoКeys.forEach((el) => {
      el.classList.remove('letters');
    });
  }
});

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function pressedPlay() {
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
  pianoКeys.forEach((el) => {
    if (el.classList.contains("piano-key-active", "piano-key-active-pseudo")) {
      el.classList.remove("piano-key-active", "piano-key-active-pseudo");
    }
  });
  event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
}

window.addEventListener('pointerdown', (event) => {

  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;

    playAudio(src);
    pianoКeys.forEach((el) => {
      el.addEventListener('pointerover', pressedPlay);
      if (el.classList.contains("piano-key-active", "piano-key-active-pseudo")) {
        el.classList.remove("piano-key-active", "piano-key-active-pseudo");
      }
    });
    event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
  }

});

window.addEventListener('pointerup', (event) => {
  pianoКeys.forEach((el) => {
    el.removeEventListener('pointerover', pressedPlay);
    if (el.classList.contains("piano-key-active", "piano-key-active-pseudo")) {
      el.classList.remove("piano-key-active", "piano-key-active-pseudo");
    }
  });
});

window.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.piano-key[data-letter="${event.code.substr(3, 1)}"]`);
  if (!key) {
    return;
  }
  const note = key.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  key.classList.add("piano-key-active", "piano-key-active-pseudo");
  if (!event.repeat) {
    playAudio(src);
  }
});

window.addEventListener('keyup', (event) => {
  const key = document.querySelector(`.piano-key[data-letter="${event.code.substr(3, 1)}"]`);
  if (!key) {
    return;
  }
  key.classList.remove("piano-key-active", "piano-key-active-pseudo");
});

const fullscreenButton = document.querySelector('.fullscreen');

fullscreenButton.addEventListener('click', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});