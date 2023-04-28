const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: '94ec7d7c1635',
  user: 'root',
  password: 'password',
  database: 'test'
})

connection.connect()






app.get('/get',(req,res)=>{

  connection.query('SELECT * from customers', (err, rows, fields) => {
    if (err) throw err

    res.json({rows})
  
  })

	

})

app.post('/insert',(req,res)=>{

  var CustomerID = req.body.CustomerID;
  var CustomerName = req.body.CustomerName;
  var ContactName = req.body.ContactName;
  var Country = req.body.Country;

  var sql = `INSERT INTO customers (CustomerID, CustomerName, ContactName, Country) VALUES ("${CustomerID}", "${CustomerName}", "${ContactName}", "${Country}")`;

  

  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.json({'message':"inserted"})   
  });

  // connection.query('SELECT * from customers', (err, rows, fields) => {
  //   if (err) throw err

  //   res.json({rows})   
  // })

	

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
