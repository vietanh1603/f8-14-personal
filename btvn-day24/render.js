export class Renderer {
    constructor(DOMReferences) {
        this.refs = DOMReferences;
    }

    showQuestion(question) {
        this.refs.questionTitle.textContent = question.question;

        ['a', 'b', 'c', 'd'].forEach(key => {
            const optionElement = this.refs.questionRef.querySelector(`.question-option[value="${key}"]`);
            optionElement.textContent = `${key.toUpperCase()}: ${question[key]}`;
            optionElement.style.display = '';
            optionElement.style.visibility = '';
        });
    }

    renderPrizeLevels(level, prizeMap) {
        this.refs.listBonus.innerHTML = '';

        const levels = Object.keys(prizeMap).sort((a, b) => b - a);

        levels.forEach(lvl => {
            const span = document.createElement('span');
            span.textContent = `Mức ${lvl}: ${prizeMap[lvl].toLocaleString('vi-VN')} VND`;

            if (parseInt(lvl) === level) {
                span.classList.add('current-level');
            } else if (parseInt(lvl) < level) {
                span.classList.add('passed-level');
            }

            this.refs.listBonus.appendChild(span);
        });
    }

    resetOptionsBackground() {
        this.refs.questionRef.querySelectorAll('.question-option').forEach(option => {
            option.style.backgroundColor = '#fff';
        });
    }

    showGameOverModal(message, prize, level) {
        this.refs.modalMessage.textContent = message;
        this.refs.modalLevel.textContent = `Bạn đã đạt đến mức ${level}`;
        this.refs.modalPrize.textContent = `Tiền thưởng: ${prize.toLocaleString('vi-VN')} VND`;
        this.refs.gameOverModal.style.display = 'flex';
    }

    showAudienceModal(percentages) {
        this.refs.audienceResults.innerHTML = '';

        ['a', 'b', 'c', 'd'].forEach(opt => {
            const optionDiv = document.createElement('div');
            optionDiv.style.margin = '10px 0';

            const labelDiv = document.createElement('div');
            labelDiv.style.display = 'flex';
            labelDiv.style.justifyContent = 'space-between';

            const optionLabel = document.createElement('span');
            optionLabel.textContent = `${opt.toUpperCase()}`;

            const percentageLabel = document.createElement('span');
            percentageLabel.textContent = `${percentages[opt]}%`;

            labelDiv.appendChild(optionLabel);
            labelDiv.appendChild(percentageLabel);

            const barContainer = document.createElement('div');
            barContainer.className = 'audience-bar-container';

            const bar = document.createElement('div');
            bar.className = 'audience-bar';
            bar.style.width = `${percentages[opt]}%`;

            barContainer.appendChild(bar);

            optionDiv.appendChild(labelDiv);
            optionDiv.appendChild(barContainer);

            this.refs.audienceResults.appendChild(optionDiv);
        });

        this.refs.audienceModal.style.display = 'flex';
    }

    updateTimerDisplay(time) {
        this.refs.timeRef.textContent = time;
    }

    disableLifeline(lifeline) {
        const button = this.refs[`btn${lifeline.charAt(0).toUpperCase() + lifeline.slice(1)}`];
        button.disabled = true;
        button.style.backgroundColor = '#bdc3c7';
        button.textContent = lifeline === '5050' ? '50:50' :
            lifeline === 'audience' ? 'Hỏi khán giả' :
                lifeline === 'call' ? 'Gọi điện' : 'Chuyên gia';
    }

    resetLifelineButtons() {
        ['5050', 'audience', 'call', 'expert'].forEach(lifeline => {
            const button = this.refs[`btn${lifeline.charAt(0).toUpperCase() + lifeline.slice(1)}`];
            button.disabled = false;
            button.style.backgroundColor = '#2ecc71';
            button.textContent = lifeline === '5050' ? '50:50' :
                lifeline === 'audience' ? 'Hỏi khán giả' :
                    lifeline === 'call' ? 'Gọi điện' : 'Chuyên gia';
        });
    }
}