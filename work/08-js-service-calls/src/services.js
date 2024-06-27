import render from "./render"

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
        getWord(mainEl, state);
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
        getWord(mainEl, state);
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

function getWord(mainEl, state) {
  return fetch('/api/word/', {
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
      state.storedWord = data.storedWord;
      render(mainEl, state);
    });
}

function changeWord(mainEl, state, word) {
  return fetch('/api/word/', {
    method: 'PUT',
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ word }),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    }).then(data => {
      state.username = data.username;
      state.storedWord = data.storedWord;
      render(mainEl, state);
    });
}

export { checkLogin, login, logout, getWord, changeWord }