const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


const PORT = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use('/api', require('./queries'));

app.use('/file', require('./file'))

app.listen(PORT, error => {

    error ? console.log(error) : console.log("Server started!!!");
});