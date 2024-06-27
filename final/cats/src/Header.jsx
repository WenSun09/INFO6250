import GlobalNav from './GlobalNav';
import './Header.css';

import { useState } from 'react';

import { LOGIN_STATUS } from './constants';

function Header({ setPage, username, loginStatus, onLogout }) {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <header className="header">
            <a href="#main" className="header__skip">Skip to content</a>
            <img
                src="placekitten2.jpg"
                className="header__logo"
                alt="Logo"
            />
            <h1 className="header__title">
                Cats Adoption Online
            </h1>
            {(loginStatus === LOGIN_STATUS.IS_LOGGED_IN) && <div
                className="header__profile"
                tabIndex="0"
                onClick={() => { setShowProfile(!showProfile) }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Space") {
                        setShowProfile(!showProfile)
                    }
                }}>
                <i className="gg-profile"></i>
                {showProfile &&
                    <div className="profile">
                        <p className='profile__name'>{username}</p>
                        <button className='profile__logout' onClick={onLogout}>Logout</button>
                    </div>}
            </div>}
            <div
                className="header__gg"
                tabIndex="0"
                onClick={() => { setShowSubMenu(!showSubMenu) }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Space") {
                        setShowSubMenu(!showSubMenu)
                    }
                }}>
                <i className="gg-menu"></i>
                {showSubMenu && <GlobalNav className="sub-menu" setPage={setPage} />}
            </div>
            <GlobalNav className="header__nav" setPage={setPage} />
        </header>
    );
}

export default Header;