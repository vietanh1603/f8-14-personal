export class GameState {
    constructor(questions, prizeMap) {
        this.questions = questions;
        this.prizeMap = prizeMap;
        this.gameActive = true;
        this.currentQuestionIndex = 0;
        this.countdown = 30;
        this.timerInterval = null;
        this.currentLevel = 1;
        this.usedQuestionIndices = [];
        this.lifelines = {
            5050: true,
            audience: true,
            call: true,
            expert: true
        };
    }

    reset() {
        this.gameActive = true;
        this.currentQuestionIndex = 0;
        this.currentLevel = 1;
        this.countdown = 30;
        this.usedQuestionIndices = [];
        this.lifelines = {
            5050: true,
            audience: true,
            call: true,
            expert: true
        };
    }

    getRandomQuestionByLevel(level) {
        const availableQuestions = this.questions.filter((q, index) =>
            q.level === level && !this.usedQuestionIndices.includes(index));

        if (availableQuestions.length === 0) {
            this.usedQuestionIndices = this.usedQuestionIndices.filter(i => this.questions[i].level !== level);
            return this.getRandomQuestionByLevel(level);
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];
        const globalIndex = this.questions.findIndex(q => q.id === selectedQuestion.id);

        this.usedQuestionIndices.push(globalIndex);
        return { question: selectedQuestion, index: globalIndex };
    }

    calculatePrize() {
        if (this.currentLevel >= 15) return this.prizeMap[15];
        if (this.currentLevel >= 11) return this.prizeMap[10];
        if (this.currentLevel >= 6) return this.prizeMap[5];
        return 0;
    }
}