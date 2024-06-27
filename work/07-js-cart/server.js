const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
