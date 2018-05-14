var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.load();


//connect to the mongodb database .URI for which is in the env file

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('error', function(err) {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.'+err);
  process.exit(1);
});

//initialize app to use body-parser .This will help in reading the  http post requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var HomeController = require('./controller/home');

// viewed at http://localhost:8080
app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.post('/populateZipCodes',HomeController.getZipCodes);



app.listen(8080);