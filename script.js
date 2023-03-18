class Calculator{

    constructor(previousOpTE, currentOpTE){
        //initializes the object
        this.previousOpTE = previousOpTE
        this.currentOpTE = currentOpTE
        this.clear()
    }

    clear(){
        //clears all data
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }

    delete(){
        //deletes the last number from the current operator
        this.currentOp = this.currentOp.toString().slice(0,-1)
    }

    append(number){
        //makes sure not to repeat '.'
        if(number == '.' && this.currentOp.includes('.')) return 
        //adds a new number to the current operand
        this.currentOp = this.currentOp.toString() + number.toString()
    }

    update(){
        //updates the current op text and the previous operand text
        this.currentOpTE.innerText = this.currentOp
        if(this.operation != null){
            this.previousOpTE.innerText = `${this.previousOp} ${this.operation}`
        }else{
            this.previousOpTE.innerText = ''
        }
    }

    chooseOp(operation){
        //updates selected operation 
        if(this.currentOp == '') return
        //if theres another operand compute the answer first
        if(this.previousOp != ''){
            this.compute()
        }
        //update operands
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''
    }

    compute(){
        //makes calculations
        let calc
        const previous = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        //checks if something is invalid
        if(isNaN(previous) || isNaN(current)) return
        //makes calculations depending on the operation
        switch(this.operation){
            case'+':
                calc = previous + current
                break

            case'-':
                calc = previous - current
                break

            case'÷':
                calc = previous / current
                break

            case'*':
                calc = previous  *current
                break

            default:
                return
        }
        //updates results
        this.currentOp = calc
        //resets operation & previous operand
        this.operation = undefined
        this.previousOp = ''
    }
     
    
}

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const currentOpTE = document.querySelector('[data-current-op]')
const previousOpTE = document.querySelector('[data-previous-op]')

//new calculator object
const calculator = new Calculator(previousOpTE,currentOpTE)

//---event listeners---

//Add number
numButtons.forEach(button =>{
    button.addEventListener('click',() => {
        calculator.append(button.innerText)
        calculator.update()
    })
})

//Add operation
opButtons.forEach(button =>{
    button.addEventListener('click',() => {
        calculator.chooseOp(button.innerText)
        calculator.update()
    })
})

//Calculate
equalButton.addEventListener('click',button => {
    calculator.compute()
    calculator.update()
})

//Clear
acButton.addEventListener('click',button => {
    calculator.clear()
    calculator.update()
})

//Delete number
deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.update()
})
