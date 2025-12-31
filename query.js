const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata.db');

// 1. COUNT - how many rows
db.get(`SELECT COUNT(*) as total FROM users`, [], (err, row) => {
  console.log(`Total users: ${row.total}`);
});

// 2. WHERE with exact match
db.all(`SELECT * FROM users WHERE name = 'Alice'`, [], (err, rows) => {
  console.log('\nUser named Alice:', rows);
});

// 3. ORDER BY - sort results
db.all(`SELECT * FROM users ORDER BY name ASC`, [], (err, rows) => {
  console.log('\nUsers sorted alphabetically:');
  rows.forEach(row => console.log(`- ${row.name}`));
});

// 4. LIMIT - only first N results
db.all(`SELECT * FROM users LIMIT 2`, [], (err, rows) => {
  console.log('\nFirst 2 users:', rows.map(r => r.name));
});

db.close();