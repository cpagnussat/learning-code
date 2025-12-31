const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata.db');

db.serialize(() => {
  // Create a skills table
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      skill_name TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  
  // Insert skills for existing users
  db.run(`INSERT INTO skills (user_id, skill_name) VALUES (1, 'SQL')`);
  db.run(`INSERT INTO skills (user_id, skill_name) VALUES (1, 'JavaScript')`);
  db.run(`INSERT INTO skills (user_id, skill_name) VALUES (2, 'Python')`);
  
  // JOIN query - combine users and their skills
  db.all(`
    SELECT users.name, skills.skill_name
    FROM users
    JOIN skills ON users.id = skills.user_id
  `, [], (err, rows) => {
    console.log('\nUsers with their skills:');
    rows.forEach(row => {
      console.log(`${row.name} knows ${row.skill_name}`);
    });
  });
});

db.close();