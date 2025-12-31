const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydata.db');

db.serialize(() => {
  // UPDATE - change existing data
  db.run(`UPDATE users SET skill = 'SQL Expert' WHERE name = 'Christian'`, function(err) {
    console.log(`Updated ${this.changes} row(s)`);
  });
  
  // DELETE - remove data
  db.run(`DELETE FROM users WHERE name = 'Bob'`, function(err) {
    console.log(`Deleted ${this.changes} row(s)`);
  });
  
  // Check results
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    console.log('\nRemaining users:');
    rows.forEach(row => console.log(`${row.name} - ${row.skill}`));
  });
});

db.close();