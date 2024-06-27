function renderLoginForm(state) {
    return `
    <p class="login-error">${state.loginErrMessage}</p>
    <form action="/login" method="POST" class="login">
      <label class="form__label">
        <span>username:</span>
        <input name="username" class="username">
      </label>
      <button type="submit">Login</button>
    </form>`;
}

function renderWordView(state) {
    return `
    <p>Hello ${state.username}</p>
    <p>Stored word: ${state.storedWord}</p>
    <form action="/change" method="POST" class="change">
      <label class="form__label">
        <span>Change word:</span>
        <input name="word" class="word">
      </label>
      <button type="submit">Change</button>
    </form>
    <form class="logout" action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>`;
}

function render(mainEl, state) {
    if (!state.isLogin) {
        mainEl.innerHTML = renderLoginForm(state);
    } else {
        mainEl.innerHTML = renderWordView(state);
    }
}

export default render;