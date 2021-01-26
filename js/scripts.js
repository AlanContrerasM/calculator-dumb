import * as calculatorOperations from './calculator.js'

const bottomDisplay = document.querySelector("#bottom");
const topDisplay = document.querySelector("#top");
const buttons = document.querySelectorAll(".item");


//function factory basically
let calculator = {
    updateDisplay: (text)=>{
        bottomDisplay.textContent += text;
    },
    clearDisplay: () => {
        bottomDisplay.textContent = "";
        topDisplay.textContent = "";
    },
    deleteOne: () => {

        //delete button pressed, get text from display loop through it and 
        //return new string without last char
        let newText = "";
        for(let i = 0; i < bottomDisplay.textContent.length-1; i++){
            newText += bottomDisplay.textContent[i];
        }
        bottomDisplay.textContent = newText;
    },
    operation: (text) =>{
        topDisplay.textContent = bottomDisplay.textContent + text;
        bottomDisplay.textContent = "";
    },
    operate: ()=>{

        //extract first number from the top display using a regex, without the operand at the end
        let firstNum = Number(topDisplay.textContent.match(/\-?[\d]*\.{0,1}[\d]+/)[0]);
    
        let secondNum = Number(bottomDisplay.textContent)
    
        let result = 0;
        //do a switch to see what operation we are calling
        switch(topDisplay.textContent.match(/[\+\*\/\%\-]/)[0]){
            case "*":
                result = calculatorOperations.multiply(firstNum,secondNum);
                break;
            case "/":
                result = calculatorOperations.divide(firstNum,secondNum);
                break;
            case "%":
                result = calculatorOperations.remainder(firstNum,secondNum);
                break;
            case "+":
                result = calculatorOperations.sum(firstNum,secondNum);
                break;
            case "-":
                result = calculatorOperations.substract(firstNum,secondNum);
                break;
    
        }
    
        //change the displays
        topDisplay.textContent += bottomDisplay.textContent;
        bottomDisplay.textContent = result;
    }
}



calculator.clearDisplay();


buttons.forEach((button)=>{
    button.addEventListener("click", (e)=> pressButton(e))
})


function pressButton(button){

    //depending on button pressed we do a different operation
    switch(button.target.id){
        case "one":
        case "two":
        case "three":
        case "four":
        case "five":
        case "six":
        case "seven":
        case "eight":
        case "nine":
        case "zero":
            calculator.updateDisplay(button.target.textContent);
            break;
        case "point":
            //can only be pressed once
            //test the content of the display for regex point
            if(!/\./.test(bottomDisplay.textContent)){
                calculator.updateDisplay(button.target.textContent);
            }
            break;
        case "ac":
            calculator.clearDisplay();
            break;
        case "delete":
            calculator.deleteOne();
                break;
        case "substract":
            
            //if bottom display empty, is a new number and can be negative
            if(/\-?[\d]*\.{0,1}[\d]+[\+\*\/\%\-]\-?[\d]*\.{0,1}[\d]+/.test(topDisplay.textContent)){
                calculator.operation(button.target.textContent);
            }else if(bottomDisplay.textContent == ""){
                calculator.updateDisplay(button.target.textContent);
            }else if(/\-?[\d]*\.{0,1}[\d]+/.test(bottomDisplay.textContent)
            && topDisplay.textContent == ""){
                //bottom has something and top is empty, proceed as operationm and wait for next
                //number
                calculator.operation(button.target.textContent);
            }else if(/\-?[\d]*\.{0,1}[\d]+/.test(bottomDisplay.textContent)
            && topDisplay.textContent != ""){
                //first calculate result
                //after that we update displays
                calculator.operate();
                calculator.operation(button.target.textContent);

            }
            break;
        case "sum":
        case "multiply":
        case "divide":
        case "remainder":
            //checks if we had already input something before, otherwise it doesnt do anything
            if(/\-?[\d]*\.{0,1}[\d]+[\+\*\/\%\-]\-?[\d]*\.{0,1}[\d]+/.test(topDisplay.textContent)){
                calculator.operation(button.target.textContent);
            }else if(/\-?[\d]*\.{0,1}[\d]+/.test(bottomDisplay.textContent)
            && topDisplay.textContent == ""){
                //bottom has something and top is empty, proceed as operationm and wait for next
                //number
                calculator.operation(button.target.textContent);
            }else if(/\-?[\d]*\.{0,1}[\d]+/.test(bottomDisplay.textContent)
            && topDisplay.textContent != ""){
                //first calculate result
                //after that we update displays
                calculator.operate();
                calculator.operation(button.target.textContent);

            }
            break;
        case "equals":
            //do nothing if topDisplay doesnt have correct syntax
            if(/\-?[\d]*\.{0,1}[\d]+[\+\*\/\%\-]/.test(topDisplay.textContent)){
                calculator.operate();
            }
            break;

    }
}

