// Server built with Express framework
const express = require('express');
const fs = require('fs');

const app = express();
const dataFile = 'data.json';

// Load existing data
let storedData = [];
if (fs.existsSync(dataFile)) {
  const fileData = fs.readFileSync(dataFile, 'utf8');
  storedData = JSON.parse(fileData);
}

function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify(storedData, null, 2));
}

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML)
app.use(express.static('.'));

// GET /data - return all stored data
app.get('/data', (req, res) => {
  res.json(storedData);
});

// POST /data - add new data
app.post('/data', (req, res) => {
  storedData.push(req.body);
  saveData();
  res.json({success: true, stored: storedData});
});

// GET /users - fetch users from external API
app.get('/users', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.json(users);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch users'});
  }
});

app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});