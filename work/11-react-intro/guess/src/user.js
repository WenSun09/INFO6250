function isValidCharater(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isValidUser(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username !== "dog";
    return isValid;
}

function isValidUsername(username) {
    if (!isValidCharater(username)) {
        return "Invalid username. Username must only contain letters, numbers and underline.";
    }
    if (!isValidUser(username)) {
        return "Invalid user";
    }
    return "";
}

export default isValidUsername;