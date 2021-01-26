const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


const PORT = 4000;

<<<<<<< HEAD

=======
>>>>>>> origin/main
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./queries'));

app.use('/file', require('./file'))

app.listen(PORT, error => {

    error ? console.log(error) : console.log("Server started!!!");
});