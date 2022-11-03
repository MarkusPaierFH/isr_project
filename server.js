var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})


app.post('/login', function (req, res) {
   var pass = req.params.password;
   var email = req.params.email;

   const sqlite3 = require('sqlite3').verbose();

   // open the database
   let db = new sqlite3.Database('./db/pass.db');

   let sql = `SELECT email, password FROM users WHERE email = ?`;
   var names = '';

   db.all(sql, email, (err, rows) => {
   if (err) {
      throw err;
   }
   rows.forEach((row) => {
      console.log(row.name);
      names += row.name;
   });
   });

   // close the database connection
   db.close();

   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})