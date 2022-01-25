function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // Divice by zero
    if (b === 0) return 0;

    return a / b;
}

function operate(operator, a, b) {
    console.log("op:", operator(a, b));
    return operator(a, b);
}


const calculator = {
    memory: 0,
    currentValue: null,
    operator: null,
    displayValue: 0,
    chained: false,
    setOperator(op) {
        // Handle chaining of operators without using equals
        if(this.chained) this.calculate();
        this.chained = true;

        // Update operator
        this.operator = op;
        
        this.newOperand = true;

        this.memory = this.displayValue;
        this.currentValue = null;

    },
    calculate() {
        if (!this.currentValue) this.currentValue = this.displayValue;

        if (this.currentValue === 0 && this.operator === divide) return 'ERROR: DIVISION BY ZERO';
        if (!this.operator) return 'ERROR: NO OPERATOR';

        this.displayValue = Number(this.displayValue);
        // console.log("mem:", this.memory, "displayValue:", this.displayValue);
        this.displayValue = operate(this.operator, this.memory, this.currentValue);
        this.memory = this.displayValue;

        this.chained = false;
        
        return this.displayValue;
    },

    clear() {
        this.displayValue = 0;
        this.operator = null;
        this.memory = 0;
        this.newOperand = false;
        this.chained = false;
        this.currentValue = null;
    }
}; 

// Number buttons
const numberButtons = document.querySelectorAll("#numbers button");
numberButtons.forEach(button => button.addEventListener('click', e => {
    value = e.target.textContent;

    if (calculator.newOperand) {
        calculator.displayValue = 0;
        calculator.newOperand = false;
    }
    // Logic for dot
    if (value === '.') {
        if (!String(calculator.displayValue).includes('.')) calculator.displayValue = String(calculator.displayValue) + String(value);
    }
    else {
        calculator.displayValue = Number(String(calculator.displayValue) + String(value));
    }

    updateDisplay(calculator.displayValue);
}));

// Operator buttons
const operatorButtons = document.querySelectorAll("#operators .op");
operatorButtons.forEach(button => button.addEventListener('click', e => {
    op = e.target.id;
    switch (op) {
        case 'add':
            calculator.setOperator(add);
            break;
        case 'subtract':
            calculator.setOperator(subtract);
            break;
        case 'divide':
            calculator.setOperator(divide);
            break;
        case 'multiply':
            calculator.setOperator(multiply);
            break;  
    }
    updateDisplay(calculator.displayValue);
}));

// Calculate button
const calculateButton = document.querySelector("#operators > button.calc");
calculateButton.addEventListener('click', e => {
    updateDisplay(calculator.calculate());
});

// Clear
const clearButton = document.querySelector("#utils > div > button:nth-child(1)");
clearButton.addEventListener('click', e => {
    calculator.clear();
    updateDisplay(calculator.displayValue);
})

// Flip positive negative button
const flipButton = document.querySelector("#utils > div > button:nth-child(2)");
flipButton.addEventListener('click', e => {
    calculator.displayValue *= -1;
    updateDisplay(calculator.displayValue);
})

// Percent button
const percentButton = document.querySelector("#utils > div > button:nth-child(3)");
percentButton.addEventListener('click', e => {
    calculator.displayValue /= 100;
    updateDisplay(calculator.displayValue);
})

function updateDisplay(value) {
    display = document.querySelector('#display');
    display.textContent = value;
}