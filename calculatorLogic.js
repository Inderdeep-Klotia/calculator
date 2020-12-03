/**
 * Author: Inderdeep Klotia
 * 
 * 
 * 
 * Current Version: V: 2.0 
 *  -   Added calculation logic (Order of operations)
 *  -   Styled the calulator. Added a Dark mode.
 *  -   Adding 3 space formatting
 * 
 * V 1.0: Key Edits
 *  -   Added functions that will be responsible for the operations on the calculator [addition, subtraction, division...].
 *  -   Begun adding button functionality for calculator functions: plusOrMinus, decimal, clearAll, and backspace
 */



// Global iterators. Iterates everytime the user evaluates their expression
let globalIterator = 0;
let sessionChecker = 0;
let toggleMode = 0;




/**
 * Addition Function:
 * 
 * @param {*} x x value to be added
 * @param {*} y y value to be added
 * @return      returns the sum
 */
 function add(x, y)
 {
    total = parseFloat(x) + parseFloat(y)


    if (total > 100000000000 || total < -100000000000)
    {
        total = total.toExponential(5);
        total = total.toString();
        return total;
    }

    total = total.toString();
    return +(Math.round(total + "e+4")  + "e-4");
 }




/**
 * Subtraction Function:
 * 
 * 
 * @param {*} x x value to be subtracted
 * @param {*} y y value to be subtracted
 * @return      returns the difference
 */
 function subtract(x, y)
 {
    total = parseFloat(x) - parseFloat(y)
    total = total.toString();
    return +(Math.round(total + "e+4")  + "e-4");
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
    
    total = x * y;

    if (total > 100000000000 || total < -100000000000)
    {
        total = total.toExponential(5);
        total = total.toString();
        return total;
    }

    total = total.toString();
    return +(Math.round(total + "e+4")  + "e-4");
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
    let total = x / y;
    total = total.toString();

    return +(Math.round(total + "e+4")  + "e-4");
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

    if (total > 100000000000 || total < -100000000000)
    {
        total = total.toExponential(5);
        total = total.toString();
        return total;
    }

    total = total.toString();
    return +(Math.round(total + "e+4")  + "e-4");
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

    let total = Math.pow(x, y);

    if (total > 100000000000 || total < -100000000000)
    {
        total = total.toExponential(5);
        total = total.toString();
        return total;
    }

    total = total.toString();
    return +(Math.round(total + "e+4")  + "e-4");
}




/**
 * Onload Function:
 * 
 * Instantly called when the window loads. Clears the HTML contents of the displaySection and the previouslyInput
 *      section. Random spaces fill these divs, need to be cleared prior to use.
 */
window.onload = () => {
    document.getElementById("displaySection").innerHTML = ``;
    document.getElementById("previouslyInput").innerHTML = ``;

    // The legend should not be toggled on load:
    var x = document.getElementById('calculatorLegend');
    x.style.display='none';

    // Start off in darkmode:
    toggleDarkLight();
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

    /*
        New session detection:
    */
    if (globalIterator > sessionChecker)
    {
        sessionChecker++;
        clearALL();
    }

    // Overflow detector. Will reduce font-size if detected.
    overflowDetection(x);


    /*
        Regex variable detects an operation
        tempLength houses the previouslyInput section length
    */
    let regexrOperationTest = /[-+*/^%!]/g;
    var tempLength = obtainSectionLength(2);


    /*
        checkForReturn is a variable that houses the return value of factorialDetection
        If the return value of factorialDetection is 0, also end this function here. 
    */
    var checkForReturn = 1;
    checkForReturn = factorialDetection(x, tempLength);
 
    if (checkForReturn == 0)
    {
        return 0;
    }


    // If an operation was just inputted, ensure that the user cannot double it up.
    if (obtainSectionLength(1) == 0 && String(x).match(regexrOperationTest))
    {
        return 0;
    }
    


    /*
        checkForReturn is a variable that houses return value of zeroDetection
        If the return value is 0, will also end function here.
    */
    checkForReturn = 1;
    checkForReturn = zeroDetection(x);
    if (checkForReturn == 0)
    {
        return 0;
    }



    /*
        If number of characters exceeds 15, will alert user an error that it exceeds maximum number of values allowed.
        Otherwise, if the request is legal, it will append the given value to the currently displayed numbers.
    */
    let regexrNumbers = /[0-9]/g;
    if (document.getElementById("displaySection").innerHTML.length >= 15 && String(x).match(regexrNumbers))
    {
        alert("The calculator cannot take more than 15 values.");
    }
    else
    {
        document.getElementById("displaySection").innerHTML += `${x}`;
    }

    /*
        Detects if an operation input has occured. If an operation has occured, the contents will be moved to the previouslyInput
        display section.
    */
   operationDetection();

}




// Deletes 1 string value when user clicks backspace:
/**
 * Backspace Display Function:
 * 
 * Deletes 1 user inputted value when user clicks backspace. Also calls the overflow detection function to resize if needed.
 */
function backspaceDisplay()
{

    // Call to detect if the font-size can be reverted back to standard if not at standard size.
    overflowDetection();

    let temp = document.getElementById("displaySection").innerHTML;
    temp = temp.slice(0, temp.length - 1);
    document.getElementById("displaySection").innerHTML = `${temp}`;
}




/**
 * Clear All Function:
 * 
 * When called, will clear all contents on both displays. 
 */
function clearALL()
{
    document.getElementById("displaySection").innerHTML = ``;
    document.getElementById("previouslyInput").innerHTML = ``;
}




/**
 * Clear Display Function:
 * 
 * Clears only the user display when called.
 */
function clearDisplay()
{
    document.getElementById("displaySection").innerHTML = ``;
}




/**
 * Positive or Negative Function:
 * 
 * Makes the current display value positive or negative.
 */
function makePositiveOrNegative()
{
    /*
        Obtain the display section length    
        Ensure that the value of zero cannot be turned into a negative value:
    */
    tempLength = obtainSectionLength(1);
    if (document.getElementById("displaySection").innerHTML.charAt(0) == '0' && tempLength == 1)
    {
        return 0;
    }

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
/**
 * Add Decimal Function:
 * 
 * Adds a decimal to the current display value.
 * Will also ensure that only 1 decimal can be displayed on the screen at any given time.
 */
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





/**
 * Overflow Detection Function:
 * 
 * Detects if the current font size and number of values displayed will cause an overflow. If an overflow will be caused
 *      the function will reduce the font size.
 */
function overflowDetection(x)
{
    
    if (document.getElementById("displaySection").innerHTML.length >= 11)
    {
        document.documentElement.style.setProperty('--displaySectionFontSize', '1.8em');
    }
    /* 
        If the user backspaces and reduces the number of values being displayed. Set the font size
        back to standard.
    */
    else if (document.getElementById("displaySection").innerHTML.length < 11)
    {
        document.documentElement.style.setProperty('--displaySectionFontSize', '2.5em');
    }

}




/**
 * Zero Detection Function:
 * 
 * Test to see if there already is a 0 present on the calculator as the first value. If so, don't let the user create anymore.
 * Also detects if an operation has been input after a 0 input. 
 * 
 * @param {*} x variable houses the user input request
 * @return {0}  Returns 0 if the request is another 0 and 0 is the only value currently displayed.
 */
function zeroDetection(x)
{
    // Obtain the display section length
    tempLength = obtainSectionLength(1);
    // Tests if an operation has been input
    let regexrOperationTest = /[-+*/^%!]/g;

    if (document.getElementById("displaySection").innerHTML.charAt(0) == '0' && tempLength == 1)
    {
        
        // Make sure that if a numerical value came through (and the value wasn't a 0) input it & remove 0.
        var regxrNumbers = /[1-9]/g;
        if (String(x).match(regxrNumbers))
        {
            
            document.getElementById("displaySection").innerHTML = `${x}`;
        }
        
        // If the user input is an operation, it will ensure that the calculator detects the operation successfully and inputs it.
        if (String(x).match(regexrOperationTest))
        {
            document.getElementById("displaySection").innerHTML += `${x}`;
            operationDetection();

        }
        
        // Else if another 0 has been input break the function and do not allow input.
        return 0;
    }
}





/**
 * Factorial Detection Function:
 * 
 * The function will only run through its logic if it detects that the user has input a factorial previously.
 *      Otherwise, the entire function will return nothing and the updateDisplay function will run as normal.
 * 
 * @param {*} x             Variable x represents current user input.
 * @param {*} tempLength    tempLength represents previouslyInput display section character length.
 * @return {0}              The only value it returns if it returns at all. Will tell the updateDisplay function to stop running
 *                                  if returned.
 */
function factorialDetection(x, tempLength)
{
    // If a factorial input has been detected by the user, ensure that it is treated as a normal numerical value.
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
}




/**
 * Operation Detection Function:
 * 
 * Function will check if an operation has been input by the user. If an operation input is detected it will go through a series
 *      of checks to ensure that it is a valid request. If valid, it will take the entire display value and the operation and 
 *      move it to the previouslyInput section.
 */
function operationDetection()
{
    /*
        currentDisplay section length
        previouslyInput display section length
    */
    let inputLength = obtainSectionLength(1);
    let previouslyInputLength = obtainSectionLength(2);


    // let temp house the previously input values.
    let temp = document.getElementById("previouslyInput").innerHTML;


    // If the previous value was a factorial, do not let the user successfully enter numerical value
    let regexrNumbers = /[0-9]/g;

    if (document.getElementById("previouslyInput").innerHTML.charAt(previouslyInputLength - 1) == '!'
            && document.getElementById("displaySection").innerHTML.charAt(0).match(regexrNumbers) )
    {
        alert('Please input an operation after the factorial');
        let temp = document.getElementById("displaySection").innerHTML.slice(0, inputLength - 1);
        document.getElementById("displaySection").innerHTML = temp;
        return 0;
    }



    // variable houses operaton test
    let regexrOperationTest = /[-+*/^%!]/g;

    // If all values are normal, move the current display value and the operation above.
    if(document.getElementById("displaySection").innerHTML.charAt(inputLength - 1).match(regexrOperationTest))
    {
        temp += " " + document.getElementById("displaySection").innerHTML;
        clearDisplay();
        document.getElementById("previouslyInput").innerHTML = temp;
    }
}




/**
 * Determine Output:
 * 
 * The user has clicked enter, determine the output that should be displayed on the caluclator.
 */
function determineOutput()
{
    /*
        New session detection:
    */
   if (globalIterator > sessionChecker)
   {
       sessionChecker++;
       clearALL();
       return 0;
   }
    // variable houses operaton test
    let regexrOperationTest = /[-+*/^%]/g;

    // Variables to house lengths
    let displaySectionLength = obtainSectionLength(1);
    let previouslyInputLength = obtainSectionLength(2);



    /*
        Input functions dealt with here:
        -   User should not be able to utilize enter if there are no previously input values
        -   Calculator needs to send the remaining displaySection values to the previouslyInput display section 
                once enter has been clicked
        -   If the previouslyInput final value is an operation, the user should not be able to click enter and
                call the operation function. 
    */
   

    /*
        If there are remaining values send it to the appropriate screen.
        If the user as not entered a number-operation pair yet, and only a numeric value has been input, do not let the user utilize
            the enter button.
    */
    if (displaySectionLength != 0)
    {
        if (previouslyInputLength == 0)
        {
            return 0;
        }

        
        // Set temp to both the previouslyInput values and current displaysection value.
        var temp = document.getElementById("previouslyInput").innerHTML + " " + 
            document.getElementById("displaySection").innerHTML;
        clearDisplay();
        
        // set previouslyInput to correct display:
        document.getElementById("previouslyInput").innerHTML = temp;

    }
    // If display is empty and the previously input value houses a operation provide the user with an error
    else if (displaySectionLength == 0 && document.getElementById("previouslyInput").innerHTML
                .charAt(previouslyInputLength - 1)
                .match(regexrOperationTest))
    {
        alert('Error: must input a numerical value to calculate');
        return 0;
    }



    /*
        Input values into an array and remove additional spacing. 
        Call calculation function and send the updated array.
    */
    let x = document.getElementById("previouslyInput").innerHTML;
    let nonFilteredCalculationArr = x.split(" ");
    
    let filteredCalculationArr = nonFilteredCalculationArr.filter((checkForSpace) =>
    checkForSpace != "");

    calculation(filteredCalculationArr);

}




/**
 * Computes on the Calculation Array for Factorials:
 * 
 * @param {*} calculationArr Takes in the primary calculation array that houses all the values.
 * @return {calculationArr}  Returns the array once factorial calculations have been completed.
 */
function computeOnArrFactorial(calculationArr)
{
    let regexrFactorialFind = /[!]/g;
    calculationArr.forEach(function(currentValue, index)
    {
        /*
            Checking for factorials:
            If there are any operate on them as they are in the array itself.
        */
        if (currentValue.match(regexrFactorialFind))
        {
            let factorialValue = 0;
            // Prior to operating remove the !
            currentValue = currentValue.slice(0, currentValue.length - 1);
            
            // Send the value to the factorial operation. Set factorialValue to the factored value.
            factorialValue = factorial(currentValue);

            /* 
                Update the current array to house only the factored value.
                Need to change type back to string for the functions to operate properly.
            */
            factorialValue = factorialValue.toString()

            calculationArr[index] = factorialValue;

        }


    }) // End of checking for factorials
    
    return calculationArr;
}




/**
 * Computes on the Calculation Array for Exponents:
 * 
 * @param {*} calculationArr Takes in the primary calculation array that houses all the values.
 * @return {calculationArr}  Returns the array once exponential calculations have been completed.
 */
function computeOnArrExponent(calculationArr)
{
    /*
        Checking for Exponents. 
    */
   let regexrExponentFind = /[\^]/g;
   calculationArr.forEach(function(currentValue,index)
   {

       if (currentValue.match(regexrExponentFind))
       {
            let exponentValue = 0;
            // Get the two values to be evaluated:
            let x = calculationArr[index - 1];
            let y = calculationArr[index + 1];

            // Determine the final value
            exponentValue = exponent(x, y);

            /*
               Remove the operated exponent and replace it with the final value.
               Remove the two values that have already been utilized in the operation.
               Change to string.
            */
            exponentValue = exponentValue.toString();
            calculationArr[index] = exponentValue;  

            calculationArr.splice(index - 1, 1);
            calculationArr.splice(index, 1);

            // Call the function again to ensure that all the values are accurately accounted for.
            computeOnArrExponent(calculationArr);
       }
    }) // End of checking for exponents

    return calculationArr;
}




/**
 * Computes on the Calculation Array for Division & Multiplication:
 *  
 * @param {*} calculationArr Takes in the primary calculation array that houses all the values.
 * @return {calculationArr}  Returns the array once division and multiplcation calculations have been completed.
 */
function computeOnArrDivisionMultiplcation(calculationArr)
{
    /*
        Checking for Multiplcation & Division
    */
    let regexrDivisionFind = /[\/]/g;
    let regexrMultiplicationFind = /[*]/g;
    calculationArr.forEach(function(currentValue, index)
    {
       if (currentValue.match(regexrDivisionFind))
       {
           let dividedValue = 0;

           // The two values to be evaluated:
           let x = calculationArr[index - 1];
           let y = calculationArr[index + 1];

           // Final value
           dividedValue = divide(x, y);

           /*
               Remove the division symbol and replace it with the final value.
               Remove the two values that have already been utilized in the operation.
               Change to string
           */
          dividedValue = dividedValue.toString();
          calculationArr[index] = dividedValue;  

          calculationArr.splice(index - 1, 1);
          calculationArr.splice(index, 1);            
        
        // Call the function again to ensure that all the values are accurately accounted for.
        computeOnArrDivisionMultiplcation(calculationArr);
       }

       if (currentValue.match(regexrMultiplicationFind))
       {
           let multipliedValue = 0;
           
           // The two values to be evaluated:
           let x = calculationArr[index - 1];
           let y = calculationArr[index + 1];

           // Final value
           multipliedValue = multiply(x, y);

           /*
               Remove the multiplication symbol and replace it with the final value.
               Remove the two values that have already been utilized in the operation.
               Change to string
           */
           multipliedValue = multipliedValue.toString();
           calculationArr[index] = multipliedValue;  

           calculationArr.splice(index - 1, 1);
           calculationArr.splice(index, 1);
            
           
           // Call the function again to ensure that all the values are accurately accounted for.
           computeOnArrDivisionMultiplcation(calculationArr);

         }

    }) // End of checking for Multiplication & Division

   return calculationArr;
}




/**
 * Computes on the Calculation Array for Addition & Subtraction:
 * 
 * @param {*} calculationArr Takes in the primary calculation array that houses all the values.
 * @return {calculationArr}  Returns the array once division and multiplcation calculations have been completed.
 */
function computeOnArrAdditionSubtraction(calculationArr)
{
    /*
        Checking for Addition & Subtraction
    */
   let regexrAdditionFind = /^\+{1}$/g;
   let regexrSubtractionFind = /^-{1}$/g;

   calculationArr.forEach(function(currentValue, index)
   {
      if (currentValue.match(regexrAdditionFind))
      {
          let summedValue = 0;

          // The two values to be evaluated:
          let x = calculationArr[index - 1];
          let y = calculationArr[index + 1];

          // Final value
          summedValue = add(x, y);

          /*
              Remove the addition symbol and replace it with the final value.
              Remove the two values that have already been utilized in the operation.
              Change to string
          */
         summedValue = summedValue.toString();
         calculationArr[index] = summedValue;  

         calculationArr.splice(index - 1, 1);
         calculationArr.splice(index, 1);            
       
       // Call the function again to ensure that all the values are accurately accounted for.
       computeOnArrAdditionSubtraction(calculationArr);
      }

      if (currentValue.match(regexrSubtractionFind))
      {
          let subtractedValue = 0;

          // The two values to be evaluated:
          let x = calculationArr[index - 1];
          let y = calculationArr[index + 1];

          // Final value
          subtractedValue = subtract(x, y);

          /*
              Remove the addition symbol and replace it with the final value.
              Remove the two values that have already been utilized in the operation.
              Change to string
          */
         subtractedValue = subtractedValue.toString();
         calculationArr[index] = subtractedValue;  

         calculationArr.splice(index - 1, 1);
         calculationArr.splice(index, 1);            
       
       // Call the function again to ensure that all the values are accurately accounted for.
       computeOnArrAdditionSubtraction(calculationArr);
      }

    }) // End of checking for addition or subtraction

    return calculationArr;
}



/**
 * Calculation Function:
 * 
 * Goes through the array in the order of operations. Calls the appropriate function based on what operation should be
 *      evaluated at the given moment.
 * Displays the final value on the screen once all calculations have been completed.
 * 
 * @param {*} calculationArr Takes in the current calculationArray that houses all of the values and operations.
 */
function calculation(calculationArr)
{

    /*
        Looping through the entire array and solving utilizing the order of operations:
    */

    // Compute on the array for factorials. Update the array (return value)
    calculationArr = computeOnArrFactorial(calculationArr);

    // Compute on the array for exponents. Update the array 
    calculationArr = computeOnArrExponent(calculationArr);


    // Compute on the array for division and multiplcation. Update the array 
    calculationArr = computeOnArrDivisionMultiplcation(calculationArr);


    // Compute on the array for addition and subtraction. Update the array
    calculationArr = computeOnArrAdditionSubtraction(calculationArr);



    /*
        Adds comma formatting for easy reading
        Display the final value on the display
    */
    let regexrCommaInputDecimal = /(\d)(?=(\d{3})+(?!\d)+\.)/g;
    let regexrCommaInput = /(\d)(?=(\d{3})+(?!\d))/g;
    if (calculationArr[0].match(/[e]/g)== null)
    {
        if(calculationArr[0].match(/[.]/g))
        {
            calculationArr[0] = calculationArr[0].replace(regexrCommaInputDecimal, "$1,");
        }
        else
        {
            calculationArr[0] = calculationArr[0].replace(regexrCommaInput, "$1,");
        }
        
    }
    document.getElementById("displaySection").innerHTML = calculationArr[0];
    globalIterator++;

    // Overflow detector. Will reduce font-size if detected.
    overflowDetection();

    
}




/**
 * Keyboard Press Event Listener:
 * 
 * If a press has been detected it will call the keyPressInput function.
 */
window.addEventListener('keydown', keyPressInput);




/**
 * Key Press Input Function:
 * 
 * It will determine whether a valid keyboard input request has been detected. If so, It will click the appropriate button.
 * 
 * @param {*} event 
 */
function keyPressInput(event)
{
    /*
        Using if else statements to ensure that inputs such as shift and * as an example do not multi input.
        event.key utilization for operations is more appropriate than event.code. as event.code only determines a single input.
    */
    let x = event.code;
    if ((event.shiftKey && event.key === '*') || x == 'NumpadMultiply')
    {
        document.getElementById('*').click();
    }
    else if (event.key === '=' || x == 'NumpadEnter' || x == 'Enter')
    {
        document.getElementById('=').click()
    }
    else if((event.shiftKey && event.key === '+') || x == 'NumpadAdd')
    {
        document.getElementById('+').click();
    }
    else if (event.key === '-' || x == 'NumpadSubtract')
    {
        document.getElementById('-').click();
    }
    else if (x == 'NumpadDivide' || x == 'Slash')
    {
        document.getElementById('/').click();
    }
    else if (event.shiftKey && event.key === '!')
    {
        document.getElementById('!').click();
    }
    else if (event.shiftKey && event.key == '^')
    {
        document.getElementById('^').click();
    }
    else if (x == 'Backspace')
    {
        document.getElementById('backspace').click();
    }
    else if(x == 'Escape')
    {
        document.getElementById('AC').click();
    }
    else if (x == 'NumpadDecimal' || x == 'Period')
    {
        document.getElementById('.').click();

    }


    else if (x == 'Digit0' || x == 'Numpad0')
    {
        document.getElementById('0').click();
    }

    else if (x == 'Digit1' || x == 'Numpad1')
    {
        document.getElementById('1').click();
    }
    
    else if (x == 'Numpad2' || x == 'Digit2')
    {
        document.getElementById('2').click();
    }

    else if (x == 'Numpad3' || x == 'Digit3')
    {
        document.getElementById('3').click();
    }

    else if (x == 'Numpad4' || x == 'Digit4')
    {
        document.getElementById('4').click();
    }

    else if (x == 'Numpad5' || x == 'Digit5')
    {
        document.getElementById('5').click();
    }

    else if (x == 'Numpad6' || x == 'Digit6')
    {
        document.getElementById('6').click();
    }

    else if (x == 'Numpad7' || x == 'Digit7')
    {
        document.getElementById('7').click();
    }

    else if (x == 'Numpad8' || x == 'Digit8')
    {
        document.getElementById('8').click();
    }

    else if (x == 'Numpad9' || x == 'Digit9')
    {
        document.getElementById('9').click();

    }    


}




/**
 * Toggle Table Function:
 * 
 * Checks if the Legend has been toggled. If it hasn't it will toggle the table. The next click will close it.
 */
function toggleTable()
{
  var x = document.getElementById('calculatorLegend');
  if (x.style.display == "none")
  {
      x.style.display = 'block';
      document.getElementById('toggleLegendButton').innerHTML = '&#60;--';
  }
  else
  {
      x.style.display='none';
      document.getElementById('toggleLegendButton').innerHTML = 'Legend';
  }
}




/**
 * Toggle Light or Dark Mode Function:
 * 
 * Toggles light mode or dark mode based on an interator. If the iterator is even, dark mode is activated.
 *      If the iterator is odd, light mode is activated.
 */
function toggleDarkLight()
{
    
    if (toggleMode % 2 == 0)
    {
        document.body.style.backgroundColor = "rgb(34, 34, 34)";
        document.getElementById('title').style.color = "rgb(228, 150, 24)";
        document.getElementById('toggleDarkLight').innerHTML = "Light Mode";
    }
    else
    {
        document.body.style.backgroundColor = "rgb(250, 250, 250)";
        document.getElementById('title').style.color = "black";
        document.getElementById('toggleDarkLight').innerHTML = "Dark Mode";

    }
    
    toggleMode++;

}