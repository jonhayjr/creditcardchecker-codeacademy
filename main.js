// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
const validateCred = array => {
    //Reverse array order since we need to iterate array from left to right
    const reversedArray = array.reverse();
    
    //Create array to store new values
    let processedDigits = [];
    
    //Loop through reversed array
    reversedArray.forEach((element, index) => {
        //Since we are only doubling every other value check if index + 1 (need to add one since it's a zero-base index) value is even.
        if ((index + 1) % 2 === 0) {
            //Double number
            let doubledNumber = element * 2;     
            //If doubled number is greater than 9, subtract 9.
            if (doubledNumber > 9) {
                doubledNumber-=9;
            }
            //Push doubledNumber to new array
            processedDigits.push(doubledNumber);
        //For all other indexes, just push original value to new array
        } else {
            processedDigits.push(element);
        }
    })
    
    //Reverse array order
    processedDigits = processedDigits.reverse();
    
    //Sum of all numbers in array using reduce
    const arraySum = processedDigits.reduce((accumulator, item) =>{
        return accumulator += item;
    }, 0)
    
    
    //If sum divided by 10 has remainder of 0, then it's true.  Otherwise, it's false.
    return arraySum % 10 === 0;
 
}

//Number from sample logic
//const testArray = [4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8];
//console.log(validateCred(testArray));

//Function to loop through nested array and create new array of invalid values
const findInvalidCards = arr => {
    //Array to store invalid numbers
    const invalidCards = [];
    
    //Loop through each array.  Use validateCred function to check if number is valid.  If it's invalid, push array to invalidCards array
    arr.forEach(subArray => {
        const isValid = validateCred(subArray);
        if (!isValid) {
            invalidCards.push(subArray);
        }
    });
    return invalidCards;
}

//console.log(findInvalidCards(batch));

//Function to find invalid credit card companies
const idInvalidCardCompanies = arr => {
    //Create array to store unique, invalid card companies
    const invalidCardCompanies = [];
    
    //Loop through each array of numbers.  Based on first digit, push credit card company to invalidCardCompanies array
    arr.forEach(element => {
        const firstDigit = element[0];
        
        //Check if first digit of card numbers is array is from specific CC company.  Only push number to invalidCardCompanies if it doesn't already exist 
        
        if (firstDigit === 3 && invalidCardCompanies.indexOf('Amex (American Express)') < 0) {
            invalidCardCompanies.push('Amex (American Express)');
        } else if (firstDigit === 4 && invalidCardCompanies.indexOf('Visa') < 0) {
            invalidCardCompanies.push('Visa');
        } else if (firstDigit === 5 && invalidCardCompanies.indexOf('Mastercard') < 0) {
            invalidCardCompanies.push('Mastercard');
        } else if (firstDigit === 6 && invalidCardCompanies.indexOf('Discover') < 0) {
            invalidCardCompanies.push('Discover');
        } else {
            console.log('Company Not Found');
        }
    })
    return invalidCardCompanies;
}


/*const invalidCardsTest = findInvalidCards(batch);
console.log(idInvalidCardCompanies(invalidCardsTest));*/

//Function that converts string to array
const convertStringToNumberArray = str => {
    //String without commas and spaces
    const stringsOnly = str.replaceAll(' ', '').replaceAll(',', '').replaceAll(', ', '');
    
    //Check if string only contains numbers.  If it doesn't, log error to console.  Otherwise, return array of numbers.
    if (isNaN(Number(stringsOnly))) {
        return 'String must only contain numbers!';
    } 
    
    return stringsOnly.split('').map(Number);
    
}
/*const sampleCCString = '4,5,3,9,6,7,7,9,0,8,0,1,6,8,0,8';
console.log(convertStringToNumberArray(sampleCCString));*/