import './Cats.css';
import Modal from './Modal';

import { useState } from 'react';

function Cats({ username, storedCats, onAdoptCat, onRegisterCat, error }) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const list = storedCats.catsList.map(cat => {
        return (
            <div className="card" key={cat.name}>
                <h2 className="card__title">{cat.name}</h2>
                <img
                    src={cat.image}
                    alt={cat.name}
                    className="card__pic" />
                <p className="card__content" >Breed: {cat.breed}</p>
                <p className="card__content" >Registrant: {cat.registrant}</p>
                {cat.adopter !== "" && <p className="card__content" >Adopter: {cat.adopter}</p>}
                {cat.adopter !== "" ?
                    <button className="card__button button-adopted" disabled>Adopted</button>
                    :
                    <button
                        className="card__button"
                        onClick={() => { onAdoptCat(cat.index) }}
                    >Adopt</button>}
            </div>
        );
    });
    return (
        <div className="cats">
            {username === "Admin" &&
                <div className="cats__ctrl">
                    <button className="cats__register" onClick={() => { setIsOpen(true); }}>register cat</button>
                </div>
            }
            <div className="cards">
                {list}
            </div>
            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                onRegisterCat={onRegisterCat}
                error={error}
            />
        </div>
    );
}

export default Cats;