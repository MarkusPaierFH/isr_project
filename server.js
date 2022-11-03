var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();

app.get('/', function (req, res) {
   res.send('Hello World');
})


app.post('/login', function (req, res) {
   //var pass = req.params.password;
   //var email = req.params.email;
   var name = req.query.name;

   console.log(name);

   let db = new sqlite3.Database('./db/nopass.sqlite3');

   let sql = `SELECT email, password, name FROM users WHERE name = ?`;
   var names = '';
   var password = '';
   var mail = '';

   db.all(sql, name, (err, rows) => {
   if (err) {
      throw err;
   }
   rows.forEach((row) => {
      console.log(row.name);
      console.log(row.password);
      console.log(row.email);

      names += row.name + ", ";
      password += row.password + ", ";
      mail += row.email + ", ";
   });
   });

   db.close((err) => {
      if(err){console.log(err.message); return}
      res.send("name: " + names + " pass: " + password + " email: " + mail);
  });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})