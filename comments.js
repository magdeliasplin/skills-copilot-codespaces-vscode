// Create web server
// Create a server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Read comments from file
let comments = [];
fs.readFile('comments.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  comments = JSON.parse(data);
});

// Middleware
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.txt', JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(newComment);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});