function diagonalDifference(matrix) {
    let n = matrix.length;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][n - i - 1];
    }

    return {
        primaryDiagonalSum,
        secondaryDiagonalSum,
        difference: Math.abs(primaryDiagonalSum - secondaryDiagonalSum)
    };
}

// Contoh penggunaan algoritma 4:
const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

const { primaryDiagonalSum, secondaryDiagonalSum, difference: result } = diagonalDifference(matrix);

const primaryDiagonalElements = [];
const secondaryDiagonalElements = [];

for (let i = 0; i < matrix.length; i++) {
    primaryDiagonalElements.push(matrix[i][i]);
    secondaryDiagonalElements.push(matrix[i][matrix.length - i - 1]);
}

console.log('Diagonal 1:', ...primaryDiagonalElements + '=' + primaryDiagonalSum); // Output: 1 5 9
console.log('Diagonal 2:', ...secondaryDiagonalElements + '=' + secondaryDiagonalSum); // Output: 0 5 7
console.log('Hasil pengurangan diagonal ' + primaryDiagonalSum + '-' + secondaryDiagonalSum + ' = ' + result); // Output: 3
