const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButtons = document.querySelector('[data-equal]');
const deleteButtons = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-reset]');
const previusOperandTextElement = document.querySelector('[data-previus-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previusOperandTextElement, currentOperandTextElement) {
        this.previusOperandTextElement = previusOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    formatDisplay(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1];

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = ''

        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0,})
        }
        if(decimal != null){
            return `${integerDisplay}.${decimal}`
        }
        else{
            return integerDisplay
        }
    }  

    calculate() {
        let result;
        const previusOperandFloat = parseFloat(this.previusOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previusOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case '+':
                result = previusOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previusOperandFloat - currentOperandFloat;
                break;
            case '/':
                result = previusOperandFloat / currentOperandFloat;
                break;
            case 'X':
                result = previusOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previusOperand = "";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if (this.previusOperand !==  '') {
            this.calculate();
        }
        this.operation = operation;

        this.previusOperand = this.currentOperand;
        this.currentOperand = '';
    }

    addNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.previusOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previusOperandTextElement.innerText = `${this.formatDisplay(this.previusOperand)} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplay(this.currentOperand);
    }
}

const calculator = new Calculator(previusOperandTextElement, currentOperandTextElement);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', function () {
        calculator.addNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', function () {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

allClear.addEventListener('click' , function() {
    calculator.clear();
    calculator.updateDisplay();
});
equalButtons.addEventListener('click' , function() {
    calculator.calculate();
    calculator.updateDisplay();
})
deleteButtons.addEventListener('click' , function() {
    calculator.delete();
    calculator.updateDisplay();
})