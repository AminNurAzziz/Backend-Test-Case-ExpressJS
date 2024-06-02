function longestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

// Contoh penggunaan algoritma 2:
const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log("Kalimat:", sentence);
console.log("Kata terpanjang:", longestWord(sentence)); // Output: mengerjakan
