import { useState } from 'react';

import From from './Form';
import checkGuess from './compare';

function Game({ username, setUsername }) {
    const [guess, setGuess] = useState('');

    const submitAction = input => {
        setGuess(checkGuess(input));
    };

    return (
        <>
            <h1>Welcome to guess game, {username}</h1>
            <p>Result: {guess}</p>
            <From
                label="Guess word"
                button="guess"
                submitAction={submitAction}>
            </From>
            <button
                className="logout__button"
                type="button"
                onClick={() => { setUsername("") }}>
                logout
            </button>
        </>
    );
}

export default Game;