const express = require('express');
const uuidv4 = require('uuid').v4;

const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

const sessions = {};
const stored_word = {};

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Login</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <header class="header">
            <h1>Login</h1>
          </header>
          <main class="main">
            <form action="/login" method="POST">
              <label class="form__label">
                <span>username:</span>
                <input name="username">
              </label>
              <button type="submit">Login</button>
            </form>
          </main>
          <footer class="footer">
            See our <a href="#">Privacy Policy</a>
          </footer>
        </body>
        </html>
      `);
  } else {
    const username = sessions[sid].username;
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Data</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <header class="header">
            <h1>Hello ${username}</h1>
          </header>
          <main class="main">
            <p>Stored word: ${stored_word[username].word}</p>
            <form action="/change" method="POST">
              <label class="form__label">
                <span>Change word:</span>
                <input name="word">
              </label>
              <button type="submit">Change</button>
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
      `);
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const regex = /^[A-Za-z0-9]*$/;
  const found = username.match(regex);
  if (username === 'dog' || !username || found.length != 1) {
    res.status(401).send(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Login Error</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>        
        <header class="header">
          <h1>Invalid Username</h1>
        </header>
        <main class="main">
          <p>Back to <a href="/">login page</a></p>
        </main>
        <footer class="footer">
          See our <a href="#">Privacy Policy</a>
        </footer>
      </body>
      </html>
    `);
    return;
  }

  if (stored_word[username] === undefined) {
    stored_word[username] = { word: "" };
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

app.post('/change', (req, res) => {
  const word = req.body.word.trim();
  const sid = req.cookies.sid;
  if (sid) {
    stored_word[sessions[sid].username] = { word };
  }
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
