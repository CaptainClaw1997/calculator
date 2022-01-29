import * as Calculator from "./calculator.js";

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return Calculator.add(num1, num2);

        case '-':
            return Calculator.subtract(num1, num2);
        
        case '*':
            return Calculator.multiply(num1, num2);

        case '/':
            return Calculator.divide(num1, num2);
    }
}