var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})


app.post('/login', function (req, res) {
   var pass = req.params.password;
   var email = req.params.email;
   var name = req.params.name;

   const sqlite3 = require('sqlite3').verbose();

   // open the database
   let db = new sqlite3.Database('./db/nopass.sqlite3');

   let sql = `SELECT email, password, name FROM users WHERE name = ?`;
   var names = '';

   db.all(sql, name, (err, rows) => {
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

   res.send(names);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})