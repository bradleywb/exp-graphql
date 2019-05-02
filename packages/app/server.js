const cors = require('cors');
const express = require('express');

// ---------------------------
// <web app>
// ---------------------------

const app = express();

app.use(cors());

app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, () => console.log('App server running at localhost:3000'));

// ---------------------------
// </web app>
// ---------------------------
