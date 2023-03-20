const numBtns = document.querySelectorAll(".numbers");
const opBtns = document.querySelectorAll(".operators");

const clearAll = document.querySelector(".clear_all");
const plusMinus = document.querySelector(".plus_minus");
const clearLast = document.querySelector(".clear_last");
const dot = document.querySelector(".dot");
const equalto = document.querySelector(".equalto");

const display = document.querySelector("#display");

let currentNumber = "";
let firstNumber = null;
let operator = null;

function check_size() {
    if (currentNumber.length === 8) {
        return false;
    }
    return true;
}

function inputNumber(number) {
    if (check_size()) {
        if (currentNumber === "0") {
            resetScreen();
        }

        if (currentNumber.includes(".")) {
            let decimalIndex = currentNumber.indexOf(".");
            if (currentNumber.substring(decimalIndex + 1).length < 3) {
                currentNumber += number;
                display.innerText = currentNumber;
            }
        } else {
            currentNumber += number;
            display.innerText = currentNumber;
        }
    }
}

function inputDecimal() {
    if (check_size()) {
        if (currentNumber === "") {
            currentNumber += "0";
        }
        if (!currentNumber.includes(".")) {
            currentNumber += ".";
        }
        display.innerText = currentNumber;
    }
}

function inputOperator(selectedOperator) {
    const inputValue = parseFloat(currentNumber);
    operator = selectedOperator;
    resetScreen();

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator && !isNaN(inputValue)) {
        const result = calculate(firstNumber, inputValue, operator);
        display.innerText = result;
        firstNumber = result;
    }
}

function calculate(num1, num2, operator) {
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };
    const operationFunction = operations[operator];
    const result = operationFunction(num1, num2);
    let resultSize = result.toString().length;

    if (result.toString().charAt(0) === "-") {
        resultSize -= 1;
    }
    if (resultSize > 8) {
        return "ERR";
    } else {
        return result;
    }
}

function toggleSign() {
    if (currentNumber !== "0" && !isNaN(currentNumber)) {
        currentNumber =
            currentNumber.charAt(0) === "-"
                ? currentNumber.slice(1)
                : "-" + currentNumber;
        display.innerText = currentNumber;
    }
}

function resetScreen() {
    currentNumber = "";
    display.innerText = currentNumber;
}

function clearAllInput() {
    currentNumber = "0";
    display.innerText = currentNumber;
    firstNumber = null;
    operator = null;
}

function clearLastInput() {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber.length === 0) {
        currentNumber = "0";
    }
    display.innerText = currentNumber;
}

numBtns.forEach((button) => {
    button.addEventListener("click", () => inputNumber(button.innerText));
});

opBtns.forEach((button) => {
    button.addEventListener("click", () => inputOperator(button.innerText));
});

clearAll.addEventListener("click", clearAllInput);
plusMinus.addEventListener("click", toggleSign);
clearLast.addEventListener("click", clearLastInput);
dot.addEventListener("click", inputDecimal);

equalto.addEventListener("click", () => {
    const inputValue = parseFloat(currentNumber);
    if (operator && firstNumber !== null) {
        display.innerText = calculate(firstNumber, inputValue, operator);
        firstNumber = null;
        currentNumber = display.innerText;
        operator = null;
    }
});
