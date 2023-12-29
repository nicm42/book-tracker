const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const key = process.env.API_KEY;
const link = `https://sheets.googleapis.com/v4/spreadsheets/1jXvN4YvrQvCbY3ektHfJKRUEk5-aLmFkDz7SXzlLZEw/values/2023?valueRenderOption=FORMATTED_VALUE&key=${key}`;

// Serve API request
app.get('/', async (req, res) => {
  const response = await fetch(link);
  const data = await response.json();
  //console.log(data.values);
  //res.send(data.values);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
