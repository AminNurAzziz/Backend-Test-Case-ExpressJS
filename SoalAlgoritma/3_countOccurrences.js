function countOccurrences(INPUT, QUERY) {
    const occurrenceDict = {};
    for (let word of INPUT) {
        if (occurrenceDict[word]) {
            occurrenceDict[word]++;
        } else {
            occurrenceDict[word] = 1;
        }
    }

    const result = [];
    for (let queryWord of QUERY) {
        result.push(occurrenceDict[queryWord] || 0);
    }

    return result;
}

// Contoh penggunaan algoritma 3:
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const OUTPUT = countOccurrences(INPUT, QUERY);
console.log('Kemunculan kata:', OUTPUT); // Output: [1, 0, 2]
