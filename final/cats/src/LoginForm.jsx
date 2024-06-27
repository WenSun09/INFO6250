import { useState } from 'react';

import { MESSAGES } from './constants';
import './LoginForm.css';

function LoginForm({ error, onLogin }) {
    const [username, setUsername] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        setUsername('');
        if (username) {
            onLogin(username);
        }
    }

    const message = MESSAGES[error] || MESSAGES.default;

    return (
        <div className="login">
            <form className="login__form" action="#/login" onSubmit={onSubmit}>
                <div className="login__error">
                    {error && message}
                </div>
                <label>
                    <span>Username: </span>
                    <input className="login__username" value={username} onChange={onChange} />
                </label>
                <button className="login__button" type="submit">Login</button>
            </form>
        </div>
    );

}

export default LoginForm;