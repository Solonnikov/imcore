// server.js
'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/dist')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

// Add User 2 Item
app.post('/add', (req, res, next) => {
  console.log('Received request');
  fs.writeFile('./src/assets/data/user2.json', JSON.stringify(req.body, null, 2), function(err){
    if(err) throw err;
  })
})

// Update User1 Item
app.post('/change', (req, res, next) => {
  console.log('Received request');
  fs.writeFile('./src/assets/data/user1.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) throw err;
    console.log('File changed');
    res.send('File changed');
  })
});

// Restores User1 Items, Deletes User2 Items
app.get('/return',function(res,req) {
    fs.createReadStream('./src/assets/data/data.json').pipe(fs.createWriteStream('./src/assets/data/user1.json'));
    fs.createReadStream('./src/assets/data/empty.json').pipe(fs.createWriteStream('./src/assets/data/user2.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Heroku port
const port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);

app.listen(port, ()=>{
  console.log('Listening on port ' + port);
});