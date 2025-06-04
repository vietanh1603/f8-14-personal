export class GameLogic {
    constructor(gameState, renderer) {
        this.gameState = gameState;
        this.renderer = renderer;
    }

    initGame() {
        this.gameState.reset();
        this.renderer.resetLifelineButtons();
        this.showCurrentQuestion();
        this.startTimer();
        this.addEventListeners();
    }

    showCurrentQuestion() {
        const { question: currentQuestion, index } = this.gameState.getRandomQuestionByLevel(this.gameState.currentLevel);
        this.gameState.currentQuestionIndex = index;

        this.renderer.showQuestion(currentQuestion);
        this.renderer.renderPrizeLevels(this.gameState.currentLevel, this.gameState.prizeMap);
        this.checkLifelineAvailability();
    }

    nextQuestion() {
        this.gameState.currentLevel = Math.min(this.gameState.currentLevel + 1, 15);

        if (this.gameState.currentLevel <= 15) {
            this.gameState.countdown = 30;
            this.startTimer();
            this.showCurrentQuestion();
        } else {
            this.endGame("Chúc mừng! Bạn đã hoàn thành tất cả câu hỏi!");
        }
    }

    endGame(message) {
        this.gameState.gameActive = false;
        clearInterval(this.gameState.timerInterval);

        const prize = this.gameState.calculatePrize();
        this.renderer.showGameOverModal(message, prize, this.gameState.currentLevel);
    }

    use5050() {
        if (!this.gameState.lifelines['5050'] || !this.gameState.gameActive) return;

        const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];
        const options = ['a', 'b', 'c', 'd'];
        const wrongOptions = options.filter(opt => opt !== currentQuestion.correctAns);

        const keepWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

        let hiddenCount = 0;
        options.forEach(opt => {
            if (opt !== currentQuestion.correctAns && opt !== keepWrongOption && hiddenCount < 2) {
                const optionElement = this.renderer.refs.questionRef.querySelector(`.question-option[value="${opt}"]`);
                optionElement.style.visibility = 'hidden';
                hiddenCount++;
            }
        });

        this.gameState.lifelines['5050'] = false;
        this.renderer.disableLifeline('5050');
    }

    useAudience() {
        if (!this.gameState.lifelines['audience'] || !this.gameState.gameActive) return;

        const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];
        const options = ['a', 'b', 'c', 'd'];
        let percentages = {};

        percentages[currentQuestion.correctAns] = Math.floor(Math.random() * 30) + 40;

        let remaining = 100 - percentages[currentQuestion.correctAns];
        const wrongOptions = options.filter(opt => opt !== currentQuestion.correctAns);

        wrongOptions.forEach((opt, index) => {
            if (index === wrongOptions.length - 1) {
                percentages[opt] = remaining;
            } else {
                percentages[opt] = Math.floor(Math.random() * remaining * 0.7);
                remaining -= percentages[opt];
            }
        });

        this.renderer.showAudienceModal(percentages);
        this.gameState.lifelines['audience'] = false;
        this.renderer.disableLifeline('audience');
    }

    useCall() {
        if (!this.gameState.lifelines['call'] || !this.gameState.gameActive) return;

        const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];
        const options = ['a', 'b', 'c', 'd'];

        const suggestedAnswer = Math.random() < 0.7 ? currentQuestion.correctAns :
            options.find(opt => opt !== currentQuestion.correctAns);

        const phrases = [
            `Tôi chắc chắn là ${suggestedAnswer.toUpperCase()}`,
            `Hãy chọn ${suggestedAnswer.toUpperCase()} nhé`,
            `Theo tôi là ${suggestedAnswer.toUpperCase()}`,
            `Tôi nghĩ ${suggestedAnswer.toUpperCase()} đúng`
        ];

        alert(phrases[Math.floor(Math.random() * phrases.length)]);
        this.gameState.lifelines['call'] = false;
        this.renderer.disableLifeline('call');
    }

    useExpert() {
        if (!this.gameState.lifelines['expert'] || !this.gameState.gameActive) return;

        const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];
        const options = ['a', 'b', 'c', 'd'];

        const suggestedAnswer = Math.random() < 0.5 ? currentQuestion.correctAns :
            options.find(opt => opt !== currentQuestion.correctAns);

        const explanations = {
            a: "Theo nghiên cứu của chúng tôi, A là đáp án hợp lý nhất",
            b: "Tôi đã xem xét kỹ và nghiêng về đáp án B",
            c: "Có nhiều bằng chứng ủng hộ đáp án C",
            d: "D có vẻ là lựa chọn chính xác trong trường hợp này"
        };

        alert(`Chuyên gia: "${explanations[suggestedAnswer]}"`);
        this.gameState.lifelines['expert'] = false;
        this.renderer.disableLifeline('expert');
    }

    startTimer() {
        clearInterval(this.gameState.timerInterval);
        this.renderer.updateTimerDisplay(this.gameState.countdown);

        this.gameState.timerInterval = setInterval(() => {
            this.gameState.countdown--;
            this.renderer.updateTimerDisplay(this.gameState.countdown);

            if (this.gameState.countdown <= 0) {
                this.endGame("Hết thời gian! Game kết thúc!");
            }
        }, 1000);
    }

    checkLifelineAvailability() {
        ['5050', 'audience', 'call', 'expert'].forEach(lifeline => {
            const button = this.renderer.refs[`btn${lifeline.charAt(0).toUpperCase() + lifeline.slice(1)}`];
            button.disabled = !this.gameState.lifelines[lifeline] || this.gameState.currentLevel < 5;
        });
    }

    addEventListeners() {
        // Chọn đáp án
        ['a', 'b', 'c', 'd'].forEach(key => {
            const option = this.renderer.refs.questionRef.querySelector(`.question-option[value="${key}"]`);

            option.addEventListener('click', () => {
                if (!this.gameState.gameActive) return;

                const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];
                currentQuestion.userAns = key;
                currentQuestion.isCorrect = (key === currentQuestion.correctAns);

                this.renderer.resetOptionsBackground();
                option.style.backgroundColor = '#ffeaa7';
            });
        });

        // Nút kiểm tra
        this.renderer.refs.checkBtn.addEventListener('click', () => {
            if (!this.gameState.gameActive) return;

            const currentQuestion = this.gameState.questions[this.gameState.currentQuestionIndex];

            if (!currentQuestion.userAns) {
                alert("Vui lòng chọn một đáp án!");
                return;
            }

            const selectedOption = this.renderer.refs.questionRef.querySelector(`.question-option[value="${currentQuestion.userAns}"]`);

            if (currentQuestion.isCorrect) {
                selectedOption.style.backgroundColor = '#2ecc71';
                setTimeout(() => this.nextQuestion(), 1000);
            } else {
                selectedOption.style.backgroundColor = '#e74c3c';

                const correctOption = this.renderer.refs.questionRef.querySelector(`.question-option[value="${currentQuestion.correctAns}"]`);
                correctOption.style.backgroundColor = '#2ecc71';

                setTimeout(() => {
                    this.endGame("Đáp án sai! Game kết thúc!");
                }, 1500);
            }
        });

        // Các quyền trợ giúp
        this.renderer.refs.btn5050.addEventListener('click', () => this.use5050());
        this.renderer.refs.btnAudience.addEventListener('click', () => this.useAudience());
        this.renderer.refs.btnCall.addEventListener('click', () => this.useCall());
        this.renderer.refs.btnExpert.addEventListener('click', () => this.useExpert());

        // Modal events
        this.renderer.refs.restartGameBtn.addEventListener('click', () => {
            this.renderer.refs.gameOverModal.style.display = 'none';
            this.initGame();
        });

        this.renderer.refs.closeAudienceBtn.addEventListener('click', () => {
            this.renderer.refs.audienceModal.style.display = 'none';
        });
    }
}