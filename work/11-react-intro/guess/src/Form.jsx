import './Form.css';

import { useState } from 'react';

function Form({ label, button, submitAction }) {
    const [input, setInput] = useState("");

    const handleChange = event => {
        setInput(event.target.value);
    };

    return (
        <form className="form" action="/form" method="POST">
            <label className="form__label">
                <span>{label}: </span>
                <input
                    name="input"
                    type="text"
                    onChange={handleChange}
                    value={input} />
            </label>
            <button
                className="form__button"
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    submitAction(input);
                    setInput("")
                }}>
                {button}
            </button>
        </form>
    );
}

export default Form;