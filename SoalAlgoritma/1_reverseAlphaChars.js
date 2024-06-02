function reverseAlphaChars(inputString) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let reversedString = '';

    for (let i = inputString.length - 1; i >= 0; i--) {
        if (alphabet.includes(inputString[i])) {
            reversedString += inputString[i];
        }
    }

    let reversedIndex = 0;
    let result = '';
    for (let i = 0; i < inputString.length; i++) {
        if (alphabet.includes(inputString[i])) {
            result += reversedString[reversedIndex];
            reversedIndex++;
        } else {
            result += inputString[i];
        }
    }

    return result;
}

// Contoh penggunaan algoritma 1
let inputString = "NEGIE1";
let outputString = reverseAlphaChars(inputString);
console.log('input: ' + inputString); // NEGIE1
console.log('output: ' + outputString); // EIGEN1
