function compare(guess) {
    const wordArr = Array.from("recat");
    const guessArr = Array.from();

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

function checkGuess(guess) {
    let isValid = true;
    isValid = isValid && guess.trim();
    isValid = isValid && guess.match(/^[A-Za-z]+$/);
    isValid = isValid && guess.length === 5;
    if (!isValid) {
        return `${guess} was not a valid word`;
    }

    if (guess.toLowerCase() === "recat") {
        return `${guess} is the secret word!`;
    }
    const commonLetters = compare(guess);
    return `${guess} had ${commonLetters} letters in common`;
}

export default checkGuess;