const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata.db');

db.serialize(() => {
  // Insert data
  db.run(`INSERT INTO users (name, skill) VALUES (?, ?)`, ['Christian', 'Learning SQL'], function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Inserted user with ID: ${this.lastID}`);
    }
  });
  
  db.run(`INSERT INTO users (name, skill) VALUES (?, ?)`, ['Alice', 'Backend dev']);
  db.run(`INSERT INTO users (name, skill) VALUES (?, ?)`, ['Bob', 'Frontend dev']);
});

db.close();