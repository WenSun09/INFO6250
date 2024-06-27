import state from "./state";
import { checkLogin, login, logout, getMessages, sendMessage } from "./services";

function refresh() {
    if (state.isLogin) {
        console.log("refresh");
        getMessages(state);
    }
}

const mainEl = document.querySelector('.main');
mainEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('login')) {
        const usernameEl = document.querySelector('.username');
        const username = usernameEl.value;
        login(mainEl, state, username);
    }
    if (e.target.classList.contains('logout')) {
        logout(mainEl, state);
    }
    if (e.target.classList.contains('send-message')) {
        const textEl = document.querySelector('.text');
        const text = textEl.value;
        sendMessage(mainEl, state, text);
    }
})

checkLogin(mainEl, state);

setInterval(refresh, 5000);