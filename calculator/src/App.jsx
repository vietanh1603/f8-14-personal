import React, { useState } from 'react'
import './App.css'

function App() {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [result, setResult] = useState('Chưa có kết quả');

    const styles = {
        container: {
            padding: '30px',
            maxWidth: '400px',
            margin: '50px auto',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        title: {
            marginBottom: '20px',
            color: '#333',
        },
        input: {
            width: '80%',
            padding: '10px',
            margin: '8px 0',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
        },
        buttonGroup: {
            marginTop: '15px',
        },
        button: {
            padding: '10px 20px',
            margin: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '6px',
            transition: 'background-color 0.3s',
        },
        clearButton: {
            marginTop: '15px',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            backgroundColor: '#f44336',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
        },
        result: {
            marginTop: '20px',
            fontSize: '18px',
            color: '#222',
        },
    };

    const calculate = (operation) => {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        if (isNaN(num1) || isNaN(num2)) {
            setResult('Vui lòng nhập số hợp lệ');
            return;
        }

        let calculatedResult;
        switch (operation) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    setResult('Không thể chia cho 0');
                    return;
                }
                calculatedResult = num1 / num2;
                break;
            default:
                return;
        }

        setResult(calculatedResult.toString());
    };

    const clearAll = () => {
        setFirstNumber('');
        setSecondNumber('');
        setResult('Chưa có kết quả');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Máy Tính Cơ Bản</h2>

            <input
                type="number"
                placeholder="Số thứ nhất"
                style={styles.input}
                value={firstNumber}
                onChange={(e) => setFirstNumber(e.target.value)}
            />
            <input
                type="number"
                placeholder="Số thứ hai"
                style={styles.input}
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
            />

            <div style={styles.buttonGroup}>
                <button style={styles.button} onClick={() => calculate('+')}>+</button>
                <button style={styles.button} onClick={() => calculate('-')}>−</button>
                <button style={styles.button} onClick={() => calculate('*')}>×</button>
                <button style={styles.button} onClick={() => calculate('/')}>÷</button>
            </div>

            <div style={styles.result}>
                <strong>Kết quả:</strong> <span>{result}</span>
            </div>

            <button style={styles.clearButton} onClick={clearAll}>Clear</button>
        </div>
    );
}

export default App