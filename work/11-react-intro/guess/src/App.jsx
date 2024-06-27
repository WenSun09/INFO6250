import './App.css';

import { useState } from 'react';

import Login from './Login';
import Game from './Game';

function App() {
  const [username, setUsername] = useState('');

  if (username === '') {
    return (
      <div className="app">
        <Login
          setUsername={setUsername}>
        </Login>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Game
          username={username}
          setUsername={setUsername}>
        </Game>
      </div>
    );
  }
}

export default App;
