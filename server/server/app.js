const express = require('express');
const app = express();

const cors = require('cors')


const PORT = 4000;


app.use(cors());

app.use('/api', require('./queries'));

app.use('/file', require('./file'))

app.listen(PORT, error => {

    error ? console.log(error) : console.log("Server started!!!");
});