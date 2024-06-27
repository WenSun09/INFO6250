const wordFor = {};

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9]+$/);
    return isValid;
}

function isValidWord(word) {
    let isValid = true;
    isValid = isValid && word.match(/^[A-Za-z]*$/);
    return isValid;
}

function getUserWord(username) {
    return wordFor[username];
}

function addUserWord(username, word) {
    wordFor[username] = word;
}

module.exports = {
    isValidUsername,
    isValidWord,
    getUserWord,
    addUserWord,
};