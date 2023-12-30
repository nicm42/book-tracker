const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const key = process.env.API_KEY;
const sheetID = '1jXvN4YvrQvCbY3ektHfJKRUEk5-aLmFkDz7SXzlLZEw';
const link = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?key=${key}`;

let dataToSend = new Array();

// Get the sheet names
app.get('/api', async (req, res) => {
  const response = await fetch(link);
  const data = await response.json();

  data.sheets.forEach((sheet) => {
    getSheetData(sheet.properties.title);
  });

  res.send(dataToSend);
});

// Now use the sheet names to get the data from each
async function getSheetData(sheetName) {
  const sheetLink = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${key}`;
  const response = await fetch(sheetLink);
  const data = await response.json();
  //console.log(data.values);
  const newData = { sheet: sheetName, data: data.values };
  dataToSend.push(newData);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
