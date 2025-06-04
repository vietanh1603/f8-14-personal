// render.js
import { DOMRefs } from './references.js';
import { prizeMap } from './const.js';

export function renderQuestion(currentQuestion) {
    DOMRefs.questionTitle.textContent = currentQuestion.question;

    ['a', 'b', 'c', 'd'].forEach(key => {
        const optionElement = DOMRefs.questionRef.querySelector(`.question-option[value="${key}"]`);
        optionElement.textContent = `${key.toUpperCase()}: ${currentQuestion[key]}`;
        optionElement.style.display = ''; // Hiển thị lại nếu đã bị ẩn
        optionElement.style.visibility = ''; // Hiển thị lại nếu đã bị ẩn
    });
}

export function resetOptionsBackground() {
    DOMRefs.questionRef.querySelectorAll('.question-option').forEach(option => {
        option.style.backgroundColor = '#fff';
    });
}

export function renderPrizeLevels(currentLevel) {
    DOMRefs.listBonus.innerHTML = '';

    const levels = Object.keys(prizeMap).sort((a, b) => b - a);

    levels.forEach(lvl => {
        const span = document.createElement('span');
        span.textContent = `Mức ${lvl}: ${prizeMap[lvl].toLocaleString('vi-VN')} VND`;

        if (parseInt(lvl) === currentLevel) {
            span.classList.add('current-level');
        } else if (parseInt(lvl) < currentLevel) {
            span.classList.add('passed-level');
        }

        DOMRefs.listBonus.appendChild(span);
    });
}

export function updateTimerDisplay(timeLeft) {
    DOMRefs.timeRef.textContent = timeLeft;
}

export function showGameOverModal(message, currentLevel, prize) {
    DOMRefs.modalMessage.textContent = message;
    DOMRefs.modalLevel.textContent = `Bạn đã đạt đến mức ${currentLevel}`;
    DOMRefs.modalPrize.textContent = `Tiền thưởng: ${prize.toLocaleString('vi-VN')} VND`;
    DOMRefs.gameOverModal.style.display = 'flex';
}

export function hideGameOverModal() {
    DOMRefs.gameOverModal.style.display = 'none';
}

export function showAudienceModal(percentages) {
    DOMRefs.audienceResults.innerHTML = '';

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

        DOMRefs.audienceResults.appendChild(optionDiv);
    });

    DOMRefs.audienceModal.style.display = 'flex';
}


export function hideAudienceModal() {
    DOMRefs.audienceModal.style.display = 'none';
}

export function disableLifelineButton(button) {
    button.disabled = true;
    button.style.backgroundColor = '#bdc3c7';
    button.textContent = 'Đã dùng';
}

export function resetLifelineButtonsUI() {
    DOMRefs.btn5050.disabled = false;
    DOMRefs.btn5050.style.backgroundColor = '#2ecc71';
    DOMRefs.btn5050.textContent = '50:50';

    DOMRefs.btnAudience.disabled = false;
    DOMRefs.btnAudience.style.backgroundColor = '#2ecc71';
    DOMRefs.btnAudience.textContent = 'Hỏi khán giả';

    DOMRefs.btnCall.disabled = false;
    DOMRefs.btnCall.style.backgroundColor = '#2ecc71';
    DOMRefs.btnCall.textContent = 'Gọi điện';

    DOMRefs.btnExpert.disabled = false;
    DOMRefs.btnExpert.style.backgroundColor = '#2ecc71';
    DOMRefs.btnExpert.textContent = 'Chuyên gia';
}

export function updateLifelineButtonsState(lifelines, currentLevel) {
    if (currentLevel >= 5) {
        DOMRefs.btn5050.disabled = !lifelines['5050'];
        DOMRefs.btnAudience.disabled = !lifelines['audience'];
        DOMRefs.btnCall.disabled = !lifelines['call'];
        DOMRefs.btnExpert.disabled = !lifelines['expert'];
    } else {
        // Vô hiệu hóa tất cả các quyền trợ giúp nếu cấp độ dưới 5
        DOMRefs.btn5050.disabled = true;
        DOMRefs.btnAudience.disabled = true;
        DOMRefs.btnCall.disabled = true;
        DOMRefs.btnExpert.disabled = true;
    }
}

export function highlightOption(optionValue, color) {
    const optionElement = DOMRefs.questionRef.querySelector(`.question-option[value="${optionValue}"]`);
    if (optionElement) {
        optionElement.style.backgroundColor = color;
    }
}