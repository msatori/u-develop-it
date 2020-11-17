const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to election database')
});


//get a single candidate
db.get(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
});

//create a candidate 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
//NOT ARROW FUNCTION FOR THIS
db.run(sql, params, function(err, result) {
    if(err) {
        console.log(err);
    }
    console.log(result, this.lastID)
});


// Delete a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result, this, this.changes);
//   });

app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

