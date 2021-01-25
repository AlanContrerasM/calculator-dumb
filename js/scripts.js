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
    equals: () =>{
        //checks if someting is on the top display and last char is operation
    },
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
            if(bottomDisplay.textContent == ""){
                calculator.updateDisplay(button.target.textContent);
            }else if(/\-?\d*/.test(bottomDisplay.textContent)){
                calculator.operation(button.target.textContent);
            }
            break;
        case "sum":
        case "multiply":
        case "divide":
        case "remainder":
            //checks if we had already input something before, otherwise it doesnt do anything
            if(/\-?\d*/.test(bottomDisplay.textContent)){
                calculator.operation(button.target.textContent);
            }
            break;
        case "equals":


    }
}



