let express = require('express');
let path = require("path");
const sqlite3 = require('sqlite3').verbose();
let bodyParser = require('body-parser')

let app = express();
app.use(express.static("frontend"));

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
   //res.send('Hello World');
   res.sendFile(path.join(__dirname + '/frontend/index.html'));
})

app.get('/home', function (req, res) {
   //res.send('Hello World');
   res.sendFile(path.join(__dirname + '/frontend/pages/home.html'));
})

app.post('/login', urlencodedParser, function (req, res) {
   let user = req.body.user;
   let pass = req.body.pwd;

   console.log(user, ":", pass);

   let db = new sqlite3.Database('./db/nopass.sqlite3');

   let sql = "SELECT email, password, name FROM users WHERE email = '" + user + "';";
   //let sql = `SELECT email, password, name FROM users WHERE email = ?`;
   let loginSuccessful = false;
   let dbRows;

   db.all(sql, (err, rows) => {
      if (err) {
         throw err;
      }
      dbRows = rows;
      rows.forEach((row) => {
         if(row.email == user && row.password == pass) {
            loginSuccessful = true;
         }
         console.log(row.name, ",", row.password, ",", row.email);
      });
   });

   db.close((err) => {
      if(err){console.log(err.message); return}
      res.send({"success" : loginSuccessful, "db" : dbRows});
  });
})

let server = app.listen(8081,  function () {
   console.log("Example app listening at http://localhost:8081")
})