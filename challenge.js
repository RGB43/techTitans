var mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const nunjucks = require("nunjucks");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kainos_employees"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const appViews = path.join(__dirname, '/views')

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
}

  nunjucks.configure(appViews, nunjucksConfig)

  app.set('view engine', 'html')


app.get('/', (req, res) => {
    res.render('index')
  });

  app.get('/employees', (req, res) => {
    
      con.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        res.render("view-employees", {employees: result})
       
  });

})
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  
