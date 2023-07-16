const display = document.querySelector(".calculate-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitinfForSecondValue = false;

updateDisplay();
function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  let elem = e.target;
  let value = elem.value;
  if (!elem.matches("button")) return;

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handelOperator(value);
      break;
    case ".":
      inputDecimal();
      break;
    case "clear":
      inputClear();
      break;
    default:
      inputNumber(elem.value);
  }
  updateDisplay();
});

function inputNumber(num) {
  if (waitinfForSecondValue) {
    displayValue = num;
    waitinfForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function inputClear() {
  displayValue = "0";
}
//////////////////////////

function handelOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitinfForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitinfForSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}
