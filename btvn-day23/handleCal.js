import { updateDisplay } from './updateDisplay.js';

let inputE = '';

// clear man hinh
const clearScreen = () => {
    inputE = '';
    updateDisplay(inputE);
}

const appendNumber = (number) => {
    inputE += number;
    updateDisplay(inputE);
}

// phep cong
const add = () => {
    inputE += '+';
    updateDisplay(inputE);
}

// phep tru
const subtract = () => {
    inputE += '-';
    updateDisplay(inputE);
}

// phep nhan
const multiply = () => {
    inputE += '*';
    updateDisplay(inputE);
}

// phep chia
const divide = () => {
    inputE += '/';
    updateDisplay(inputE);
}

// ket qua
const calculate = () => {
    let result = eval(inputE);
        // inputE = result;
    updateDisplay(result);
    console.log('input',result);
}

const onclickBtn = (value) => {
    switch (value) {
        case 'del':
            clearScreen();
            break;
        case '=':
            calculate();
            break;
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case '*':
            multiply();
            break;
        case '/':
            divide();
            break;
        default:
            appendNumber(value);
    }
}


export { onclickBtn };
