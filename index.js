const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 8000;
require('dotenv').config();
require('./db');

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Api is working' });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});
