// ===============================
// STOP THE NUMBER GAME
// ===============================

// Starting target number
let targetNumber = 68;

// Current number displayed
let currentNumber = 1;

// Game timer
let gameTimer = null;

// Is the game currently running?
let gameRunning = false;


// ===============================
// GET HTML ELEMENTS
// ===============================

const currentNumberDisplay =
    document.getElementById("currentNumber");

const targetNumberDisplay =
    document.getElementById("targetNumber");

const targetInput =
    document.getElementById("targetInput");

const saveTargetButton =
    document.getElementById("saveTarget");

const startButton =
    document.getElementById("startBtn");

const stopButton =
    document.getElementById("stopBtn");

const newGameButton =
    document.getElementById("newGameBtn");

const message =
    document.getElementById("message");


// ===============================
// DISPLAY INITIAL TARGET
// ===============================

targetNumberDisplay.textContent = targetNumber;
targetInput.value = targetNumber;


// ===============================
// SAVE TARGET NUMBER
// ===============================

saveTargetButton.addEventListener("click", function () {

    // Don't allow changing target while game is running
    if (gameRunning) {
        message.textContent =
            "Stop the current game before changing the target.";

        return;
    }

    const enteredNumber =
        Number(targetInput.value);

    // Check number
    if (
        enteredNumber < 1 ||
        enteredNumber > 100 ||
        !Number.isInteger(enteredNumber)
    ) {

        message.textContent =
            "Please enter a number from 1 to 100.";

        return;
    }

    // Save target
    targetNumber = enteredNumber;

    // Display target
    targetNumberDisplay.textContent =
        targetNumber;

    message.textContent =
        "Target saved! Press START.";

    message.className = "message";
});


// ===============================
// START GAME
// ===============================

startButton.addEventListener("click", function () {

    // Prevent starting twice
    if (gameRunning) {
        return;
    }

    gameRunning = true;

    // Start from 1 every time
    currentNumber = 1;

    currentNumberDisplay.textContent =
        currentNumber;

    // Change buttons
    startButton.disabled = true;
    stopButton.disabled = false;

    // Disable target controls
    targetInput.disabled = true;
    saveTargetButton.disabled = true;

    message.textContent =
        "Numbers are running... STOP when you want!";

    message.className = "message";

    // Start number movement
    gameTimer = setInterval(function () {

        currentNumber++;

        // After 100, start again from 1
        if (currentNumber > 100) {
            currentNumber = 1;
        }

        currentNumberDisplay.textContent =
            currentNumber;

    }, 60);

});


// ===============================
// STOP GAME
// ===============================

stopButton.addEventListener("click", function () {

    if (!gameRunning) {
        return;
    }

    // Stop timer
    clearInterval(gameTimer);

    gameTimer = null;

    gameRunning = false;

    // Change buttons
    startButton.disabled = true;
    stopButton.disabled = true;

    // Check result
    if (currentNumber === targetNumber) {

        message.innerHTML =
            "🎉 YOU WON! 🎉";

        message.className =
            "message win";

    } else {

        message.innerHTML =
            "😄 BETTER LUCK NEXT TIME!";

        message.className =
            "message lose";
    }

});


// ===============================
// NEW GAME
// ===============================

newGameButton.addEventListener("click", function () {

    // Stop timer if running
    if (gameTimer !== null) {
        clearInterval(gameTimer);
    }

    gameTimer = null;

    gameRunning = false;

    // Reset number
    currentNumber = 1;

    currentNumberDisplay.textContent =
        currentNumber;

    // Reset buttons
    startButton.disabled = false;
    stopButton.disabled = true;

    // Allow target changing
    targetInput.disabled = false;
    saveTargetButton.disabled = false;

    // Message
    message.textContent =
        "Set your target and press START!";

    message.className = "message";

});