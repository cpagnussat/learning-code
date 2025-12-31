// Server built with Express framework and SQLite database
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('mydata.db');

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    skill TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML)
app.use(express.static('.'));

// GET /data - return all stored data
app.get('/data', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.json(rows);
    }
  });
});

// POST /data - add new data
app.post('/data', (req, res) => {
  const {name, skill} = req.body;
  
  db.run(`INSERT INTO users (name, skill) VALUES (?, ?)`, [name, skill], function(err) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.json({success: true, id: this.lastID});
    }
  });
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