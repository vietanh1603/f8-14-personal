import {questions} from "./const.js";
import {questionRef} from "./referabces.js";

// lay cau hoi dau tien
const curQuestion = questions[0]
curQuestion.innerText = questions[0]

const onShowQuestion = () => {
    const titleRef = document.querySelector('.question-title')
    titleRef.innerText = questions[0].question

    for (const key of ['a', 'b', 'c', 'd']) {
        questionRef.querySelector(`.question-option[value="${key}"]`).innerText = `${key.toUpperCase()}: ${curQuestion[key]}`
    }

}
// tao ham reset background

const resetBackground = () => {
    questionRef.querySelectorAll('.question-option').forEach(ref => {
        ref.style.backgroundColor = '#fff'
    })
}

const addEvent = () => {
    for (const key of ['a', 'b', 'c', 'd']) {
        const answerRef = questionRef.querySelector(`.question-option[value="${key}"]`)
        answerRef.addEventListener('click', () => {
            console.log('click',key)
            // set userAns
            curQuestion.userAns = key
            curQuestion.isCorrect = curQuestion.userAns === curQuestion.correctAns

            // set background
            resetBackground()
            answerRef.style.backgroundColor = 'red'
            console.log(curQuestion)
        })
    }
}

addEvent()

onShowQuestion()