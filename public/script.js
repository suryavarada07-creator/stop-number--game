// ===============================
// STOP AT 10.00 GAME
// ===============================

// Timer value in milliseconds
let elapsedTime = 0;

// Timer interval
let timerInterval = null;

// Is timer running?
let timerRunning = false;


// ===============================
// GET HTML ELEMENTS
// ===============================

const timerDisplay =
    document.getElementById("timer");

const startStopButton =
    document.getElementById("startStopBtn");

const resetButton =
    document.getElementById("resetBtn");

const message =
    document.getElementById("message");


// ===============================
// FORMAT TIMER
// ===============================

function updateDisplay() {

    const seconds =
        Math.floor(elapsedTime / 1000);

    const hundredths =
        Math.floor((elapsedTime % 1000) / 10);

    const formattedSeconds =
        String(seconds).padStart(2, "0");

    const formattedHundredths =
        String(hundredths).padStart(2, "0");

    timerDisplay.textContent =
        `${formattedSeconds}.${formattedHundredths}`;
}


// ===============================
// START / STOP BUTTON
// ===============================

startStopButton.addEventListener("click", function () {

    // ===========================
    // START
    // ===========================

    if (!timerRunning) {

        timerRunning = true;

        const startTime =
            Date.now() - elapsedTime;

        timerInterval = setInterval(function () {

            elapsedTime =
                Date.now() - startTime;

            updateDisplay();

        }, 10);

        // Change SAME button to STOP
        startStopButton.textContent = "⏹ STOP";

        startStopButton.className = "stop-btn";

        message.textContent =
            "Timer running... Stop when you want!";

        message.className =
            "message";

        return;
    }


    // ===========================
    // STOP
    // ===========================

    clearInterval(timerInterval);

    timerInterval = null;

    timerRunning = false;

    // Change SAME button back to START
    startStopButton.textContent = "▶ START";

    startStopButton.className = "start-btn";


    // ===========================
    // CHECK RESULT
    // ===========================

    if (elapsedTime === 10000) {

        message.textContent =
            "🎉 YOU WON THE OFFER! 🎉";

        message.className =
            "message win";

    } else {

        message.textContent =
            `You stopped at ${timerDisplay.textContent}`;

        message.className =
            "message lose";
    }

});


// ===============================
// RESET
// ===============================

resetButton.addEventListener("click", function () {

    // Stop timer
    if (timerInterval !== null) {

        clearInterval(timerInterval);

    }

    timerInterval = null;

    timerRunning = false;

    // Reset time
    elapsedTime = 0;

    updateDisplay();

    // Reset SAME button
    startStopButton.textContent = "▶ START";

    startStopButton.className = "start-btn";

    // Reset message
    message.textContent =
        "Press START to begin";

    message.className =
        "message";

});


// ===============================
// INITIAL DISPLAY
// ===============================

updateDisplay();