import { useState } from 'react';

function WordForm({ onUpdateWord }) {
    const [word, setWord] = useState('');

    function onChange(e) {
        setWord(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        setWord('');
        if (word) {
            onUpdateWord(word);
        }
    }

    return (
        <div className="word">
            <form className="word__form" action="#/word" onSubmit={onSubmit}>
                <label>
                    <span>Word: </span>
                    <input className="word__input" value={word} onChange={onChange} />
                </label>
                <button className="word__button" type="submit">Change</button>
            </form>
        </div>
    );

}

export default WordForm;
