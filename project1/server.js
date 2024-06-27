const express = require('express');
const uuidv4 = require('uuid').v4;

const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

const compare = require('./compare');
const words = require('./words');

const sessions = {};
const userGameInfo = {};

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.send(getLoginPage("Login"));
  } else if (!(sid in sessions)) {
    res.send(getLoginPage("Invalid session id, please login"));
  } else {
    const username = sessions[sid].username;
    const gameInfo = userGameInfo[username];
    if (gameInfo.gameState) {
      res.send(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Game</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <header class="header">
            <h1>Hello ${username}, Let's play a guessing game</h1>
          </header>
          <main class="main">
            <h2>You have won!</h2>
            <form class="logout__form" action="/logout" method="POST">
              <button type="submit">Logout</button>
            </form>
            <form class="newgame__form" action="/new-game" method="POST">
              <button type="submit">New Game</button>
            </form>
          </main>
          <footer class="footer">
            See our <a href="#">Privacy Policy</a>
          </footer>
        </body>
        </html>
      `);
      return;
    }
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Game</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <header class="header">
            <h1>Hello ${username}, Let's play a guessing game</h1>
          </header>
          <main class="main">
            <div class="possible_words">
              <p>Possible words:</p>
              ` + Object.values(gameInfo.possibleWords).map(word => `
              <span class="word">${word}</span>
              `).join('') + `
            </div>
            <form class="guess__form" action="/guess" method="POST">
              <label class="form__label">
                <span>Making a guess:</span>
                <input name="word">
              </label>
              <button type="submit">Submit</button>
            </form>
            <form class="logout__form" action="/logout" method="POST">
              <button type="submit">Logout</button>
            </form>
            <form class="newgame__form" action="/new-game" method="POST">
              <button type="submit">New Game</button>
            </form>
            <p>Valid guesses count: ${gameInfo.validGuessesCnt}</p>
            <p>Most recent valid guess word: ${gameInfo.mostRecentValidGuess}</p>
            <p>Most recent valid guess matched letters count: ${gameInfo.mostRecentValidCnt}</p>
            <table>
              <tr>
                <th>Previously guessed word</th>
                <th>State</th>
                <th>Matched letters count</th>
              </tr>
              ` + Object.values(gameInfo.gressedWords).reverse().map(gressedWord => `
              <tr>
                <td>${gressedWord.word}</td>
                <td>${gressedWord.state}</td>
                <td>${gressedWord.count}</td>
              </tr>
              `).join('') + `
            </table>
          </main>
          <footer class="footer">
            See our <a href="#">Privacy Policy</a>
          </footer>
        </body>
        </html>
      `);
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const regex = /^[A-Za-z0-9]*$/;
  const found = username.match(regex);
  if (username === 'dog' || !username || found === null) {
    res.status(401).send(getLoginPage("Invalid username, please login"));
    return;
  }
  if (userGameInfo[username] === undefined) {
    userGameInfo[username] = newGame(username, words);
  }

  const sid = uuidv4();
  sessions[sid] = { username };
  res.cookie('sid', sid);
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    delete sessions[sid];
  }
  res.clearCookie("sid");
  res.redirect('/');
});

app.post('/guess', (req, res) => {
  const word = req.body.word.trim().toLowerCase();
  const sid = req.cookies.sid;
  if (!sid) {
    res.send(getLoginPage("Login"));
    return;
  } else if (!(sid in sessions)) {
    res.send(getLoginPage("Invalid session id, please login"));
    return;
  }

  const username = sessions[sid].username;
  const gameInfo = userGameInfo[username];
  if (word === gameInfo.pickedWord) {
    gameInfo.gameState = true;
  } else {
    if (!(word in gameInfo.possibleWords)) {
      gameInfo.gressedWords.push({ word: word, state: "invalid guess", count: 0 });
    } else {
      const matchedLettersCnt = compare(gameInfo.pickedWord, word);
      gameInfo.gressedWords.push({ word: word, state: "valid guess", count: matchedLettersCnt });
      gameInfo.validGuessesCnt++;
      gameInfo.mostRecentValidGuess = word;
      gameInfo.mostRecentValidCnt = matchedLettersCnt;
      delete gameInfo.possibleWords[word];
    }
  }
  res.redirect('/');
});

app.post('/new-game', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.send(getLoginPage("Login"));
    return;
  } else if (!(sid in sessions)) {
    res.send(getLoginPage("Invalid session id, please login"));
    return;
  }
  const username = sessions[sid].username;
  userGameInfo[username] = newGame(username, words);
  res.redirect('/');
});

// html functions
function getLoginPage(message) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Game</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="header">
      <h1>Word Guessing Game</h1>
    </header>
    <main class="main">
      <h2>${message}</h2>
      <form class="login__form" action="/login" method="POST">
        <label class="form__label">
          <span>username:</span>
          <input name="username">
        </label>
        <button type="submit">Login</button>
      </form>
      <form class="logout__form" action="/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </main>
    <footer class="footer">
      See our <a href="#">Privacy Policy</a>
    </footer>
  </body>
  </html>
`;
}

// game functions
function pickWord(username, words) {
  const word = words[Math.floor(Math.random() * words.length)];
  console.log("username: " + username + ", chosen word: " + word);
  return word;
}

function newGame(username, words) {
  return { pickedWord: pickWord(username, words), gressedWords: [], possibleWords: Object.assign({}, ...words.map((word) => ({ [word]: word }))), validGuessesCnt: 0, mostRecentValidGuess: "?", mostRecentValidCnt: 0, gameState: false }
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));