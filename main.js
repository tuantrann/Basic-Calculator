const text_field = document.getElementById("text-field");
const buttons = document.querySelectorAll("button");

const stored_values = {
  previousNumber : '',
  currentNumber : '',
  previousOperator: '',
  currentOperator : '',
  result : '',
}
function sendInformation(e){
  if (text_field.innerHTML.toString().length  >= 22) return
  var current = document.getElementsByClassName("active"); //Check if an operator is colored
  if (current.length >0){
    current[0].className = current[0].className.replace(" active", "");
  }
  if (e.target.classList.contains("number")){
    if(stored_values.currentOperator != ""){

        stored_values.previousNumber = stored_values.currentNumber;
        console.log(stored_values.previousNumber);
        stored_values.previousOperator = stored_values.currentOperator;
        stored_values.currentOperator = "";
        text_field.innerHTML = "";
    }

    if (text_field.innerHTML.toString().includes(".") && e.target.innerHTML.toString() == ".") return
    text_field.innerHTML += e.target.innerHTML.toString();
  }
  else if(e.target.classList.contains("reset")){
    reset();
  }
  else if (e.target.classList.contains("delete")){
    let deletepart = text_field.innerHTML.toString().split("").slice(0, -1).join("");
    text_field.innerHTML = deletepart;
  }
  else if (e.target.classList.contains("percentage")){

    let result = formatResult(+text_field.innerHTML/100);
    text_field.innerHTML = result;
  }
  else if (e.target.classList.contains("sign")){
    text_field.innerHTML = parseFloat(text_field.innerHTML*-1);
  }
  else if (e.target.classList.contains("operator")){
    operators(e);
  }
  else if (e.target.classList.contains("equal")){
    equal(e);
  }
}
function operators(e){
  if(stored_values.previousOperator != ""){
    result(e);
  }
  e.target.className += " active";
  stored_values.currentNumber = text_field.innerHTML;
  stored_values.currentOperator = e.target.innerHTML;
}
function operate(operator, a, b){
  switch (operator) {
        case '+': return add (+a, +b);
        case '-': return substract (+a, +b);
        case 'x': return multiply (+a, +b);
        case '/': return divide (+a, +b);
    };
}
function reset(){
  text_field.innerHTML = '';
  stored_values.previousNumber = "";
  stored_values.currentNumber = '';
  stored_values.currentOperator = '';
  stored_values.previousOperator = '';
  stored_values.result = '';
}
function equal(e){
  result();
  stored_values.previousNumber = "";
  stored_values.previousOperator = "";
}
function result(e){
  stored_values.currentNumber = text_field.innerHTML;
  if (stored_values.previousNumber == 0 && stored_values.previousOperator == "/"){
    text_field.innerHTML = "ERROR";
    return;
  }
  console.log(stored_values.previousOperator, stored_values.previousNumber, stored_values.currentNumber);
  stored_values.result = operate(stored_values.previousOperator, stored_values.previousNumber, stored_values.currentNumber);
  text_field.innerHTML = formatResult(+stored_values.result);
  console.log(stored_values.result);
  stored_values.previousNumber = stored_values.result;

}

function add (a, b) {return a + b;}
function substract (a, b) {return a - b;}
function multiply (a, b) {return a * b;}
function divide (a, b) {return a / b;}
function formatResult (result) {
     // Too large decimales are rounded
     result = +result.toFixed(12);

     // Too large value are diplayed in scientific notation
     if (result.toString().length > 10) {
         result = result.toExponential(6);
     }
     return result;
}
buttons.forEach(button => button.addEventListener("click", sendInformation));
