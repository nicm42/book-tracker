const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const key = process.env.API_KEY;
const sheetID = '1jXvN4YvrQvCbY3ektHfJKRUEk5-aLmFkDz7SXzlLZEw';
//const link = `https://sheets.googleapis.com/v4/spreadsheets/1jXvN4YvrQvCbY3ektHfJKRUEk5-aLmFkDz7SXzlLZEw/values/2023?valueRenderOption=FORMATTED_VALUE&key=${key}`;
const link = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?key=${key}`;

// Serve API request
app.get('/api', async (req, res) => {
  const response = await fetch(link);
  const data = await response.json();
  console.log(data.sheets);
  res.send(data.sheets);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
