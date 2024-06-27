import { useState } from 'react';

import From from './Form';
import isValidUsername from './user';

function Login({ setUsername }) {
    const [errMsg, setErrMsg] = useState('');

    const submitAction = input => {
        const checkRes = isValidUsername(input);
        if (checkRes !== '') {
            setErrMsg(checkRes);
        } else {
            setUsername(input);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <p className="login__errmsg">{errMsg}</p>
            <From
                label="Username"
                button="login"
                submitAction={submitAction}>
            </From>
        </>
    );
}

export default Login;