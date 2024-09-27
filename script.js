let display = document.getElementById('display');
let currentInput = '0';
let isCalculated = false;

// Append number to the display
function appendNumber(number) {
    if (isCalculated) {
        currentInput = number;
        isCalculated = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

// Append operator to the display
function appendOperator(operator) {
    if (isCalculated) {
        isCalculated = false;
    }
    if (!endsWithOperator()) {
        currentInput += ` ${operator} `;
        updateDisplay();
    }
}

// Append a decimal point, ensuring only one per number
function appendDecimal() {
    if (isCalculated) {
        currentInput = '0.';
        isCalculated = false;
    } else if (!getCurrentNumber().includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Clear the display and reset input
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// Delete the last character or operator
function deleteChar() {
    if (currentInput.length === 1 || currentInput === '0') {
        currentInput = '0';
    } else {
        currentInput = currentInput.trim().slice(0, -1);
    }
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

// Perform the calculation and display the result
function calculateResult() {
    try {
        if (!endsWithOperator()) {
            let result = eval(currentInput.replace('×', '*').replace('÷', '/'));
            display.innerText = result;
            currentInput = result.toString();
            isCalculated = true;
        }
    } catch (error) {
        display.innerText = 'Error';
        currentInput = '0';
    }
}

// Check if the input ends with an operator
function endsWithOperator() {
    return /[\+\-\*\/] $/.test(currentInput.trim());
}

// Get the current number being entered (since operators split the input)
function getCurrentNumber() {
    let parts = currentInput.trim().split(' ');
    return parts[parts.length - 1];
}

// Update the display with the current input
function updateDisplay() {
    display.innerText = currentInput;
}
