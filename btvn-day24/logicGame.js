// logicGame.js
import { questions, prizeMap } from './const.js';
import {
    renderQuestion,
    resetOptionsBackground,
    renderPrizeLevels,
    updateTimerDisplay,
    showGameOverModal,
    hideGameOverModal,
    showAudienceModal,
    hideAudienceModal,
    disableLifelineButton,
    resetLifelineButtonsUI,
    updateLifelineButtonsState,
    highlightOption
} from './render.js';
import { DOMRefs } from './references.js';

export class GameLogic {
    constructor() {
        this.gameActive = true;
        this.currentQuestionIndex = 0;
        this.countdown = 30;
        this.timerInterval = null;
        this.currentLevel = 1;
        this.usedQuestionIndices = [];
        this.lifelines = {
            '5050': true,
            'audience': true,
            'call': true,
            'expert': true
        };
        this.currentQuestion = null;
        this.selectedAnswer = null;
    }

    initGame() {
        this.currentQuestionIndex = 0;
        this.currentLevel = 1;
        this.countdown = 30;
        this.gameActive = true;
        this.usedQuestionIndices = []; // Xóa các câu hỏi đã sử dụng cho trò chơi mới
        this.selectedAnswer = null;

        // Đặt lại các quyền trợ giúp
        this.lifelines = {
            '5050': true,
            'audience': true,
            'call': true,
            'expert': true
        };

        resetLifelineButtonsUI(); // Đặt lại giao diện các nút quyền trợ giúp
        this.showCurrentQuestion();
        this.startTimer();
        this.addEventListeners(); // Thêm lại các trình nghe sự kiện sau khi đặt lại
    }
    getRandomQuestionByLevel(level) {
        let availableQuestionsForLevel = questions.filter((q, index) =>
            q.level === level && !this.usedQuestionIndices.includes(index));

        if (availableQuestionsForLevel.length === 0) {
            // Nếu TẤT CẢ câu hỏi cho cấp độ NÀY đã được sử dụng, đặt lại chỉ các câu hỏi của cấp độ này từ danh sách đã sử dụng
            const questionIdsForThisLevel = questions.filter(q => q.level === level).map(q => q.id);
            this.usedQuestionIndices = this.usedQuestionIndices.filter(index =>
                !questionIdsForThisLevel.includes(questions[index].id)
            );
            // Lọc lại các câu hỏi khả dụng sau khi đặt lại cho cấp độ hiện tại
            availableQuestionsForLevel = questions.filter((q, index) =>
                q.level === level && !this.usedQuestionIndices.includes(index));
        }

        const randomIndex = Math.floor(Math.random() * availableQuestionsForLevel.length);
        const selectedQuestion = availableQuestionsForLevel[randomIndex];
        const globalIndex = questions.findIndex(q => q.id === selectedQuestion.id);

        this.usedQuestionIndices.push(globalIndex);
        return { question: selectedQuestion, index: globalIndex };
    }
    showCurrentQuestion() {
        const { question, index } = this.getRandomQuestionByLevel(this.currentLevel);
        this.currentQuestion = question;
        this.currentQuestionIndex = index;
        this.selectedAnswer = null; // Đặt lại đáp án đã chọn cho câu hỏi mới

        renderQuestion(this.currentQuestion);
        renderPrizeLevels(this.currentLevel);
        resetOptionsBackground();
        updateLifelineButtonsState(this.lifelines, this.currentLevel);
    }

    nextQuestion() {
        this.currentLevel = Math.min(this.currentLevel + 1, 15);

        if (this.currentLevel <= 15) {
            this.countdown = 30;
            this.startTimer();
            this.showCurrentQuestion();
        } else {
            this.endGame("Chúc mừng! Bạn đã hoàn thành tất cả câu hỏi!");
        }
    }

    endGame(message) {
        this.gameActive = false;
        clearInterval(this.timerInterval);

        const prize = this.calculatePrize();
        showGameOverModal(message, this.currentLevel, prize);
    }

    calculatePrize() {
        // Các mức giải thưởng là các mốc quan trọng, không phải mỗi cấp độ
        if (this.currentLevel >= 15) return prizeMap[15];
        if (this.currentLevel >= 10) return prizeMap[10];
        if (this.currentLevel >= 5) return prizeMap[5];
        return 0; // Nếu thất bại trước cấp độ 5, họ nhận 0
    }

    startTimer() {
        clearInterval(this.timerInterval);
        updateTimerDisplay(this.countdown);

        this.timerInterval = setInterval(() => {
            this.countdown--;
            updateTimerDisplay(this.countdown);

            if (this.countdown <= 0) {
                this.endGame("Hết thời gian! Game kết thúc!");
            }
        }, 1000);
    }

    handleOptionSelection(selectedOptionValue) {
        if (!this.gameActive) return;

        this.selectedAnswer = selectedOptionValue;
        resetOptionsBackground();
        highlightOption(selectedOptionValue, '#ffeaa7'); // Đánh dấu đáp án đã chọn
    }

    checkAnswer() {
        if (!this.gameActive) return;

        if (!this.selectedAnswer) {
            alert("Vui lòng chọn một đáp án!");
            return;
        }

        const isCorrect = (this.selectedAnswer === this.currentQuestion.correctAns);

        if (isCorrect) {
            highlightOption(this.selectedAnswer, '#2ecc71'); // Màu xanh lá cây cho đáp án đúng
            setTimeout(() => this.nextQuestion(), 1000);
        } else {
            highlightOption(this.selectedAnswer, '#e74c3c'); // Màu đỏ cho đáp án sai

            // Cũng đánh dấu đáp án đúng bằng màu xanh lá cây
            highlightOption(this.currentQuestion.correctAns, '#2ecc71');

            setTimeout(() => {
                this.endGame("Đáp án sai! Game kết thúc!");
            }, 1500);
        }
    }

    use5050() {
        // Thêm kiểm tra cấp độ để đảm bảo quyền trợ giúp chỉ được sử dụng từ cấp 5 trở lên
        if (!this.lifelines['5050'] || !this.gameActive || this.currentLevel < 5) return;

        const options = ['a', 'b', 'c', 'd'];
        const wrongOptions = options.filter(opt => opt !== this.currentQuestion.correctAns);

        // Chọn ngẫu nhiên hai đáp án sai để ẩn
        let optionsToHide = [];
        // Đảm bảo chúng ta không cố gắng ẩn nhiều lựa chọn hơn số lượng có sẵn hoặc dự định (2)
        while (optionsToHide.length < 2 && wrongOptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * wrongOptions.length);
            optionsToHide.push(wrongOptions.splice(randomIndex, 1)[0]);
        }

        optionsToHide.forEach(opt => {
            const optionElement = DOMRefs.questionRef.querySelector(`.question-option[value="${opt}"]`);
            if (optionElement) {
                optionElement.style.visibility = 'hidden'; // Ẩn lựa chọn
            }
        });

        this.lifelines['5050'] = false;
        disableLifelineButton(DOMRefs.btn5050);
    }

    useAudience() {
        // Thêm kiểm tra cấp độ
        if (!this.lifelines['audience'] || !this.gameActive || this.currentLevel < 5) return;

        const options = ['a', 'b', 'c', 'd'];
        let percentages = {};
        let totalPercentageAssigned = 0;

        // Đáp án đúng nhận một phần đáng kể (40-70%)
        const correctAnsPercentage = Math.floor(Math.random() * 31) + 40; // 40-70
        percentages[this.currentQuestion.correctAns] = correctAnsPercentage;
        totalPercentageAssigned += correctAnsPercentage;

        const wrongOptions = options.filter(opt => opt !== this.currentQuestion.correctAns);
        let remainingPercentage = 100 - totalPercentageAssigned;

        // Phân phối phần trăm còn lại giữa các đáp án sai
        wrongOptions.forEach((opt, index) => {
            if (index === wrongOptions.length - 1) {
                percentages[opt] = remainingPercentage; // Gán tất cả phần còn lại cho đáp án cuối cùng
            } else {
                const percentage = Math.floor(Math.random() * (remainingPercentage / (wrongOptions.length - index) * 1.5)); // Phân phối không đều
                percentages[opt] = percentage;
                remainingPercentage -= percentage;
            }
        });

        // Đảm bảo tổng số chính xác 100% (do Math.floor, có thể bị lệch một lượng nhỏ)
        const currentTotal = Object.values(percentages).reduce((sum, val) => sum + val, 0);
        if (currentTotal !== 100) {
            percentages[this.currentQuestion.correctAns] += (100 - currentTotal); // Điều chỉnh phần trăm của đáp án đúng
        }

        showAudienceModal(percentages);
        this.lifelines['audience'] = false;
        disableLifelineButton(DOMRefs.btnAudience);
    }
    useCall() {
        // Thêm kiểm tra cấp độ
        if (!this.lifelines['call'] || !this.gameActive || this.currentLevel < 5) return;

        const options = ['a', 'b', 'c', 'd'];
        let suggestedAnswer;

        // 70% cơ hội đúng
        if (Math.random() < 0.7) {
            suggestedAnswer = this.currentQuestion.correctAns;
        } else {
            // Chọn một đáp án sai ngẫu nhiên
            const wrongOptions = options.filter(opt => opt !== this.currentQuestion.correctAns);
            suggestedAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        const phrases = [
            `Tôi chắc chắn là ${suggestedAnswer.toUpperCase()}`,
            `Hãy chọn ${suggestedAnswer.toUpperCase()} nhé`,
            `Theo tôi là ${suggestedAnswer.toUpperCase()}`,
            `Tôi nghĩ ${suggestedAnswer.toUpperCase()} đúng`
        ];

        alert(phrases[Math.floor(Math.random() * phrases.length)]);
        this.lifelines['call'] = false;
        disableLifelineButton(DOMRefs.btnCall);
    }

    useExpert() {
        // Thêm kiểm tra cấp độ
        if (!this.lifelines['expert'] || !this.gameActive || this.currentLevel < 5) return;

        const options = ['a', 'b', 'c', 'd'];
        let suggestedAnswer;

        // 50% cơ hội đúng
        if (Math.random() < 0.5) {
            suggestedAnswer = this.currentQuestion.correctAns;
        } else {
            // Chọn một đáp án sai ngẫu nhiên
            const wrongOptions = options.filter(opt => opt !== this.currentQuestion.correctAns);
            suggestedAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        const explanations = {
            a: "Theo nghiên cứu của chúng tôi, A là đáp án hợp lý nhất",
            b: "Tôi đã xem xét kỹ và nghiêng về đáp án B",
            c: "Có nhiều bằng chứng ủng hộ đáp án C",
            d: "D có vẻ là lựa chọn chính xác trong trường hợp này"
        };

        alert(`Chuyên gia: "${explanations[suggestedAnswer]}"`);
        this.lifelines['expert'] = false;
        disableLifelineButton(DOMRefs.btnExpert);
    }

    addEventListeners() {
        // Trình nghe lựa chọn đáp án
        ['a', 'b', 'c', 'd'].forEach(key => {
            const option = DOMRefs.questionRef.querySelector(`.question-option[value="${key}"]`);
            // Đảm bảo các trình nghe chỉ được thêm một lần
            option.removeEventListener('click', this.handleOptionSelection.bind(this, key)); // Xóa trình nghe cũ
            option.addEventListener('click', this.handleOptionSelection.bind(this, key));
        });

        // Trình nghe nút kiểm tra
        DOMRefs.checkBtn.removeEventListener('click', this.checkAnswer.bind(this)); // Xóa trình nghe cũ
        DOMRefs.checkBtn.addEventListener('click', this.checkAnswer.bind(this));

        // Trình nghe modal
        DOMRefs.restartGameBtn.removeEventListener('click', this.handleRestartGameClick); // Xóa trình nghe cũ
        DOMRefs.restartGameBtn.addEventListener('click', this.handleRestartGameClick);

        DOMRefs.closeAudienceBtn.removeEventListener('click', hideAudienceModal); // Xóa trình nghe cũ
        DOMRefs.closeAudienceBtn.addEventListener('click', hideAudienceModal);

        // Trình nghe nút quyền trợ giúp
        DOMRefs.btn5050.removeEventListener('click', this.use5050.bind(this)); // Xóa trình nghe cũ
        DOMRefs.btn5050.addEventListener('click', this.use5050.bind(this));

        DOMRefs.btnAudience.removeEventListener('click', this.useAudience.bind(this)); // Xóa trình nghe cũ
        DOMRefs.btnAudience.addEventListener('click', this.useAudience.bind(this));

        DOMRefs.btnCall.removeEventListener('click', this.useCall.bind(this)); // Xóa trình nghe cũ
        DOMRefs.btnCall.addEventListener('click', this.useCall.bind(this));

        DOMRefs.btnExpert.removeEventListener('click', this.useExpert.bind(this)); // Xóa trình nghe cũ
        DOMRefs.btnExpert.addEventListener('click', this.useExpert.bind(this));
    }

    // Hàm xử lý riêng cho nút restart để có thể removeEventListener dễ dàng hơn
    handleRestartGameClick = () => {
        hideGameOverModal();
        this.initGame();
    }
}