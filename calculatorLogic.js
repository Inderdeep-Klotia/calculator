/**
 * Author: Inderdeep Klotia
 * 
 * 
 * 
 * Current Version: V: 1.0 
 * 
 * 
 * V 1.0: Key Edits
 * 
 */



 // Addition function
 function add(x, y)
 {

    return x + y;
 }



// Subtraction function
 function subtract(x, y)
 {
     
    return x - y;
 }



 // Multiplcation function
 function multiply(x, y)
 {

    // If any of the values equate to 0, return 0.
    if (x == 0 || y == 0)
    {
        return 0;
    }
    

    return x * y;
 }



 // Division function
 function divide(x, y)
 {

    // If any of the given variables are equal to 0.
    if (x == 0 || y == 0)
    {
        return 'inf';
    }

    return x / y;
 }



 // Factorial function
function factorial(x)
{
    // let total be equal to the inital value of x.
    let total = x;

    // If the factorial is a negative number, make the value of x positive so iteration value is positive.
    if (x < 0)
    {
        x *= -1;
    }

    // let i the iterator be 1 less than the initial value
    let i = x - 1;

    // iterate through every value above 0.
    while(i > 0)
    {
        total *= i;
        i--;
    }

    return total;
}



// Exponential function
function exponent(x, y)
{
    // Using built-in exponential function:

    return Math.pow(x, y);
}




// Operate function. Calls the appropriate operation based on user input:
function operate(operation, x, y)
{
    // switch statements will determine which function to call.
    switch (operation)
    {
        case add:
            {
                return add(x, y);
            }
        break;

        case subtract:
            {
                return subtract(x, y);
            }
        break;

        case multiply:
            {
                return multiply(x, y);
            }
        break;

        case divide:
            {
                return divide(x, y);
            }
        break;

        case factorial:
            {
                return factorial(x);
            }
        break;

        case exponent:
            {
                return exponent(x, y);
            }
        break;
    } // End of switch statement

} // End of operate function



// When the page loads clear the innerHTML of the display (random spaces need to be cleared prior to use):
window.onload = () => {
    document.getElementById("displaySection").innerHTML = ``;
};


// Update the display text everytime a calculator button that isn't an operation is clicked
function updateDisplay(x)
{

    // The += will append the given value to the current value.
    document.getElementById("displaySection").innerHTML += `${x}`;
}



// Deletes 1 string value when user clicks backspace:
function backspaceDisplay()
{
    let temp = document.getElementById("displaySection").innerHTML;
    temp = temp.slice(0, temp.length - 1);
    document.getElementById("displaySection").innerHTML = `${temp}`;
}



// Will clear display once called.
function clearDisplay()
{
    document.getElementById("displaySection").innerHTML = ``;
}



// Will make current displayed value positive or negative.
function makePositiveOrNegative()
{
    
    if (document.getElementById("displaySection").innerHTML.charAt(0) == '-')
    {
        // Create a temp variable. 
        let temp = document.getElementById("displaySection").innerHTML;

        // Remove the negative sign on the display.
        temp = temp.slice(1);

        // Update the inner display to be displayed without the negative sign.
        document.getElementById("displaySection").innerHTML = temp;
    }
    else
    {
        let temp = "-";
        // If the value was positive, set the display value to be negative.
        document.getElementById("displaySection").innerHTML = temp.concat(document.getElementById("displaySection").innerHTML);
    }

}



// Add a decimal to the display value:
function addDecimal()
{
    let regexrTest = /\./g;
    if (document.getElementById("displaySection").innerHTML.match(regexrTest) == '.')
    {
        // Do nothing
    }
    else
    {
        // Add the decimal since it doesn't yet exist:
        document.getElementById("displaySection").innerHTML 
        = document.getElementById("displaySection").innerHTML + ".";
    }
}