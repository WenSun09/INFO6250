import './App.css';

import { useState, useEffect } from 'react';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import {
  fetchSession,
  fetchLogout,
  fetchLogin,
  fetchCats,
  fetchAdoptCat,
  fetchRegisterCat,
} from './services';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  const [page, setPage] = useState('Home');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [storedCats, setStoredCats] = useState({});

  function onLogin(username) {
    fetchLogin(username)
      .then(fetchedCats => {
        setError('');
        setUsername(username);
        setStoredCats(fetchedCats.catsInfo);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onAdoptCat(index) {
    fetchAdoptCat(index)
      .then(fetchedCats => {
        setStoredCats(fetchedCats.catsInfo);
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  function onRegisterCat(name, breed) {
    fetchRegisterCat(name, breed)
      .then(fetchedCats => {
        setStoredCats(fetchedCats.catsInfo);
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchCats();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then(fetchedCats => {
        setStoredCats(fetchedCats.catsInfo);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });;
  }

  useEffect(
    () => {
      checkForSession();
      const interval = setInterval(() => {
        checkForSession();
      }, 5000);
      return () => clearInterval(interval);
    },
    []
  );

  return (
    <div className="app">
      <Header setPage={setPage} username={username} loginStatus={loginStatus} onLogout={onLogout} />
      <Main page={page} setPage={setPage} error={error} onLogin={onLogin} loginStatus={loginStatus} storedCats={storedCats} onAdoptCat={onAdoptCat} onRegisterCat={onRegisterCat} username={username} />
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;
