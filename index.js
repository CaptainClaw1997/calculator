const add = function(num1, num2) {
	return (num1 + num2);
};

const subtract = function(num1, num2) {
	return (num1 - num2);
};

const multiply = function(num1, num2) {
    return num1 * num2;
};

const divide = function(num1, num2) {
    return num1 / num2;
};

function operate(num1, operator, num2) {

    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);
        
        case '*':
            return multiply(num1, num2);

        case '/':
            if (num2 !== 0) {
                return divide(num1, num2);
            } 
            else {
                return null;
            }
    }
}

const hasOperator = false;
const displayCurrent = document.querySelector("#display-current");
const displayPrevious = document.querySelector("#display-previous");
const buttons = [...document.querySelectorAll("button")];
const resetButton = document.querySelector("button#reset");
const deleteButton = document.querySelector("button#delete");
const runCalculationButton = document.querySelector("button#run-calculation");
const operatorInputButtons = [...document.querySelectorAll("button.operator-input")];
const numericalInputButtons = [...document.querySelectorAll("button.numerical-input")];
const decimalPointInputButton = document.querySelector("button#decimal-point");


resetButton.addEventListener("click", (e) => {
    displayCurrent.innerText = "0";
    displayPrevious.innerText = "_";
});

deleteButton.addEventListener("click", (e) => {
    // Delete last character
    if (displayCurrent.innerText.length > 1) {
        displayCurrent.innerText = displayCurrent.innerText.slice(0, displayCurrent.innerText.length - 1);
    } else {
    // When down to 1 character, need to reset to default state
        displayCurrent.innerText = "0";
    }
})

runCalculationButton.addEventListener("click", (e) => {
    // if just single number input, do nothing, because same number will be shown as answer
    if (displayPrevious.innerText === "_" || displayPrevious.innerText[displayPrevious.innerText.length - 1] === "=") {
        return;
    }

    // Gather the full expression
    const expression = displayPrevious.innerText.toString().split(" ");
    const num1 = parseFloat(expression[0]);
    const operator = expression[1];
    const num2 = parseFloat(displayCurrent.innerText);
    const result = operate(num1, operator, num2);
    if (result) {
        displayPrevious.innerText += " " + displayCurrent.innerText.toString();
        if (Math.round(result) === result) {
            displayCurrent.innerText = result.toString();
        } else {
            displayCurrent.innerText = (Math.round(result * 1000) / 1000).toString();
        }
        displayPrevious.innerText += " =";
    } else {
        alert("Cannot divide by 0!");
    }
});

operatorInputButtons.forEach((button) => { 
    button.addEventListener("click", (e) => {
        const pressedButton = e.target;

        // need to evaluate if current expression is not empty
        if (displayPrevious.innerText !== "_") {
            if (displayPrevious.innerText[displayPrevious.innerText.length - 1] !== "="){
                runCalculationButton.click();
            } else {
                displayPrevious.innerText = displayCurrent.innerText;
            }
        } 
        displayPrevious.innerText = displayCurrent.innerText.toString() + " " + pressedButton.getAttribute("data-item");
        displayCurrent.innerText = "0";
    })
});

numericalInputButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const pressedButton = e.target;
        const buttonData = pressedButton.getAttribute("data-item");
        // Calculator shows "0" in default state; otherwise append
        if (displayCurrent.innerText === "0") {
            displayCurrent.innerText = buttonData;
        } else {
            displayCurrent.innerText += buttonData;
        }
    })
});

decimalPointInputButton.addEventListener("click", (e) => {
    const pressedButton = e.target;
    const decimalPoint = pressedButton.getAttribute("data-item")
    if (displayCurrent.innerText.indexOf(decimalPoint) === -1){
        displayCurrent.innerText += decimalPoint;
    }
})