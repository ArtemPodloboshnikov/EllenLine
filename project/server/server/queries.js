const express = require('express');
const router = express.Router();
const MySQL = require('mysql');
const async = require('async');
const transliterate = require('./functions').transliterate;
const ConvertDataToString = require('./functions').ConvertDataToString;
const sqlQueryUpdate = require('./functions').sqlQueryUpdate;
const keysForTables = require('./passwords')


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

router.get('/relax', function(request, reply){
    debugger
    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
    if (request.query.id != undefined)
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.coordinates, '${keysForTables.relax.coordinates}') as coordinates, AES_DECRYPT(relax_.description, '${keysForTables.relax.description}') as description,  AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price, relax_.stars as stars, relax_.id_city as id_city, relax_.id_relax as id, countries.id_country as id_country FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.id_relax = ${request.query.id}`;
    }
    else
    if (request.query.type != undefined)
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price, relax_.id_relax as id, relax_.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, relax_.stars as stars FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.type = AES_ENCRYPT('${request.query.type}', '${keysForTables.relax.type}')`;
    }
    else
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.coordinates, '${keysForTables.relax.coordinates}') as coordinates, AES_DECRYPT(relax_.description, '${keysForTables.relax.description}') as description,  AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price, relax_.id_relax as id, relax_.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, relax_.stars as stars, relax_.discount as discount FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country`;
    }
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql, function (error, results, fields) {

            connection.release();
            if (error) console.log(error);
            let new_results = ConvertDataToString(results, [['title'], ['services'], ['address'], ['price'], ['type'], ['id'], 
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'],
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['stars']]);
            reply.send(new_results);
        });
    })
})


router.post('/relax', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    const dataTitle = [request.body.title, keysForTables.relax.title];
    const dataAddress = [request.body.address, keysForTables.relax.address];
    const dataDescription = [request.body.description, keysForTables.relax.description];
    const dataServices = [JSON.stringify(request.body.services), keysForTables.relax.services];
    const dataCoordinates = [request.body.coordinates.join(','), keysForTables.relax.coordinates];
    const dataPhotos = [request.body.photosPath.join(), keysForTables.relax.photos];
    const dataType = [request.body.type.toLowerCase(), keysForTables.relax.type];
    const dataTypeOfRoom = [request.body.typeOfRoom, keysForTables.relax.typeOfRoom];
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO relax_  SET title = AES_ENCRYPT(?), address = AES_ENCRYPT(?), description = AES_ENCRYPT(?), stars = ?, services = AES_ENCRYPT(?), coordinates = AES_ENCRYPT(?), photos = AES_ENCRYPT(?), price = ?, type = AES_ENCRYPT(?), typeOfRoom = AES_ENCRYPT(?), id_city = ?',
        [dataTitle, dataAddress, dataDescription, request.body.stars, dataServices, dataCoordinates, dataPhotos, request.body.price, dataType, dataTypeOfRoom, request.body.idCity], function (error, results) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/relax', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    let sql = sqlQueryUpdate('relax_', 
                             [['title', request.body.title, keysForTables.relax.title],
                              ['address', request.body.address, keysForTables.relax.address],
                              ['description', request.body.description, keysForTables.relax.description],
                              ['services', JSON.stringify(request.body.services), keysForTables.relax.services],
                              ['coordinates', request.body.coordinates.join(','), keysForTables.relax.coordinates],
                              ['photos', request.body.photosPath.join(), keysForTables.relax.photos],
                              ['type', request.body.type.toLowerCase(), keysForTables.relax.type],
                              ['typeOfRoom', request.body.typeOfRoom, keysForTables.relax.typeOfRoom]])
    console.log(sql)
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql,
        function (error, results) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.post('/tours', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;
    console.log(request.body);

    // const fields = ['title', 'address', 'description', 'stars', 'services', 'coordinates', 'photos', 'price', 'type', 'id_city'];
    // const dataTitle = [request.body.title, keysForTables.relax.title];
    // const dataAddress = [request.body.address, keysForTables.relax.address];
    // const dataDescription = [request.body.description, keysForTables.relax.description];
    // const dataServices = [JSON.stringify(request.body.services), keysForTables.relax.services];
    // const dataCoordinates = [request.body.coordinates, keysForTables.relax.coordinates];
    // const dataPhotos = [request.body.photos, keysForTables.relax.photos];
    // const dataType = [request.body.type.toLowerCase(), keysForTables.sanatorium.type];
    
    // mysql.getConnection(function(err, connection) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
        
    //     connection.query('INSERT INTO relax_ (??) VALUES (AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?), AES_ENCRYPT(?))',
    //     [fields, dataTitle, dataAddress, dataDescription, request.body.stars, dataServices, dataCoordinates, dataPhotos, request.body.price, dataType, request.body.idCity], 
    //     function (error, results, fl) {

    //         connection.release();
    //         if (error) console.log(error);
    //         console.log(fl)
    //         reply.status(200);
    //     });
    // })
})

router.get('/languages', function(request, reply){

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(`SELECT id_language as id, AES_DECRYPT(name, '${keysForTables.languages.name}') as name FROM languages`,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            let new_results = ConvertDataToString(results, [['id'], ['name']]);

            reply.send(new_results);
        });
    })
})

router.post('/languages', function(request, reply){

    
    const dataName = [request.body.name.toLowerCase(), keysForTables.languages.name]
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO languages SET name = AES_ENCRYPT(?)',
        [dataName], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.delete('/languages', function(request, reply){

    
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('DELETE FROM languages WHERE id_language = ?',
        [request.body.id], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.get('/employees', function(request, reply){

    // mysql.getConnection(function(err, connection) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
        
    //     connection.query(`SELECT id_language as id, AES_DECRYPT(name, '${keysForTables.languages.name}') as name FROM languages`,
    //     function (error, results, fields) {

    //         connection.release();
    //         if (error) console.log(error);

    //         let new_results = [];

    //         results.map((language)=>{

    //             new_results.push({id: language.id, name: language.name.toString()});
    //         });
    //         reply.send(new_results);
    //     });
    // })
})

router.get('/countries', function(request, reply){


    let sql = '';
    if (request.query.with == 'description')
    {
        sql = `SELECT id_country as id, AES_DECRYPT(name, '${keysForTables.countries.name}') as name, AES_DECRYPT(description, '${keysForTables.countries.description}') as description FROM countries`;
    }
    else
    if (request.query.with == 'cities')
    {
        if (request.query.whereCountryName != undefined)
        {
            sql = `SELECT AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as cityName, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as countryName, countries.id_country as idCountry, cities.id_city as idCity
            FROM countries INNER JOIN countries_bind_cities as bind ON bind.id_country = countries.id_country INNER JOIN cities ON cities.id_city = bind.id_city WHERE countries.name = AES_ENCRYPT('${request.query.whereCountryName}', '${keysForTables.countries.name}')`;
        }
        
    }
    else
    {
        sql = `SELECT id_country as id, AES_DECRYPT(name, '${keysForTables.countries.name}') as name FROM countries`
    }
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql,
         
        function (error, buffer_results, fields) {

            connection.release();
            if (error) console.log(error);
           // console.log(buffer_results)
            let string_result = [];
            if (request.query.with == 'cities')
            {

                string_result = ConvertDataToString(buffer_results, [['idCountry'], 
                ['countryName'], ['idCity'], ['cityName'], ['description']]);

            }
            else
            if (request.query.with == 'description')
            {

                string_result = ConvertDataToString(buffer_results, [['id'], ['name'], ['description']]);
               
            }
            else
            {
                string_result = ConvertDataToString(buffer_results, [['id'], ['name']]);
            }
            
            
            reply.send(string_result);
        });
    })
})

router.post('/countries', function(request, reply){

    
    const dataName = [request.body.name, keysForTables.countries.name]
    const dataDescription = [request.body.description, keysForTables.countries.description];
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO countries SET name = AES_ENCRYPT(?), description = AES_ENCRYPT(?)',
        [dataName, dataDescription], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})
router.put('/countries', function(request, reply){

    
    const dataDescription = [request.body.description, keysForTables.countries.description];
    const id = request.body.id;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('UPDATE countries SET description = AES_ENCRYPT(?) WHERE id_country=?',
        [dataDescription, id], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.delete('/countries', function(request, reply){

    
    const id = request.body.id;
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('DELETE FROM countries WHERE id_country=?',
        [id], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.get('/cities', function(request, reply){

    
    let sql = '';
    if (request.query.id == undefined)
    {
        sql = `SELECT id_city as id, AES_DECRYPT(name, '${keysForTables.cities.name}') as name FROM cities`;
    }
    else
    {
        sql = `SELECT id_city as id, AES_DECRYPT(name, '${keysForTables.cities.name}') as name FROM cities WHERE id_city=${request.query.id}`
    }
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql,
         
        function (error, buffer_results, fields) {

            connection.release();
            if (error) console.log(error);
            let string_result = ConvertDataToString(buffer_results, [['id'], ['name']]);
            
            reply.send(string_result);
        });
    })
})

router.post('/cities', function(request, reply){

    const dataName = [request.body.city, keysForTables.cities.name];
    let lastCityId = 0;
    
    async.series([
        function(done)
        {
            mysql.query('INSERT INTO cities SET name = AES_ENCRYPT(?)',
            [dataName], 
            function (error, results, fields) {

                if (error) console.log(error);

                 done();
            });
            
        },
        function(done)
        {
            mysql.query('SELECT id_city FROM cities ORDER BY id_city DESC LIMIT 1',
            function (error, results, fields) {

                if (error) console.log('Line 208: ' + error);
               
                lastCityId = results[0].id_city;

                done();
            });
            
        },
        function(done)
        {
           
            mysql.query('INSERT INTO countries_bind_cities SET id_city=?, id_country=?',
            [lastCityId, request.body.idCountry], 
            function (error, results, fields) {

                if (error) console.log(error);

                done();
            });
            
        }
        
    ], function(err){

        if (err) console.log(err);
        reply.sendStatus(200);
    })  
})

router.put('/cities', function(request, reply){

    
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('UPDATE countrues_bind_cities SET id_country=? WHERE id_city=?',
        [request.body.idCountry, request.body.idCity], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.delete('/cities', function(request, reply){

    
    const id = request.body.id;
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('DELETE FROM cities WHERE id_city=?',
        [id], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.get('/searchAll', function(request, reply){

    if (request.query.title == undefined) reply.sendStatus(400) 
    const dataRelax = [request.query.title, keysForTables.relax.title];
    let outputs = [];
    let decryptedTempResults = [];
    async.series([
        function(done)
        {
            mysql.query(`SELECT AES_DECRYPT(title, ?) as title, AES_DECRYPT(photos, ?) as photos, stars FROM relax_ WHERE (SELECT AES_DECRYPT(title, ?) FROM relax_) LIKE ?`,
            [keysForTables.relax.title, keysForTables.relax.photos, keysForTables.relax.title, `%${request.query.title}%`], 
            function (error, results, fields) {

                if (error) console.log(error);
                
                let new_results  = ConvertDataToString(results, [['title'], ['photos'], ['stars']]);

                outputs.push(new_results);
                done();
            });
            
         },
        // function(done)
        // {
        //     mysql.query(`SELECT AES_DECRYPT(title, '?') as title, AES_DECRYPT(photos, '?') as photos, stars FROM relax_ WHERE title LIKE (SELECT AES_ENCRYPT(?))`,
        //     [keysForTables.relax.title, keysForTables.relax.photos, dataRelax], 
        //     function (error, results, fields) {

        //         if (error) console.log(error);
                
        //         let new_results = ConvertDataToString(results, [['title'], ['photos'], ['stars']]);

        //         outputs.push(new_results);
        //         done();
        //     });
            
        // },
        // function(done)
        // {
           
        //     mysql.query('INSERT INTO countries_bind_cities SET id_city=?, id_country=?',
        //     [lastCityId, request.body.idCountry], 
        //     function (error, results, fields) {

        //         if (error) console.log(error);

        //         done();
        //     });
            
        // }
        
    ], function(err){

        if (err) console.log(err);
        reply.send(outputs);
    })  
})

module.exports = router;