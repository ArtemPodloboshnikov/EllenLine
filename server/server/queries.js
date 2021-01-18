const express = require('express');
const router = express.Router();
const MySQL = require('mysql');

const HOST = '92.53.96.146';
const DB_USER = 'cl98835_el';
const PASSWORD = 'N3MntYQG';
const DB_NAME = 'cl98835_el';

const mysql = MySQL.createPool({
    port: 3306,
    connectionLimit: 5,
    acquireTimeout: 30000,
    host: HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DB_NAME
});
router.get('/getSanatoriums', function(request, reply){

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Hello');
        connection.query('SELECT relax.title as title, relax.address as address, relax.icons as icons, relax.coordinates as coordinates, countries.description as descriptionCountry, countries.name as nameCountry FROM relax JOIN countries ON countries.id_country = relax.id_country',
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.send(results);
        });
    })
})

module.exports = router;