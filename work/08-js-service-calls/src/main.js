import state from "./state";
import { checkLogin, login, logout, changeWord } from "./services";

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
    if (e.target.classList.contains('change')) {
        const wordEl = document.querySelector('.word');
        const word = wordEl.value;
        changeWord(mainEl, state, word);
    }
})

checkLogin(mainEl, state);