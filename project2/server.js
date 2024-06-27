const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// check sid
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

// login
app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!messages.isValidUsername(username)) {
        console.log(username);
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);

    res.cookie('sid', sid);
    res.json({ username });
});

// logout
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ wasLoggedIn: !!username });
});

// messages

app.get('/api/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const usersList = sessions.getAllUsers();
    const messagesList = messages.messagesList;

    res.json({ username, usersList, messagesList });
});

app.put('/api/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text } = req.body;

    if (!text && text !== '') {
        res.status(400).json({ error: 'required-text' });
        return;
    }

    messages.messagesList.push({ username: username, text: text });

    const usersList = sessions.getAllUsers();
    const messagesList = messages.messagesList;

    res.json({ username, usersList, messagesList });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

