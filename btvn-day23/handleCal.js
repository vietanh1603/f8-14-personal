import { updateDisplay } from './updateDisplay.js';

let currentE = '';

const onclickBtn = (value) => {
    if (value === 'del') {
        currentE = '';
    }
    else if (value === '=') {
        const result = eval(currentE);
        currentE = result;
    }
    else {
        currentE += value;
    }
    updateDisplay(currentE);
}

export { onclickBtn };
