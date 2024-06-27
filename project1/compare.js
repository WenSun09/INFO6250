"use strict";
module.exports = compare;

function compare(word, guess) {
    const wordArr = Array.from(word.toLowerCase());
    const guessArr = Array.from(guess.toLowerCase());

    let wordObj = {}
    for (let i in wordArr) {
        if (wordObj.hasOwnProperty(wordArr[i])) {
            wordObj[wordArr[i]]++
        } else {
            wordObj[wordArr[i]] = 1
        }
    }

    let ans = 0
    for (let i in guessArr) {
        if (wordObj[guessArr[i]] > 0) {
            ans += 1
            wordObj[guessArr[i]]--
        }
    }
    return ans;
}
