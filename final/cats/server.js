const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const cats = require('./cats');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!sessions.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if (username === 'wen') {
        res.status(403).json({ error: 'auth-denied' });
        return;
    }

    const sid = sessions.addSession(username);

    res.cookie('sid', sid);

    res.json({ username, catsInfo: cats.getCatsInfo() });
});

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

app.get('/api/cats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username, catsInfo: cats.getCatsInfo() });
});

app.put('/api/cats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { index } = req.body;

    cats.adoptCat(index, username);

    res.json({ username, catsInfo: cats.getCatsInfo() });
});

app.post('/api/cats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    if (username !== "Admin") {
        res.status(403).json({ error: 'permission-insufficient' });
        return;
    }

    const { name, breed } = req.body;

    if (!cats.isValidName(name)) {
        res.status(400).json({ error: 'required-name' });
        return;
    }

    cats.registerCat(username, name, breed);

    res.json({ username, catsInfo: cats.getCatsInfo() });
});

app.listen(PORT, () => console.log(`http://locolhost:${PORT}`));