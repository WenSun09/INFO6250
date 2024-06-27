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
  fetchWord,
  fetchUpdateWord,
} from './services';

import Loading from './Loading';
import LoginForm from './LoginForm';
import Controls from './Controls';
import Word from './Word';
import WordForm from './WordForm';
import Status from './Status';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isWordPending, setIsWordPending] = useState(false);
  const [storedWord, setStoredWord] = useState('');

  function onLogin(username) {
    setIsWordPending(true);
    fetchLogin(username)
      .then(fetchedWord => {
        setError('');
        setStoredWord(fetchedWord.storedWord);
        setIsWordPending(false);
        setUsername(username);
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
    setStoredWord('');
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onRefresh() {
    setError('');
    setIsWordPending(true);
    fetchWord()
      .then(fetchedWord => {
        setStoredWord(fetchedWord.storedWord);
        setIsWordPending(false);
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

  function onUpdateWord(word) {
    fetchUpdateWord(word)
      .then(fetchedWord => {
        setStoredWord(fetchedWord.storedWord);
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
        setIsWordPending(true);
        return fetchWord();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then(fetchedWord => {
        setIsWordPending(false);
        setStoredWord(fetchedWord.storedWord);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });

  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="app">
      <main className="">
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh} />
            <Word
              isWordPending={isWordPending}
              storedWord={storedWord}
            />
            <WordForm onUpdateWord={onUpdateWord} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
