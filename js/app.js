// WARNING BOX
let warnBox = document.querySelector(".warn-box");
let closeWarnBtn = document.querySelector(".warn-box .close-warn");
let warnOverlay = document.querySelector(".warn-overlay");

// show (correct value) wanrning func
function showWarning() {
  warnBox.classList.add("visible");
  warnOverlay.classList.add("visible");

  setTimeout(function () {
    warnBox.style.setProperty("opacity", "1");
    warnBox.style.setProperty("transform", "translate(-50%, -50%)");
    warnOverlay.style.setProperty("opacity", "1");
  }, 50);
}

// hide (correct value) wanrning func
function hideWarningAndClearInput() {
  warnBox.style.setProperty("opacity", "0");
  warnBox.style.setProperty("transform", "translate(-50%, -80%)");
  warnOverlay.style.setProperty("opacity", "0");

  setTimeout(function () {
    warnBox.classList.remove("visible");
    warnOverlay.classList.remove("visible");
  }, 300);

  timeInput.value = "";
}

closeWarnBtn.addEventListener("click", hideWarningAndClearInput);

// ALARM AND MODAL
let alarmSong = document.querySelector(".alarm-song");
let modalBox = document.querySelector(".modal-box");
let hideModalBtn = document.querySelector(".modal-box button.exit");
let modalOverlay = document.querySelector(".modal-overlay");

// show modal func and start alarm
function showModalAndAlarm() {
  modalBox.classList.add("visible");
  modalOverlay.classList.add("visible");

  setTimeout(function () {
    modalBox.style.setProperty("opacity", "1");
    modalBox.style.setProperty("transform", "translate(-50%, -50%)");
    modalOverlay.style.setProperty("opacity", "1");
  }, 50);
  // play alarm song
  alarmSong.play();
}

// exit modal and stop alarm
function hideModal() {
  modalBox.style.setProperty("opacity", "0");
  modalBox.style.setProperty("transform", "translate(-50%, -80%)");
  modalOverlay.style.setProperty("opacity", "0");

  setTimeout(function () {
    modalBox.classList.remove("visible");
    modalOverlay.classList.remove("visible");
  }, 300);

  // pause alarm
  alarmSong.pause();
}
hideModalBtn.addEventListener("click", hideModal);

let timeInput = document.getElementById("time");
let submitTimeBtn = document.getElementById("submit-time");
let timeIndicator = document.querySelector(".time-indicator");
let middleClockCircle = document.querySelector(".middle-cirle");

// detect input field value (oninput)
let timeLimit;
timeInput.addEventListener("input", () => (timeLimit = Math.trunc(timeInput.value)));

submitTimeBtn.addEventListener("click", function (e) {
  if (timeLimit >= 1) {
    let rotationDegree = 0;
    let doneSeconds = 0;

    function startTimer() {
      // result in => (0.1) deg
      rotationDegree += (0.36 * 100) / 360;
      // increases 1 sec every Iteriation
      doneSeconds += 1 / 60;

      // show truncked value of gone minutes
      middleClockCircle.innerText = `${Math.trunc(doneSeconds)}min`;

      if (Math.trunc(doneSeconds) === timeLimit) {
        clearInterval(handler);
        // reset and clear last used values
        timeInput.value = "";
        timeLimit = 0;
        rotationDegree = 0;
        middleClockCircle.innerText = ""
        // show modal and play alarm
        showModalAndAlarm();
      }
      timeIndicator.style.transform = `translate(-50%) rotate(${rotationDegree}deg)`;
    }

    let handler = setInterval(startTimer, 1e3);
  } else showWarning();

  // Prevent Btn from submiting
  e.preventDefault();
});
