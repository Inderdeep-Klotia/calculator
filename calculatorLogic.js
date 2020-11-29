/**
 * Author: Inderdeep Klotia
 * 
 * 
 * 
 * Current Version: V: 2.0 
 * 
 * 
 * V 1.0: Key Edits
 *  -   Added functions that will be responsible for the operations on the calculator [addition, subtraction, division...].
 *  -   Begun adding button functionality for calculator functions such as plusOrMinus, decimal, clearAll, and backspace
 */


 
/**
 * Addition Function:
 * 
 * @param {*} x x value to be added
 * @param {*} y y value to be added
 * @return      returns the sum
 */
 function add(x, y)
 {

    return x + y;
 }



/**
 * Subtraction Function:
 * 
 * @param {*} x x value to be subtracted
 * @param {*} y y value to be subtracted
 * @return      returns the difference
 */
 function subtract(x, y)
 {
     
    return x - y;
 }



 /**
  * Multiplication Function:
  * 
  * @param {*} x x value to be multiplied
  * @param {*} y y value to be multiplied
  * @returns     returns the product
  */
 function multiply(x, y)
 {

    // If any of the values equate to 0, return 0.
    if (x == 0 || y == 0)
    {
        return 0;
    }
    

    return x * y;
 }



 /**
  * Division Function:
  * 
  * @param {*} x x value is the dividend
  * @param {*} y y value is the divisor
  * @return      returns the quotient
  */
 function divide(x, y)
 {

    // If any of the given variables are equal to 0.
    if (x == 0 || y == 0)
    {
        return 'inf';
    }

    return x / y;
 }



 /**
  * Factorial Function:
  * 
  * @param {*} x Starting value for the factorial
  * @returns     will return the product of all the positive integers less than or equal to x
  */
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



/**
 * Exponential Function
 * 
 * @param {*} x The base variable 
 * @param {*} y The variable that will be taken to the power of x
 * @return      Returns the base to the power of y
 */
function exponent(x, y)
{
    // Using built-in JavaScript exponential function:

    return Math.pow(x, y);
}



/**
 * Operation Function:
 * 
 * Utilizes a switch statement and calls the apporpriate operation based on the given request
 * 
 * @param {*} operation Used to determine what operation should be utilized
 * @param {*} x         The x value of the operation
 * @param {*} y         The y value of the operation
 */
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



/**
 * Onload Function:
 * 
 * Instantly called when the window loads. Clears the HTML contents of the displaySection and the previouslyInput
 *      section. Random spaces fill these divs, need to be cleared prior to use.
 */
window.onload = () => {
    document.getElementById("displaySection").innerHTML = ``;
    document.getElementById("previouslyInput").innerHTML = ``;
};



/**
 * Section Length Function:
 * 
 * Returns the length of the display section or the previously input user section.
 * 
 * @param {*} region Variable states where the user has requested the section length
 * @return           Returns the length
 */
function obtainSectionLength(region)
{

    var length = 0;

    // If region == 1 then give the user the display section length. If 2 then the previously Input section length.
    if (region == 1)
    {
        length = document.getElementById("displaySection").innerHTML.length;
    }
    else 
    {
        length = document.getElementById("previouslyInput").innerHTML.length
    }

    return length;
}


/**
 * Update Display Function:
 * 
 * Responsible for updating the display. Utilizes other functions to assist in determining whether a user input
 *      is valid or invalid. 
 * 
 * @param {*} x Variable x is the current user input request. Includes both operations and numerical values.
 */
function updateDisplay(x)
{

    // Adding an overflow detector. Will reduce font-size to display on screen if detected.
    overflowDetection();


    // Regex variable detects an operation
    let regexrOperationTest = /[-+*/^%!]/g;
    // Variable houses the previouslyInput section length
    var tempLength = obtainSectionLength(2);

    // If the previous value was a factorial, treat it like a number and let the user input an operation as normal
    if(document.getElementById("previouslyInput").innerHTML.charAt(tempLength - 1) == '!')
    {

        // If the input is another factorial give the user an error
        if (x == '!')
        {
            alert("Please enter a non-factorial operation");
            return 0;
        }
        /*
            Otherwise allow the user to set the displaySection to the value they've requested. If the value is an integer
            and not an operation, it will be detected in the operationDetection function and stopped.
        */
        document.getElementById("displaySection").innerHTML += `${x}`;
        operationDetection();
        // End the function. The operation will be appended to the previouslyInput display value in Operation Detection.
        return 0;
    }



    // If an operation was just inputted, ensure that the user cannot double it up.
    if (document.getElementById("displaySection").innerHTML.length == 0 && String(x).match(regexrOperationTest))
    {
        return 0;
    }
    




    /*
        Test to see if there already is a 0 present on the calculator as the first value.
        If so, don't let the user create anymore.
    */
    var tempLength = document.getElementById("displaySection").innerHTML.length;
    if (document.getElementById("displaySection").innerHTML.charAt(0) == '0' && tempLength == 1)
    {
        // Make sure that if a numerical value came through (and the value wasn't a 0) input it & remove 0.
        var regxrNumbers = /[1-9]/g;
        if (String(x).match(regxrNumbers))
        {
            
            document.getElementById("displaySection").innerHTML = `${x}`;
        }
        return 0;
        
    }

    // If the number of characters exceeds 15, tell the user this is the maximum number of values allowed:
    if (document.getElementById("displaySection").innerHTML.length >= 15)
    {
        alert("The calculator cannot take more than 15 values.");
    }
    else
    {
        // The += will append the given value to the current value.
        document.getElementById("displaySection").innerHTML += `${x}`;
    }


        // Detects if an operation input has occured. Will move contents above.
        operationDetection();

}



// Deletes 1 string value when user clicks backspace:
function backspaceDisplay()
{

    // Call to detect if the font-size can be reverted back to standard if not at standard size.
    overflowDetection();

    let temp = document.getElementById("displaySection").innerHTML;
    temp = temp.slice(0, temp.length - 1);
    document.getElementById("displaySection").innerHTML = `${temp}`;
}



// Will clear both the display and the previously input values:
function clearALL()
{
    document.getElementById("displaySection").innerHTML = ``;
    document.getElementById("previouslyInput").innerHTML = ``;
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



// Overflow detection. If it exists it will lower the font size until it no longer exists.
function overflowDetection()
{
    if (document.getElementById("displaySection").innerHTML.length >= 12)
    {
        document.documentElement.style.setProperty('--displaySectionFontSize', '1.8em');
    }

    /* 
        If the user backspaces and reduces the number of values being displayed. Set the font size
        back to standard.
    */
    if (document.getElementById("displaySection").innerHTML.length < 12)
    {
        document.documentElement.style.setProperty('--displaySectionFontSize', '2.5em');
    }

}



// Function will check for operation. If found, the entire value is send to the upper text region:
function operationDetection()
{
    // current display section length
    let inputLength = document.getElementById("displaySection").innerHTML.length;

    // let temp house the previously input values.
    let temp = document.getElementById("previouslyInput").innerHTML;

    // previously input section length
    let previouslyInputLength = document.getElementById("previouslyInput").innerHTML.length;


    // If the previous value was a factorial, do not let the user successfully enter numerical value
    let regexrNumbers = /[0-9]/g;
    var tempLength = document.getElementById("displaySection").innerHTML.length;

    if (document.getElementById("previouslyInput").innerHTML.charAt(previouslyInputLength - 1) == '!'
            && document.getElementById("displaySection").innerHTML.charAt(0).match(regexrNumbers) )
    {
        alert('Please input an operation after the factorial');
        let temp = document.getElementById("displaySection").innerHTML.slice(0, tempLength - 1);
        document.getElementById("displaySection").innerHTML = temp;
        return 0;
    }



    // To check if an operation has occured:
    let regexrOperationTest = /[-+*/^%!]/g;

    if(document.getElementById("displaySection").innerHTML.charAt(inputLength - 1).match(regexrOperationTest))
    {
        temp += " " + document.getElementById("displaySection").innerHTML;
        clearDisplay();
        document.getElementById("previouslyInput").innerHTML = temp;
    }
}



// Enter function. Determine the value of the user inputs:
function determineOutput()
{

    // To check if an operation has occured:
    let regexrOperationTest = /[-+*/^%]/g;

    // Variable to house previouslyInput Length
    let previouslyInputLength = document.getElementById("previouslyInput").innerHTML.length;

    let displaySectionLength = document.getElementById("displaySection").innerHTML.length;

    /*
        Potential input errors are dealth with here:
        -   User should not be able to utilize enter if there are no previously input values
        -   Calculator needs to send the remaining displaySection values to the previouslyInput display section 
                once enter has been clicked
        -   If the previouslyInput final value is an operation, the user should not be able to click enter and
                call the operation function. 
        -   User will get an error alert if they enter a numerical value if the previous value was a factorial.
    */


        

    // If there are remaining displaySection values, send it to previouslyInput 
    if (displaySectionLength != 0)
    {
        if (previouslyInputLength == 0)
        {
            // If the user has not entered an operation yet, do not let the user use the enter button.
            return 0;
        }

        
        // Set temp to both the previouslyInput values and current displaysection value.
        var temp = document.getElementById("previouslyInput").innerHTML + " " + 
            document.getElementById("displaySection").innerHTML;
        clearDisplay();
        
        // set previouslyInput to correct display:
        document.getElementById("previouslyInput").innerHTML = temp;

    }
    // If display is empty and the previously input value houses a operation
    else if (displaySectionLength == 0 && document.getElementById("previouslyInput").innerHTML
                .charAt(previouslyInputLength - 1)
                .match(regexrOperationTest))
    {
        alert('Error: must input a numerical value to calculate');
        return 0;
    }



    /*
        Input values into an array and remove additional spacing. 
        Call call calculation function and send the updated array.
    */
    let x = document.getElementById("previouslyInput").innerHTML;
    let operationArray = x.split(" ");
    console.log(operationArray);
}


