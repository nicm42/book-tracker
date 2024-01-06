import fs from 'fs';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.resolve();
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;

// Get the data
app.get('/getbooks', async (req, res) => {
  fs.readFile(path.resolve(__dirname, 'dummyData.json'), (error, data) => {
    if (error) {
      console.log(error);
      return;
    } else {
      //console.log(JSON.parse(data));
      res.send(JSON.parse(data));
    }
  });
});

app.post('/addbook', async function (req, res) {
  console.log(req.body);
  fs.readFile(path.resolve(__dirname, 'dummyData.json'), (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const dataFromFile = JSON.parse(data);
    //console.log(dataFromFile);

    // Set up the array we want to add
    let dataToSend = [];
    if (req.body.type === 'acquired') {
      dataToSend = [req.body.book, ''];
    }
    if (req.body.type === 'read') {
      dataToSend = ['', req.body.book];
    }
    // Find the year to add the book to
    const dataIndex = dataFromFile.findIndex(
      (item) => item.sheet === req.body.year,
    );
    // Now having found it, add the book to the end of the data array for that year
    if (dataIndex !== -1) {
      dataFromFile[dataIndex].data.push(dataToSend);

      fs.writeFile(
        path.resolve(__dirname, 'dummyData.json'),
        JSON.stringify(dataFromFile, null, 2),
        (err) => {
          if (err) {
            console.log('Failed to write updated data to file');
            return;
          }
          console.log('Updated file successfully');
        },
      );
    }
  });
  res.status(201).json();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
