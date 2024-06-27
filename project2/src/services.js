import { render, renderUsersAndMessages } from "./render";

function checkLogin(mainEl, state) {
    return fetch('/api/session/', {
        method: 'GET',
        credentials: "same-origin"
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    state.isLogin = false;
                    render(mainEl, state);
                } else {
                    return response.json().then(err => Promise.reject(err));
                }
            } else {
                state.isLogin = true;
                render(mainEl, state);
                getMessages(state);
            }
        });
}

function login(mainEl, state, username) {
    return fetch('/api/session/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                state.isLogin = false;
                if (response.status === 400) {
                    state.loginErrMessage = "Invalid username. Username must only contain letters, numbers and underline.";
                } else if (response.status === 403) {
                    state.loginErrMessage = "Wrong password. Please re-enter your password.";
                } else {
                    return response.json().then(err => Promise.reject(err));
                }
                render(mainEl, state);
            } else {
                state.isLogin = true;
                state.loginErrMessage = "";
                render(mainEl, state);
                getMessages(state);
            }
        });
}

function logout(mainEl, state) {
    return fetch('/api/session/', {
        method: 'DELETE',
        credentials: "same-origin"
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            state.isLogin = false;
            render(mainEl, state);
        });
}

function getMessages(state) {
    return fetch('/api/message/', {
        method: 'GET',
        credentials: "same-origin"
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        }).then(data => {
            state.username = data.username;
            state.users = data.usersList;
            state.messages = data.messagesList;
            renderUsersAndMessages(state);
        });
}

function sendMessage(mainEl, state, text) {
    return fetch('/api/message/', {
        method: 'PUT',
        credentials: "same-origin",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        }).then(data => {
            state.username = data.username;
            state.users = data.usersList;
            state.messages = data.messagesList;
            render(mainEl, state)
            renderUsersAndMessages(state);
        });
}

export { checkLogin, login, logout, getMessages, sendMessage }
