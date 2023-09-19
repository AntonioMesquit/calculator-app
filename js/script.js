const valueButtons = document.querySelectorAll(".valueNumber");
const valuesOperators = document.querySelectorAll(".valueOperetor");
const numberResult = document.querySelector(".number");
const reset = document.querySelector(".reset");
const buttons = document.querySelectorAll("button");
const current = document.querySelector(".current");
const previus = document.querySelector(".previus");

class Calculator {
    constructor(current, previus) {
        this.current = current;
        this.previus = previus;
        this.valor = ""
    }

    addNumber(digit) {
        if (digit === "." && this.valor.includes(".")) {
            return;
        }
        this.valor += digit;
        this.updateScreen();
    }


    operations(operation) {
        let operationvalue
        const previusValue = parseFloat(this.previus.innerText);
        const currentValue = parseFloat(this.current.innerText);

        switch (operation) {
            case "+":

                operationvalue = previusValue + currentValue;
                this.updateScreen(operationvalue, operation, currentValue, previusValue)

                break


            default:
                return;
        }



    }
    updateScreen(operationvalue = null,
        operation = null,
        currentValue = null,
        previusValue = null) {

        if (operationvalue === null) {
            this.previus.innerText = this.valor;
        }
        else {
            if (previusValue === 0) {
                operationvalue = currentValue;
            }
            this.current.innerText = `${operationvalue} ${operation}`
            this.previus.innerText = ""

        }
    }
}
const calc = new Calculator(previus, current)
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if (+value >= 0 || value === ".") {
            calc.addNumber(value);
        }
        else {
            calc.operations(value);
        }
    })
})