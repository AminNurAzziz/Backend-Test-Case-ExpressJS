function reverseAlphaChars(inputString) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    alphabet += alphabet.toLowerCase();

    let chars = inputString.split('');
    let alphaIndices = chars.reduce((indices, char, i) => {
        if (alphabet.includes(char)) indices.push(i);
        return indices;
    }, []);

    let alphaChars = [];
    for (let i = chars.length - 1; i >= 0; i--) {
        if (alphabet.includes(chars[i])) {
            alphaChars.push(chars[i]);
        }
    }

    alphaIndices.forEach((index, i) => {
        chars[index] = alphaChars[i];
    });

    return chars.join('');
}

// Contoh penggunaan algoritma 1:
let inputString = "NEGIE1";
let outputString = reverseAlphaChars(inputString);
console.log('input: ' + inputString); // NEGIE1
console.log('output: ' + outputString); // EIGEN1
