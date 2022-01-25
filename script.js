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
    operator: null,
    displayValue: 0,
    newOperand: false,
    newInput: false,
    chained: false,
    setOperator(op) {
        //this.displayValue = Number(this.displayValue);
        this.operator = op;
        
        this.newOperand = true;
        this.newInput = true;

        if (this.chained) this.calculate();
        this.chained = true;

        this.memory = this.displayValue;

        // debug info
        console.log("mem:", this.memory);
        console.log("dispV:", this.displayValue);
    },
    calculate() {
        
        let temp = this.displayValue;
        this.newOperand = true;

        this.displayValue = Number(this.displayValue);
        console.log("mem:", this.memory, "displayValue:", this.displayValue);
        this.displayValue = operate(this.operator, this.memory, this.displayValue);

        if (this.newInput) {    
            this.memory = temp;
            this.newInput = false;
        }

        this.chained = false;
        
        return this.displayValue;
    },

    clear() {
        this.displayValue = 0;
        this.operator = null;
        this.memory = 0;
        this.newOperand = false;
        this.newInput = false;
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

    console.log(calculator.displayValue);

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

const clearButton = document.querySelector("#utils > div > button:nth-child(1)");
clearButton.addEventListener('click', e => {
    calculator.clear();
    updateDisplay(calculator.displayValue);
})

function updateDisplay(value) {
    display = document.querySelector('#display');
    display.textContent = value;
}