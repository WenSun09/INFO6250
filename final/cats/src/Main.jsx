import Home from './Home';
import Cats from './Cats';
import Records from './Records';
import Loading from './Loading';
import LoginForm from './LoginForm';

import {
    LOGIN_STATUS,
} from './constants';

function Main({ page, setPage, error, onLogin, loginStatus, storedCats, onAdoptCat, onRegisterCat, username }) {
    return (
        <main className="main" id="main">
            {(loginStatus === LOGIN_STATUS.PENDING) && <Loading className="login__waiting">Loading user...</Loading>}
            {(loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) && <LoginForm error={error} onLogin={onLogin} />}
            {(loginStatus === LOGIN_STATUS.IS_LOGGED_IN && page === 'Home') && <Home setPage={setPage} />}
            {(loginStatus === LOGIN_STATUS.IS_LOGGED_IN && page === 'Adoptable cats') && <Cats username={username} storedCats={storedCats} onAdoptCat={onAdoptCat} onRegisterCat={onRegisterCat} error={error} />}
            {(loginStatus === LOGIN_STATUS.IS_LOGGED_IN && page === 'Adoption Records') && <Records storedCats={storedCats} />}
        </main>
    );
}

export default Main;