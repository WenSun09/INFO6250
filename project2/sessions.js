const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = { username };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

function getAllUsers() {
    let uniqueUsers = [];
    for (const [sid, value] of Object.entries(sessions)) {
        if (!uniqueUsers.includes(value.username)) {
            uniqueUsers.push(value.username);
        }
    }
    return uniqueUsers;
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    getAllUsers,
};
