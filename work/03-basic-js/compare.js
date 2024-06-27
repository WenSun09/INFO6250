"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
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
