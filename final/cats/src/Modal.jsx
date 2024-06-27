import './Modal.css';

import { useState } from 'react';

function Modal({ isOpen, closeModal, onRegisterCat, error }) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(error);

    const [breed, setBreed] = useState("");
    const [textBreed, setTextBreed] = useState("");

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleBreedChange = event => {
        setBreed(event.target.value);
        setTextBreed("");
    };

    const handleTextBreedChange = event => {
        setTextBreed(event.target.value);
    };

    const submitAction = event => {
        event.preventDefault();
        let checkRes = true;

        if (name.trim() === '') {
            setNameError("Name is required!");
            checkRes = false;
        } else if (!name.trim().match(/^[A-Za-z]+$/)) {
            setNameError("Please enter a valid (only letters) cat\'s name.");
            checkRes = false;
        } else {
            setNameError("");
        }
        let breedRes = breed;
        if (breedRes === "") {
            breedRes = textBreed;
        }
        if (checkRes) {
            onRegisterCat(name, breedRes);
            closeTheModal();
        }
    };

    const closeTheModal = () => {
        setName("");
        setNameError("");
        setBreed("");
        setTextBreed("");
        closeModal();
    };

    return (
        <dialog className="modal" open={isOpen}>
            <form className="form" action="/form" method="POST">
                <label className="form__label">
                    <span>Cat's name<span className="required">*</span>: </span>
                    <input
                        name="name"
                        type="text"
                        onChange={handleNameChange}
                        value={name} />
                    <span className="form__error">{nameError}</span>
                </label>
                <label className="form__label">
                    <span>Cat's breed: </span>
                    <select
                        id="breed"
                        name="breed"
                        onChange={handleBreedChange}
                        value={breed}>
                        <option value="">other</option>
                        <option value="Domestic Short Hair">Domestic Short Hair</option>
                        <option value="Tabby">Tabby</option>
                        <option value="Russian Blue">Russian Blue</option>
                        <option value="Tuxedo">Tuxedo</option>
                        <option value="Tortoiseshell">Tortoiseshell</option>
                        <option value="Calico">Calico</option>
                    </select>
                </label>
                {breed === "" && <label className="form__label">
                    <span>Input cat's breed: </span>
                    <input
                        name="textBreed"
                        type="text"
                        onChange={handleTextBreedChange}
                        value={textBreed} />
                </label>}
                <div className="form__button">
                    <button type='submit' onClick={submitAction}>Register</button>
                    <button type='button' onClick={closeTheModal}>Cancel</button>
                </div>
            </form>
        </dialog>
    );
}

export default Modal;