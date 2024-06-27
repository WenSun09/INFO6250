function renderLoginForm(state) {
  return `
    <div class="main-login">
    <form action="/login" method="POST" class="login">
      <label class="login-label">
        <span class="login-span">username</span>
        <input name="username" class="username">
        <span class="empty-span"></span>
        <span class="username-error">${state.loginErrMessage}</span>
      </label>
      <button type="submit" class="login-button">Login</button>
    </form>
    </div>`;
}

function renderMessages(state) {
  return `
    <div class="main-messages">
      <div class="users-messages">
      </div>
      <div class="input-message">
        <form action="/api/message" method="POST" class="send-message">
          <label class="form__label">
            <span class="message-user"></span>
            <input name="text" class="text">
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    <form class="logout" action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>`;
}

function renderUsersList(state) {
  return `<div class="users"><p>Current Users:</p>` + Object.values(state.users).map(user => `
    <p class="user">${user}</p>
    `).join('') + `</div>`;
}

function renderMessagesList(state) {
  return `<div class="messages">` + Object.values(state.messages).map(message => `
    <p class="message"><span class="message-username">${message.username}:</span> ${message.text}</p>
    `).join('') + `</div>`;
}

function renderUsersAndMessages(state) {
  const messageUserEl = document.querySelector('.message-user');
  messageUserEl.innerHTML = state.username;

  const usersMessagesEl = document.querySelector('.users-messages');
  usersMessagesEl.innerHTML = renderUsersList(state) + renderMessagesList(state);
  const usersEl = document.querySelector('.users');
  usersEl.scrollTop = usersEl.scrollHeight;
  const messagesEl = document.querySelector('.messages');
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function render(mainEl, state) {
  if (!state.isLogin) {
    mainEl.innerHTML = renderLoginForm(state);
  } else {
    mainEl.innerHTML = renderMessages(state);
  }
}

export { render, renderUsersAndMessages };