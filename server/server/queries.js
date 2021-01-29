const express = require('express');
const router = express.Router();
const MySQL = require('mysql');
const async = require('async');
const multer  = require("multer");


function transliterate(word){
  let a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu", " ":"_"};
  return word.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");
}

function filesUploader(path, mimetypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"]){
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path);
        },
        filename: (req, file, cb) =>{
            cb(null, transliterate(file.originalname));
        }
    });

    const fileFilter = (req, file, cb) => {
        
        let flag = false;

        mimetypes.map(mimetype => {

            if (mimetype === file.mimetype)
            {
                flag = true;
            }
            
        })

        cb(null, flag);
        
    }

    return multer({storage:storageConfig, fileFilter: fileFilter, limits : {fileSize : 1000000}}).array("photos[]");
}
const keysForTables = {'countries': {name: 'nBZiLpGdcwsFngZU', description: 'aSTCsopinbYKCElE'},
                       'cities': {name: 'yPkAx3jZlnZC'}} 

const HOST = 'localhost';
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

router.get('/sanatoriums', function(request, reply){

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

router.post('/sanatoriumsPhotos', filesUploader("images/Sanatorium"),function(request, reply){

    

    let filedata = request.body;
    if (filedata)
    {

        console.log('Файлы загружены')
    }
    else
    {
        console.log('Файлы не загружены')
    }
    
})

router.post('/sanatoriums', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;
    console.log(request.body);
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        // connection.query('INSERT INTO relax (name, address, description, countStar, services, coordinates, photos, type, id_country, id_city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        // [data], function (error, results, fields) {

        //     connection.release();
        //     if (error) console.log(error);

        //     reply.status(200);
        // });
    })
})

router.get('/countries', function(request, reply){


    let sql = '';
    if (request.query.with == 'description')
    {
        sql = `SELECT id_country as id, AES_DECRYPT(name, '${keysForTables.countries.name}') as name, AES_DECRYPT(description, '${keysForTables.countries.description}') as description FROM countries`;
    }
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
                buffer_results.map(res=>{
               
                   
                    const name_str = res.countryName.toString();
                    //console.log(res);
                    if (res.description != undefined)
                    {
                        const description = res.description.toString();
                        string_result.push({idCountry: res.idCountry, countryName: name_str, 
                            idCity: res.idCity, cityName: res.cityName.toString(), description: description});

                    }
                    else{
                        string_result.push({idCountry: res.idCountry, countryName: name_str, 
                            idCity: res.idCity, cityName: res.cityName.toString()});
                    }
                       
                        
                    
                })
            }
            else
            {
                buffer_results.map(res=>{
               
                    if (res.name != null || res.description != null)
                    {
                        const name_str = res.name.toString();
                        if (res.description != undefined)
                        {
                            const description = res.description.toString();
                            string_result.push({id: res.id, name: name_str, description: description});
    
                        }
                        else{
                            string_result.push({id: res.id, name: name_str});
                        }
                       
                        
                    }
                })
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
        sql = `SELECT id_city as id, AES_DECRYPT(name, '${keysForTables.cities.name}') as name FROM cities WHERE id_city=${request.body.id}`
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
            let string_result = [];
           
            buffer_results.map(res=>{
               
                
                const name_str = res.name.toString();

                string_result.push({id: res.id, name: name_str});
                   
                    
                
            })
            
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

module.exports = router;