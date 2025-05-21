function updateDisplay(value) {
    const resultE = document.querySelector('.result');
    resultE.innerText = value;
    console.log(resultE);
}

export { updateDisplay };
