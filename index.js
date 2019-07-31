const express = require('express');
const mysql = require('mysql');
const moment  = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');

var conn = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database: 'todos'
});

conn.connect(function(err) {
    if (err) 
    console.log(err);
    else
    console.log('Connection Successful');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/consultaTodos', (req, res) => {
    let sql = 'SELECT * FROM todos';

    let query = conn.query(sql, (err, result) => {
        let arrayResult = [];

        result.forEach((row) => {
            arrayResult.push(row);
        });

        res.contentType('application/json');
        res.send(JSON.stringify(arrayResult));
    });
});


app.post('/addTodo', (req, res) => {
    let nombre = req.body.nombre;
    let fecha = moment().format("YYYY-MM-DD"); 

    let sql = "INSERT INTO todos (nombre, fecha, status) VALUES (?, ?, false) ";

    conn.query(sql,
    [
        nombre,
        fecha
    ], function(err){
        if(err) 
            console.log("Error:");
    });

    res.send("Fulfilled");  
});

app.post('/updateTodo', (req, res) => {
    let nombre = req.body.nombre;
    let id = req.body.id;

    let sql = "UPDATE todos SET nombre = ? WHERE id = ? ";

    conn.query(sql,
    [
        nombre,
        id
    ], function(err){
        if(err) 
            console.log("Error:");
    });
    
    res.send("Fulfilled");  
});

app.post('/deleteTodo', (req, res) => {
    let id = req.body.id;

    let sql = "DELETE FROM todos WHERE id = ? ";

    conn.query(sql,
    [
        id
    ], function(err){
        if(err) 
            console.log("Error:");
    });
    
    res.send("Fulfilled");  
});

const port = 5000;

app.listen(port, () => console.log(`Server Started at ${port}`));