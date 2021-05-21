const express = require('express');
const router = express.Router();
const MySQL = require('mysql');
const async = require('async');
const transliterate = require('./functions').transliterate;
const ConvertDataToString = require('./functions').ConvertDataToString;
const sqlQueryUpdate = require('./functions').sqlQueryUpdate;
const multiplyConditions = require('./functions').multiplyConditions;
const parseMarkdownToHTML = require('./functions').parseMarkdownToHTML;
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

function deleteFromDB(table, field, id, reply)
{
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }

        connection.query(`DELETE FROM ${table} WHERE id_${field} = ${id}`,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);
    
            reply.sendStatus(200);
        });
    })
}

router.get('/search', function(request, reply){

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        let sql = '';

        if (request.query.title !== undefined)
        {

            sql = `(SELECT CAST(AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as CHAR(100)) as title, AES_DECRYPT(treatments.services, '${keysForTables.treatment.services}') as services, AES_DECRYPT(treatments.photos, '${keysForTables.treatment.photos}') as photos, AES_DECRYPT(treatments.address, '${keysForTables.treatment.address}') as address, AES_DECRYPT(treatments.type, '${keysForTables.treatment.type}') as type, AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom, treatments.price as price, treatments.count_people as count_people, treatments.id_treatment as id, treatments.discount as discount FROM treatments HAVING title LIKE '%${request.query.title}%') UNION (SELECT CAST(AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as CHAR(100)) as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price as price, relax_.count_people as count_people, relax_.id_relax as id, relax_.discount as discount FROM relax_ HAVING title LIKE '%${request.query.title}%') UNION (SELECT CAST(AES_DECRYPT(tours.title, '${keysForTables.tours.title}') as CHAR(100)) as title, AES_DECRYPT(tours.services, '${keysForTables.tours.services}') as services, AES_DECRYPT(tours.photos, '${keysForTables.tours.photos}') as photos, AES_DECRYPT(tours.address, '${keysForTables.tours.address}') as address, AES_DECRYPT(tours.type, '${keysForTables.tours.type}') as type, tours.price as price, tours.id_tour as id, tours.discount as discount, tours.pricePerChild as pricePerChild, tours.pricePerPet as pricePerPet FROM tours HAVING title LIKE '%${request.query.title}%') UNION (SELECT CAST(AES_DECRYPT(cruises.title, '${keysForTables.cruises.title}') as CHAR(100)) as title, AES_DECRYPT(cruises.services, '${keysForTables.cruises.services}') as services, AES_DECRYPT(cruises.photos, '${keysForTables.cruises.photos}') as photos, AES_DECRYPT(cruises.address, '${keysForTables.cruises.address}') as address, AES_DECRYPT(cruises.type, '${keysForTables.cruises.type}') as type, AES_DECRYPT(cruises.typeOfRoom, '${keysForTables.cruises.typeOfRoom}') as typeOfRoom, cruises.price as price, cruises.count_people as count_people, cruises.id_cruise as id, cruises.discount as discount FROM cruises HAVING title LIKE '%${request.query.title}%')`;
        }

        connection.query(sql,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);
            console.log(results)
            let new_results = ConvertDataToString(results, [['title'], ['services'], ['address'], 
            ['photos', 'images'], ['discount'], ['id'], ['type'], ['price'], ['typeOfRoom'], ['count_people']]);
            console.log(sql)
            reply.send(new_results);
        });
    })
})

router.get('/orders', function(request, reply){

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(`SELECT id_order as id, AES_DECRYPT(title, '${keysForTables.orders.title}') as title, price, AES_DECRYPT(client_name, '${keysForTables.orders.client_name}') as client_name, AES_DECRYPT(phone, '${keysForTables.orders.phone}') as phone, AES_DECRYPT(email, '${keysForTables.orders.email}') as email, AES_DECRYPT(clients, '${keysForTables.orders.clients}') as clients, date_start, date_end, time, isPaid, payment_id FROM orders`,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            let new_results = ConvertDataToString(results, [['id'], ['title'], ['price'], ['client_name'], ['phone', 'phone', true], 
            ['email'], ['date_start'], ['date_end'], ['time'], ['isPaid'], ['clients'], ['payment_id']]);

            reply.send(new_results);
        });
    })
})

router.post('/orders', function(request, reply){

    let outputs = [];
    let time = '';
    let idServiceColumn = '';

    let titleData = [request.body.title, keysForTables.orders.title];
    let phoneData = [request.body.phone, keysForTables.orders.phone];
    let emailData = [request.body.email, keysForTables.orders.email];
    let clientsData = [request.body.clients.join(', '), keysForTables.orders.clients];
    let clientNameData = [request.body.client_name, keysForTables.orders.client_name];
    
    if (request.body.type == 'relax')
    {
        idServiceColumn = 'id_relax'
    }
    else
    if(request.body.type == 'treatments')
    {
        idServiceColumn = 'id_treatment'
    }
    else
    if(request.body.type == 'tours')
    {
        idServiceColumn = 'id_tour'
    }
    
    if (request.body.time === undefined)
    {
        time = null;
    }
    else
    {
        time = request.body.time;
    }
    async.series([

        function(done)
        {
            mysql.query(`SELECT id_order as id FROM orders WHERE title = AES_ENCRYPT(?) AND phone = AES_ENCRYPT(?) AND email = AES_ENCRYPT(?) AND client_name = AES_ENCRYPT(?) AND isPaid = 0`,
            [titleData, phoneData, emailData, clientNameData],
            function (error, results, fields) {

                if (error) console.log(error);
                
                let new_results = ConvertDataToString(results, [['id']]);
                
                if (new_results[0] !== undefined)
                {
                    outputs = new_results;
                    reply.send(outputs);
                    return;

                }
                console.log(outputs)
                done();
            });
            
        },
        function(done)
        {
            if (outputs.length == 0)
            {
                mysql.query(`INSERT INTO orders SET title = AES_ENCRYPT(?), phone = AES_ENCRYPT(?), email = AES_ENCRYPT(?), client_name = AES_ENCRYPT(?), price = ?, clients = AES_ENCRYPT(?), date_start = ?, date_end = ?, ${idServiceColumn} = ?, time = ?`,
                [titleData, phoneData, emailData, clientNameData, request.body.price, clientsData, request.body.date_start, request.body.date_end, request.body.idService, time], 
                function (error, results, fields) {
    
                    if (error) console.log(error);
                    
                });

            }
            
            done();
        },
        function(done)
        {
            if (outputs.length == 0)
            {
                
                mysql.query(`SELECT id_order as id FROM orders ORDER BY id_order DESC LIMIT 1`,
                function (error, results, fields) {
    
                    if (error) console.log(error);
                    console.log(`results: ${results}`)
                    let new_results = ConvertDataToString(results, [['id']]);
                    
                    outputs = new_results;
                    console.log(outputs)
                    reply.send(outputs);
                    return;
                });
            }
            
            
        }
        
    ], function(err){
        console.log(outputs)
        if (err) console.log(err);
        reply.send(outputs);
    })  
})

router.put('/orders', function(request, reply){

    if (request.query.success !== undefined)
    {
        let outputs = [];
        let idServiceColumn = '';
        let id = request.body.id;
        const id_order = request.body.id_order;
        const payment_id = request.body.payment_id;
        let type = request.body.type;
        console.log(request.body)
        if (type == 'relax')
        {
            idServiceColumn = 'id_relax'
        }
        else
        if(type == 'treatments')
        {
            idServiceColumn = 'id_treatment'
        }
        else
        if(type == 'tours')
        {
            idServiceColumn = 'id_tour'
        }

        async.series([
            function(done)
            {
                mysql.query(`UPDATE orders SET isPaid = true, payment_id = ? WHERE ${idServiceColumn} = ? AND id_order = ?`,
                [payment_id, id, id_order],
                function (error, results) {
        
                    if (error) console.log(error);
        
                    done();
                });
            
                
                },
            function(done)
            {//`UPDATE ${type} as table1 SET table1.count = (SELECT table2.count - 1  FROM (SELECT count FROM ${type} WHERE ${idServiceColumn} = ?) as table2) WHERE table1.${idServiceColumn} = ?`
                if (type == 'relax') type += '_';
                mysql.query(`UPDATE ${type} as table1 JOIN ${type} as table2 ON table2.${idServiceColumn} = ? SET table1.count = table2.count - 1 WHERE table1.${idServiceColumn} = ? AND table1.count > 0`,
                [id, id],
                function (error, results, fields) {
    
                    if (error) console.log(error);
                    
                    done();
                });
                
            },
            // function(done)
            // {
                
            //     mysql.query(`SELECT count FROM ${type} WHERE ${idServiceColumn} = ?`,
            //     [id], 
            //     function (error, results, fields) {
    
            //         if (error) console.log(error);
            //         outputs = ConvertDataToString(results, [['count']])
            //         done();
            //     });
                
            // },
            function(done)
            {
                
                mysql.query(`SELECT date_start, date_end, time, AES_DECRYPT(client_name, '${keysForTables.orders.client_name}') as client_name, AES_DECRYPT(clients, '${keysForTables.orders.clients}') as clients, price, AES_DECRYPT(title, '${keysForTables.orders.title}') as title, AES_DECRYPT(email, '${keysForTables.orders.email}') as email FROM orders WHERE ${idServiceColumn} = ? AND id_order = ?`,
                [id, id_order], 
                function (error, results, fields) {
    
                    if (error) console.log(error);
                    const data = ConvertDataToString(results, [['date_start'], ['date_end'], ['client_name'], ['clients'], ['price'], ['title'], ['email']]);
                    outputs = data;
                    done();
                });
                
            }
            
        ], function(err){
    
            if (err) console.log(err);
            reply.send(outputs);
        })  
           
                
                
    }
    else
    if (request.query.id !== undefined)
    {

        let time = '';
        const titleData = [request.body.title, keysForTables.orders.title];
        const phoneData = [request.body.phone, keysForTables.orders.phone];
        const emailData = [request.body.email, keysForTables.orders.email];
        const clientNameData = [request.body.client_name, keysForTables.orders.client_name];
        const clientsData = [request.body.clients.join(', '), keysForTables.orders.clients];
        
        if (request.body.time === undefined)
        {
            time = null;
        }
        else
        {
            time = request.body.time;
        }
    
        mysql.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                return;
            }
            
            connection.query('UPDATE orders SET title = AES_ENCRYPT(?), phone = AES_ENCRYPT(?), email = AES_ENCRYPT(?), client_name = AES_ENCRYPT(?), clients = AES_ENCRYPT(?), price = ?, date_start = ?, date_end = ?, time = ? WHERE id_order = ?',
            [titleData, phoneData, emailData, clientNameData, clientsData, request.body.price, request.body.date_start, request.body.date_end, time, request.query.id],
            function (error, results) {
    
                connection.release();
                if (error) console.log(error);
    
                reply.sendStatus(200);
            });
        })
    }
})

router.delete('/orders', function(request, reply){
console.log(request.body.id)
    deleteFromDB('orders', 'order', request.body.id, reply);
   
})

router.get('/treatment', function(request, reply){

    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
    if (request.query.title != undefined)
    {
        sql = `SELECT AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as title, AES_DECRYPT(treatments.services, '${keysForTables.treatment.services}') as services, AES_DECRYPT(treatments.photos, '${keysForTables.treatment.photos}') as photos, AES_DECRYPT(treatments.address, '${keysForTables.treatment.address}') as address, AES_DECRYPT(treatments.type, '${keysForTables.treatment.type}') as type, AES_DECRYPT(treatments.coordinates, '${keysForTables.treatment.coordinates}') as coordinates, AES_DECRYPT(treatments.description, '${keysForTables.treatment.description}') as description,  AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom, AES_DECRYPT(treatments.payment_term, '${keysForTables.treatment.payment_term}') as payment_term, treatments.price, AES_DECRYPT(treatments.program, '${keysForTables.treatment.program}') as program, treatments.id_city as id_city, treatments.id_treatment as id, countries.id_country as id_country, treatments.pricePerChild as pricePerChild, treatments.pricePerTeenager as pricePerTeenager, treatments.pricePerPet as pricePerPet, treatments.count as count, treatments.count_people as count_people FROM treatments INNER JOIN cities ON cities.id_city = treatments.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE treatments.title = AES_ENCRYPT('${request.query.title}', '${keysForTables.treatment.title}')`;
    }
    else
    if (request.query.type != undefined)
    {
        sql = `SELECT AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as title, AES_DECRYPT(treatments.services, '${keysForTables.treatment.services}') as services, AES_DECRYPT(treatments.photos, '${keysForTables.treatment.photos}') as photos, AES_DECRYPT(treatments.address, '${keysForTables.treatment.address}') as address, AES_DECRYPT(treatments.type, '${keysForTables.treatment.type}') as type, AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom, treatments.price as price, treatments.id_treatment as id, treatments.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, treatments.count_people as count_people, treatments.discount as discount FROM treatments INNER JOIN cities ON cities.id_city = treatments.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE treatments.type = AES_ENCRYPT('${request.query.type}', '${keysForTables.treatment.type}')`;
    }
    if (request.query.only != undefined)
    {
        sql = `SELECT treatments.id_treatment as id, AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as title, AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom FROM treatments`;
    }
    else
    {
        sql = `SELECT AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as title, AES_DECRYPT(treatments.services, '${keysForTables.treatment.services}') as services, AES_DECRYPT(treatments.photos, '${keysForTables.treatment.photos}') as photos, AES_DECRYPT(treatments.address, '${keysForTables.treatment.address}') as address, AES_DECRYPT(treatments.type, '${keysForTables.treatment.type}') as type, AES_DECRYPT(treatments.coordinates, '${keysForTables.treatment.coordinates}') as coordinates, AES_DECRYPT(treatments.description, '${keysForTables.treatment.description}') as description, AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom, AES_DECRYPT(treatments.payment_term, '${keysForTables.treatment.payment_term}') as payment_term, treatments.price, treatments.id_treatment as id, treatments.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, AES_DECRYPT(treatments.program, '${keysForTables.treatment.program}') as program, treatments.discount as discount, treatments.count as count, treatments.count_people as count_people FROM treatments INNER JOIN cities ON cities.id_city = treatments.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country`;
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
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'], ['count'], ['count_people'], ['payment_term'],
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['program'], ['pricePerChild'], ['pricePerTeenager'], ['pricePerPet']]);

            if (request.query.markdown !== undefined)
            {
                
                for (let key in new_results)
                {
    
                   new_results[key].program = parseMarkdownToHTML(new_results[key].program);
                //    new_results[key].description = parseMarkdownToHTML(new_results[key].description);
                }
            }
            reply.send(new_results);
        });
    })
})

router.post('/treatment', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    const dataTitle = [request.body.title, keysForTables.treatment.title];
    const dataAddress = [request.body.address, keysForTables.treatment.address];
    const dataDescription = [request.body.description, keysForTables.treatment.description];
    const dataServices = [JSON.stringify(request.body.services), keysForTables.treatment.services];
    const dataProgram = [request.body.program, keysForTables.treatment.program];
    const dataCoordinates = [request.body.coordinates.join(','), keysForTables.treatment.coordinates];
    const dataPhotos = [request.body.photosPath.join(), keysForTables.treatment.photos];
    const dataType = [request.body.type.toLowerCase(), keysForTables.treatment.type];
    const dataTypeOfRoom = [request.body.typeOfRoom, keysForTables.treatment.typeOfRoom];
    const dataPaymentTerm = [request.body.payment_term, keysForTables.treatment.payment_term];
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO treatments  SET title = AES_ENCRYPT(?), address = AES_ENCRYPT(?), description = AES_ENCRYPT(?), services = AES_ENCRYPT(?), program = AES_ENCRYPT(?), coordinates = AES_ENCRYPT(?), photos = AES_ENCRYPT(?), price = ?, type = AES_ENCRYPT(?), typeOfRoom = AES_ENCRYPT(?), count_people = ?, pricePerChild = ?, pricePerTeenager = ?, pricePerPet = ?, payment_term = AES_ENCRYPT(?), id_city = ?',
        [dataTitle, dataAddress, dataDescription, dataServices, dataProgram, dataCoordinates, dataPhotos, request.body.price, dataType, dataTypeOfRoom, request.body.count_people, request.body.pricePerChild, request.body.pricePerTeenager, request.body.pricePerPet, dataPaymentTerm, request.body.idCity], function (error, results) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/treatment', function(request, reply){
    
    let fields = [];
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    Object.keys(request.body).map((key)=>{

        switch (key)
        {
            case 'title':
            {
                fields.push(['title', request.body.title, keysForTables.treatment.title])
                break;
            }
            case 'address':
            {
                fields.push(['address', request.body.address, keysForTables.treatment.address])
                break;
            }
            case 'description':
            {
                fields.push(['description', request.body.description, keysForTables.treatment.description])
                break;
            }
            case 'services':
            {
                fields.push(['services', JSON.stringify(request.body.services), keysForTables.treatment.services])
                break;
            }
            case 'coordinates':
            {
                fields.push(['coordinates', request.body.coordinates.join(','), keysForTables.treatment.coordinates])
                break;
            }
            case 'photosPath':
            {
                fields.push(['photos', request.body.photosPath.join(), keysForTables.treatment.photos])
                break;
            }
            case 'type':
            {
                fields.push(['type', request.body.type.toLowerCase(), keysForTables.treatment.type])
                break;
            }
            case 'typeOfRoom':
            {
                fields.push(['typeOfRoom', request.body.typeOfRoom, keysForTables.treatment.typeOfRoom])
                break;
            }
            case 'program':
            {
                fields.push(['program', request.body.program, keysForTables.treatment.program])
                break;
            }
            case 'payment_term':
            {
                fields.push(['payment_term', request.body.payment_term, keysForTables.treatment.payment_term])
                break;
            }
            case 'id_promocode':
            {
                fields.push(['id_promocode', request.body.id_promocode])
                break;
            }
            case 'id_city':
            {
                fields.push(['id_city', request.body.id_city])
            }
        }
    })

    let sql = sqlQueryUpdate('treatments', fields)
    sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_treatment', 'IN')
    
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

router.delete('/treatment', function(request, reply){

    deleteFromDB('treatment', 'treatment', request.body.id, reply);

})

router.get('/promocode', function(request, reply){

    let sql = '';
    console.log(request.query.category !== undefined && request.query.id !== undefined && request.query.promocode !== undefined)
    
    if (request.query.category !== undefined && request.query.id !== undefined && request.query.promocode !== undefined)
    {
        const id = request.query.id;
        const promocode = request.query.promocode;
        let table = request.query.category;
        if (table == 'relax') table += '_';
        let id_column = '';
        switch(table)
        {
            case 'relax_': id_column = 'id_relax'; break;

            case 'treatment': 
            {
                table = 'treatments';
                id_column = 'id_treatment'; 
                break;
            }

        }
        sql = `SELECT promocode.discount as discount FROM promocode WHERE promocode.id_code = (SELECT ${table}.id_promocode FROM ${table} WHERE ${table}.${id_column} = ${id}) AND promocode.name = AES_ENCRYPT('${promocode}', '${keysForTables.promocode.name}')`;

        console.log(sql)
    }
    else
    if (request.query.id != undefined)
    {
        sql = `SELECT AES_DECRYPT(name, '${keysForTables.promocode.name}') as name, id_code as id, discount FROM promocode WHERE id_code = ${request.query.id}`;
    }
    else
    {
        sql = `SELECT AES_DECRYPT(name, '${keysForTables.promocode.name}') as name, id_code as id, discount FROM promocode`;
    }
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql, 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);
            let new_results = ConvertDataToString(results, [['name'], ['id'], ['discount']]);
            console.log(results)
            reply.send(new_results);
        });
    })
})

router.post('/promocode', function(request, reply){
    

    const dataName = [request.body.name, keysForTables.promocode.name];
    let id_code = 0;

    async.series([
        function(done)
        {
            mysql.query('INSERT INTO promocode SET name = AES_ENCRYPT(?), discount = ?',
            [dataName, request.body.discount], 
            function (error, results, fields) {

                if (error) console.log(error);

                 done();
            });
            
        },
        function(done)
        {
            mysql.query('SELECT id_code FROM promocode WHERE name = AES_ENCRYPT(?)',
            [dataName],
            function (error, results, fields) {

                if (error) console.log(error);
               
                id_code = {id_code: results[0].id_code};
                console.log(id_code);
                done();
            });
            
        }
        
    ], function(err){

        if (err) console.log(err);
        reply.send(id_code);
    })  

})

router.put('/promocode', function(request, reply){

    let sql = sqlQueryUpdate('promocode', 
                             [['name', request.body.name, keysForTables.promocode.name],
                              ['discount', request.body.discount]])
    sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_code', 'IN')
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

router.delete('/promocode', function(request, reply){

    deleteFromDB('promocode', 'code', request.body.id, reply);

})

router.get('/Saint-Petersburg', function(request, reply){

    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
 
    if (request.query.type == 'all')
    {

        sql = `(SELECT AES_DECRYPT(treatments.title, '${keysForTables.treatment.title}') as title, AES_DECRYPT(treatments.services, '${keysForTables.treatment.services}') as services, AES_DECRYPT(treatments.photos, '${keysForTables.treatment.photos}') as photos, AES_DECRYPT(treatments.address, '${keysForTables.treatment.address}') as address, AES_DECRYPT(treatments.type, '${keysForTables.treatment.type}') as type, AES_DECRYPT(treatments.typeOfRoom, '${keysForTables.treatment.typeOfRoom}') as typeOfRoom, treatments.price as price, treatments.count_people as count_people, treatments.id_treatment as id, treatments.discount as discount, treatments.id_city as id_city FROM treatments INNER JOIN cities ON cities.id_city = treatments.id_city WHERE cities.name = AES_ENCRYPT('Санкт-Петербург', '${keysForTables.cities.name}')) UNION (SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price as price, relax_.count_people as count_people, relax_.id_relax as id, relax_.discount as discount, relax_.id_city as id_city FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city WHERE cities.name = AES_ENCRYPT('Санкт-Петербург', '${keysForTables.cities.name}'))`;
        console.log(sql)
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
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'], ['count'], ['count_people'],
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['stars'], ['pricePerChild'], ['pricePerTeenager'], ['pricePerPet']]);
            reply.send(new_results);
        });
    })
})

router.get('/relax', function(request, reply){

    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
    if (request.query.title != undefined)
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.coordinates, '${keysForTables.relax.coordinates}') as coordinates, AES_DECRYPT(relax_.description, '${keysForTables.relax.description}') as description,  AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, AES_DECRYPT(relax_.payment_term, '${keysForTables.relax.payment_term}') as payment_term, relax_.price, relax_.stars as stars, relax_.id_city as id_city, relax_.id_relax as id, countries.id_country as id_country, relax_.pricePerChild as pricePerChild, relax_.discount as discount, relax_.count as count, relax_.count_people as count_people FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.title = AES_ENCRYPT('${request.query.title}', '${keysForTables.relax.title}')`;
    }
    else
    if (request.query.type != undefined)
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price, relax_.id_relax as id, relax_.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, relax_.stars as stars, relax_.count as count, relax_.discount as discount, relax_.count_people as count_people FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.type = AES_ENCRYPT('${request.query.type}', '${keysForTables.relax.type}')`;
    }
    else
    if (request.query.only != undefined)
    {
        sql = `SELECT relax_.id_relax as id, AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom FROM relax_`
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
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'], ['count'], ['count_people'], ['payment_term'],
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['stars'], ['pricePerChild'], ['pricePerTeenager'], ['pricePerPet']]);

            if (request.query.markdown !== undefined)
            {
                
                for (let key in new_results)
                {
                //    new_results[key].description = parseMarkdownToHTML(new_results[key].description);
                }
            }

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
    const dataPaymentTerm = [request.body.payment_term, keysForTables.relax.payment_term];

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO relax_  SET title = AES_ENCRYPT(?), address = AES_ENCRYPT(?), description = AES_ENCRYPT(?), stars = ?, services = AES_ENCRYPT(?), coordinates = AES_ENCRYPT(?), photos = AES_ENCRYPT(?), price = ?, pricePerChild = ?, pricePerTeenager = ?, pricePerPet = ? type = AES_ENCRYPT(?), typeOfRoom = AES_ENCRYPT(?), count_people = ?, payment_term = AES_ENCRYPT(?), id_city = ?',
        [dataTitle, dataAddress, dataDescription, request.body.stars, dataServices, dataCoordinates, dataPhotos, request.body.price, request.body.pricePerChild, request.body.pricePerTeenager, request.body.pricePerPet, dataType, dataTypeOfRoom, request.body.count_people, dataPaymentTerm, request.body.idCity], function (error, results) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/relax', function(request, reply){
    
    let fields = [];
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    Object.keys(request.body).map((key)=>{

        switch (key)
        {
            case 'title':
            {
                fields.push(['title', request.body.title, keysForTables.relax.title])
                break;
            }
            case 'address':
            {
                fields.push(['address', request.body.address, keysForTables.relax.address])
                break;
            }
            case 'description':
            {
                fields.push(['description', request.body.description, keysForTables.relax.description])
                break;
            }
            case 'services':
            {
                fields.push(['services', JSON.stringify(request.body.services), keysForTables.relax.services])
                break;
            }
            case 'coordinates':
            {
                fields.push(['coordinates', request.body.coordinates.join(','), keysForTables.relax.coordinates])
                break;
            }
            case 'photosPath':
            {
                fields.push(['photos', request.body.photosPath.join(), keysForTables.relax.photos])
                break;
            }
            case 'type':
            {
                fields.push(['type', request.body.type.toLowerCase(), keysForTables.relax.type])
                break;
            }
            case 'typeOfRoom':
            {
                fields.push(['typeOfRoom', request.body.typeOfRoom, keysForTables.relax.typeOfRoom])
                break;
            }
            case 'id_promocode':
            {
                fields.push(['id_promocode', request.body.id_promocode])
                break;
            }
            case 'id_city':
            {
                fields.push(['id_city', request.body.id_city])
                break;
            }
            case 'payment_term':
            {
                fields.push(['payment_term', request.body.payment_term, keysForTables.relax.payment_term])
                break;
            }
        }
    })

    let sql = sqlQueryUpdate('relax_', fields)
    sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_relax', 'IN')
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

router.delete('/relax', function(request, reply){

    deleteFromDB('relax_', 'relax', request.body.id, reply);

})

router.get('/tours', function(request, reply){

    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
    if (request.query.title != undefined)
    {

        sql = `SELECT AES_DECRYPT(tours.title, '${keysForTables.tours.title}') as title, AES_DECRYPT(tours.services, '${keysForTables.tours.services}') as services, AES_DECRYPT(tours.photos, '${keysForTables.tours.photos}') as photos, AES_DECRYPT(tours.address, '${keysForTables.tours.address}') as address, AES_DECRYPT(tours.type, '${keysForTables.tours.type}') as type, AES_DECRYPT(tours.coordinates, '${keysForTables.tours.coordinates}') as coordinates, AES_DECRYPT(tours.description, '${keysForTables.tours.description}') as description,  AES_DECRYPT(tours.program, '${keysForTables.tours.program}') as program, AES_DECRYPT(tours.payment_term, '${keysForTables.tours.payment_term}') as payment_term, relax_.price,tours.id_tour as id, countries.id_country as id_country, relax_.pricePerChild as pricePerChild, relax_.discount as discount, relax_.count as count, relax_.count_people as count_people FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.title = AES_ENCRYPT('${request.query.title}', '${keysForTables.relax.title}')`;
    }
    else
    if (request.query.type != undefined)
    {

        sql = `SELECT AES_DECRYPT(relax_.title, '${keysForTables.relax.title}') as title, AES_DECRYPT(relax_.services, '${keysForTables.relax.services}') as services, AES_DECRYPT(relax_.photos, '${keysForTables.relax.photos}') as photos, AES_DECRYPT(relax_.address, '${keysForTables.relax.address}') as address, AES_DECRYPT(relax_.type, '${keysForTables.relax.type}') as type, AES_DECRYPT(relax_.typeOfRoom, '${keysForTables.relax.typeOfRoom}') as typeOfRoom, relax_.price, relax_.id_relax as id, relax_.id_city as id_city, countries.id_country as id_country, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as county_name, AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as city_name, relax_.stars as stars, relax_.count as count, relax_.discount as discount, relax_.count_people as count_people FROM relax_ INNER JOIN cities ON cities.id_city = relax_.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE relax_.type = AES_ENCRYPT('${request.query.type}', '${keysForTables.relax.type}')`;
    }
    else
    if (request.query.only != undefined)
    {
        sql = `SELECT id_tour as id, AES_DECRYPT(title, '${keysForTables.tours.title}') as title FROM tours`
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
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'], ['count'], ['count_people'], ['payment_term']
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['stars'], ['pricePerChild'], ['pricePerTeenager'], ['pricePerPet']]);

            if (request.query.markdown !== undefined)
            {
                
                for (let key in new_results)
                {
                //    new_results[key].description = parseMarkdownToHTML(new_results[key].description);
                }
            }

            reply.send(new_results);
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

    const dataTitle = [request.body.title, keysForTables.tours.title];
    const dataAddress = [request.body.address, keysForTables.tours.address];
    const dataDescription = [request.body.description, keysForTables.tours.description];
    const dataServices = [JSON.stringify(request.body.services), keysForTables.tours.services];
    const dataCoordinates = [request.body.coordinates, keysForTables.tours.coordinates];
    const dataPhotos = [request.body.photos, keysForTables.tours.photos];
    const dataType = [request.body.type.toLowerCase(), keysForTables.tours.type];
    
    let id_tour = 0;

    async.series([
        
        function(done)
        {
            mysql.query('INSERT INTO tours  SET title = AES_ENCRYPT(?), address = AES_ENCRYPT(?), description = AES_ENCRYPT(?), services = AES_ENCRYPT(?), coordinates = AES_ENCRYPT(?), photos = AES_ENCRYPT(?), price = ?, pricePerChild = ?, pricePerTeenager = ?, pricePerPet = ?, type = AES_ENCRYPT(?)',
            [dataTitle, dataAddress, dataDescription, dataServices, dataCoordinates, dataPhotos, request.body.price, request.body.pricePerChild, request.body.pricePerTeenager, request.body.pricePerPet, dataType], 
            function (error, results, fields) {

                if (error) console.log(error);

                done();
            });
            
         },
         function(done)
         {
            mysql.query('SELECT id_tour FROM tours WHERE title = AES_ENCRYPT(?)',
            [dataTitle], 
            function (error, results, fields) {

                if (error) console.log(error);
                
                let new_results  = ConvertDataToString(results, [['title']]);

                id_tour = new_results[0].id_tour;
                done();
            });
            
        },
        function(done)
        {
            mysql.query('INSERT INTO tours_bind_cities SET id_city = ?, id_tour = ?',
            [request.body.id_city, id_tour], 
            function (error, results, fields) {

                if (error) console.log(error);
            
                done();
            });
            
        },
        function(done)
        {
            request.body.id_languages.map(id_language=>{

                
                mysql.query('INSERT INTO tours_bind_languages SET id_language = ?, id_tour = ?',
                [id_language, id_tour], 
                function (error, results, fields) {
    
                    if (error) console.log(error);
                
                });
            })
            
            done();
        },
        function(done)
        {
            request.body.id_typeOfTours.map(id_type=>{

                
                mysql.query('INSERT INTO tours_bind_typeOfTours SET id_type = ?, id_tour = ?',
                [id_type, id_tour], 
                function (error, results, fields) {
    
                    if (error) console.log(error);
                
                });
            })
            
            done();
        }
        
    ], function(err){

        if (err) console.log(err);
        reply.sendStatus(200);
    })  


})

router.put('/tours', function(request, reply){
    
    let fields = [];
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    Object.keys(request.body).map((key)=>{

        switch (key)
        {
            case 'title':
            {
                fields.push(['title', request.body.title, keysForTables.tours.title])
                break;
            }
            case 'address':
            {
                fields.push(['address', request.body.address, keysForTables.tours.address])
                break;
            }
            case 'description':
            {
                fields.push(['description', request.body.description, keysForTables.tours.description])
                break;
            }
            case 'services':
            {
                fields.push(['services', JSON.stringify(request.body.services), keysForTables.tours.services])
                break;
            }
            case 'coordinates':
            {
                fields.push(['coordinates', request.body.coordinates.join(','), keysForTables.tours.coordinates])
                break;
            }
            case 'photosPath':
            {
                fields.push(['photos', request.body.photosPath.join(), keysForTables.tours.photos])
                break;
            }
            case 'type':
            {
                fields.push(['type', request.body.type.toLowerCase(), keysForTables.tours.type])
                break;
            }
            case 'typeOfRoom':
            {
                fields.push(['typeOfRoom', request.body.typeOfRoom, keysForTables.tours.typeOfRoom])
                break;
            }
            case 'program':
            {
                fields.push(['program', request.body.program, keysForTables.tours.program])
                break;
            }
            case 'payment_term':
            {
                fields.push(['payment_term', request.body.typeOfRoom, keysForTables.tours.typeOfRoom])
                break;
            }
            case 'id_city':
            {
                fields.push(['id_city', request.body.id_city])
                break;
            }
        }
    })

    let sql = sqlQueryUpdate('tours', fields)
    sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_tour', 'IN')
    
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

router.delete('/tours', function(request, reply){

    deleteFromDB('tours', 'tour', request.body.id, reply);

})

router.get('/cruises', function(request, reply){

    let sql = '';
    // console.log('ID: ' + request.query.id + ' TYPE: ' + request.query.type)
    if (request.query.title != undefined)
    {

        sql = `SELECT AES_DECRYPT(cruises.title, '${keysForTables.cruises.title}') as title, AES_DECRYPT(cruises.services, '${keysForTables.cruises.services}') as services, AES_DECRYPT(cruises.photos, '${keysForTables.cruises.photos}') as photos, AES_DECRYPT(cruises.address, '${keysForTables.cruises.address}') as address, AES_DECRYPT(cruises.type, '${keysForTables.cruises.type}') as type, AES_DECRYPT(cruises.typeOfShip, '${keysForTables.cruises.typeOfShip}') as typeOfShip, AES_DECRYPT(cruises.titleOfCompany, '${keysForTables.cruises.titleOfCompany}') as titleOfCompany, AES_DECRYPT(cruises.coordinates, '${keysForTables.cruises.coordinates}') as coordinates, AES_DECRYPT(cruises.description, '${keysForTables.cruises.description}') as description,  AES_DECRYPT(cruises.typeOfRoom, '${keysForTables.cruises.typeOfRoom}') as typeOfRoom, cruises.price, cruises.stars as stars, cruises.id_city as id_city, cruises.id_cruise as id, countries.id_country as id_country, cruises.pricePerChild as pricePerChild, cruises.discount as discount, cruises.count as count, cruises.count_people as count_people FROM cruises INNER JOIN cities ON cities.id_city = cruises.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE cruises.title = AES_ENCRYPT('${request.query.title}', '${keysForTables.cruises.title}')`;
    }
    else
    if (request.query.type != undefined)
    {

        sql = `SELECT AES_DECRYPT(cruises.title, '${keysForTables.cruises.title}') as title, AES_DECRYPT(cruises.services, '${keysForTables.cruises.services}') as services, AES_DECRYPT(cruises.photos, '${keysForTables.cruises.photos}') as photos, AES_DECRYPT(cruises.address, '${keysForTables.cruises.address}') as address, AES_DECRYPT(cruises.type, '${keysForTables.cruises.type}') as type, AES_DECRYPT(cruises.typeOfShip, '${keysForTables.cruises.typeOfShip}') as typeOfShip, AES_DECRYPT(cruises.titleOfCompany, '${keysForTables.cruises.titleOfCompany}') as titleOfCompany, AES_DECRYPT(cruises.coordinates, '${keysForTables.cruises.coordinates}') as coordinates, AES_DECRYPT(cruises.description, '${keysForTables.cruises.description}') as description,  AES_DECRYPT(cruises.typeOfRoom, '${keysForTables.cruises.typeOfRoom}') as typeOfRoom, cruises.price, cruises.stars as stars, cruises.id_city as id_city, cruises.id_cruise as id, countries.id_country as id_country, cruises.pricePerChild as pricePerChild, cruises.discount as discount, cruises.count as count, cruises.count_people as count_people FROM cruises INNER JOIN cities ON cities.id_city = cruises.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country WHERE cruises.type = AES_ENCRYPT('${request.query.type}', '${keysForTables.cruises.type}')`;
    }
    else
    if (request.query.only != undefined)
    {
        sql = `SELECT cruises.id_cruise as id, AES_DECRYPT(cruises.title, '${keysForTables.cruises.title}') as title, AES_DECRYPT(cruises.typeOfRoom, '${keysForTables.cruises.typeOfRoom}') as typeOfRoom FROM cruises`
    }
    else
    {

        sql = `SELECT AES_DECRYPT(cruises.title, '${keysForTables.cruises.title}') as title, AES_DECRYPT(cruises.services, '${keysForTables.cruises.services}') as services, AES_DECRYPT(cruises.photos, '${keysForTables.cruises.photos}') as photos, AES_DECRYPT(cruises.address, '${keysForTables.cruises.address}') as address, AES_DECRYPT(cruises.type, '${keysForTables.cruises.type}') as type, AES_DECRYPT(cruises.typeOfShip, '${keysForTables.cruises.typeOfShip}') as typeOfShip, AES_DECRYPT(cruises.titleOfCompany, '${keysForTables.cruises.titleOfCompany}') as titleOfCompany, AES_DECRYPT(cruises.coordinates, '${keysForTables.cruises.coordinates}') as coordinates, AES_DECRYPT(cruises.description, '${keysForTables.cruises.description}') as description,  AES_DECRYPT(cruises.typeOfRoom, '${keysForTables.cruises.typeOfRoom}') as typeOfRoom, cruises.price, cruises.stars as stars, cruises.id_city as id_city, cruises.id_cruise as id, countries.id_country as id_country, cruises.pricePerChild as pricePerChild, cruises.discount as discount, cruises.count as count, cruises.count_people as count_people FROM cruises INNER JOIN cities ON cities.id_city = cruises.id_city INNER JOIN countries_bind_cities ON countries_bind_cities.id_city = cities.id_city INNER JOIN countries ON countries.id_country = countries_bind_cities.id_country`;
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
            ['photos', 'images'], ['description'], ['id_city'], ['coordinates'], ['discount'], ['count'], ['count_people'], ['payment_term'],
            ['typeOfRoom'], ['id_country'], ['county_name'], ['city_name'], ['stars'], ['pricePerChild'], ['pricePerTeenager'], ['pricePerPet']]);

            if (request.query.markdown !== undefined)
            {
                
                for (let key in new_results)
                {
                //    new_results[key].description = parseMarkdownToHTML(new_results[key].description);
                }
            }

            reply.send(new_results);
        });
    })
})

router.post('/cruises', function(request, reply){
    
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    const dataTitle = [request.body.title, keysForTables.cruises.title];
    const dataAddress = [request.body.address, keysForTables.cruises.address];
    const dataDescription = [request.body.description, keysForTables.cruises.description];
    const dataServices = [JSON.stringify(request.body.services), keysForTables.cruises.services];
    const dataCoordinates = [request.body.coordinates.join(','), keysForTables.cruises.coordinates];
    const dataPhotos = [request.body.photosPath.join(), keysForTables.cruises.photos];
    const dataType = [request.body.type.toLowerCase(), keysForTables.cruises.type];
    const dataTypeOfRoom = [request.body.typeOfRoom, keysForTables.cruises.typeOfRoom];
    const dataTypeOfShip = [request.body.typeOfShip, keysForTables.cruises.typeOfShip];
    const dataTitleOfCompany = [request.body.titleOfCompany, keysForTables.cruises.titleOfCompany];
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
         
        
        connection.query('INSERT INTO cruises  SET title = AES_ENCRYPT(?), address = AES_ENCRYPT(?), description = AES_ENCRYPT(?), services = AES_ENCRYPT(?), coordinates = AES_ENCRYPT(?), photos = AES_ENCRYPT(?), price = ?, type = AES_ENCRYPT(?), typeOfRoom = AES_ENCRYPT(?), typeOfShip = ?, typeOfCompany = ?, count_people = ?, count = ?, duration = ?, pricePerChild = ?, pricePerTeenager = ?, pricePerPet = ?, id_city = ?',
        [dataTitle, dataAddress, dataDescription, dataServices, dataCoordinates, dataPhotos, request.body.price, dataType, dataTypeOfRoom, dataTypeOfShip, dataTitleOfCompany, request.body.count_people, request.body.count, request.body.duration, request.body.pricePerChild, request.body.pricePerTeenager, request.body.pricePerPet, request.body.idCity], function (error, results) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/cruises', function(request, reply){
    
    let fields = [];
    let paths = []
    request.body.photosPath.map((path)=>{

        paths.push(transliterate(path));
    })
    request.body.photosPath = paths;

    Object.keys(request.body).map((key)=>{

        switch (key)
        {
            case 'title':
            {
                fields.push(['title', request.body.title, keysForTables.cruises.title])
                break;
            }
            case 'address':
            {
                fields.push(['address', request.body.address, keysForTables.cruises.address])
                break;
            }
            case 'description':
            {
                fields.push(['description', request.body.description, keysForTables.cruises.description])
                break;
            }
            case 'services':
            {
                fields.push(['services', JSON.stringify(request.body.services), keysForTables.cruises.services])
                break;
            }
            case 'coordinates':
            {
                fields.push(['coordinates', request.body.coordinates.join(','), keysForTables.cruises.coordinates])
                break;
            }
            case 'photosPath':
            {
                fields.push(['photos', request.body.photosPath.join(), keysForTables.cruises.photos])
                break;
            }
            case 'type':
            {
                fields.push(['type', request.body.type.toLowerCase(), keysForTables.cruises.type])
                break;
            }
            case 'typeOfRoom':
            {
                fields.push(['typeOfRoom', request.body.typeOfRoom, keysForTables.cruises.typeOfRoom])
                break;
            }
            case 'typeOfShip':
            {
                fields.push(['typeOfShip', request.body.typeOfShip, keysForTables.cruises.typeOfShip])
                break;
            }
            case 'titleOfCompany':
            {
                fields.push(['titleOfCompany', request.body.titleOfCompany, keysForTables.cruises.titleOfCompany])
                break;
            }
            case 'duration':
            {
                fields.push(['duration', request.body.duration])
                break;
            }
            case 'id_city':
            {
                fields.push(['id_city', request.body.id_city])
                break;
            }
        }
    })

    let sql = sqlQueryUpdate('cruises', fields)
    sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_relax', 'IN')
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

router.delete('/cruises', function(request, reply){

    deleteFromDB('cruises', 'cruise', request.body.id, reply);

})

router.get('/roles', function(request, reply){

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(`SELECT id_role as id, AES_DECRYPT(name, '${keysForTables.roles.name}') as name, AES_DECRYPT(pages, '${keysForTables.roles.pages}') as pages FROM roles`,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            let new_results = ConvertDataToString(results, [['id'], ['name'], ['pages']]);

            reply.send(new_results);
        });
    })
})

router.post('/roles', function(request, reply){

    const dataName = [request.body.name, keysForTables.roles.name];
    const dataPages = [request.body.pages.join(', '), keysForTables.roles.pages];

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(`INSERT INTO roles SET name = AES_ENCRYPT(?), pages = AES_ENCRYPT(?)`,
        [dataName, dataPages],
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/roles', function(request, reply){

    const dataName = [request.body.name, keysForTables.roles.name];
    const dataPages = [request.body.pages.join(', '), keysForTables.roles.pages];

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(`UPDATE roles SET name = AES_ENCRYPT(?), pages = AES_ENCRYPT(?) WHERE id_role = ?`,
        [dataName, dataPages, request.body.id],
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.delete('/roles', function(request, reply){

    async.series([
        function(done)
        {
            mysql.query(`UPDATE employees SET id_role = NULL WHERE id_role = ?`,
            [request.body.id],
            function (error, results) {
    
                if (error) console.log(error);
    
                done();
            });
      
            
         },
        function(done)
        {
            mysql.query(`DELETE FROM roles WHERE id_role = ?`,
            [request.body.id],
            function (error, results) {

                if (error) console.log(error);

                done();
            });
            
        }
        
        
    ], function(err){

        if (err) console.log(err);
        reply.sendStatus(200);
    })  
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

    
    deleteFromDB('languages', 'language', request.body.id, reply);
   
})

router.get('/employees', function(request, reply){

    let sql = '';

    if (request.query.verify !== undefined)
    {
        sql = `SELECT AES_DECRYPT(roles.pages, '${keysForTables.roles.pages}') as pages FROM employees INNER JOIN roles ON roles.id_role = employees.id_role WHERE employees.login = AES_ENCRYPT('${request.query.login}', '${keysForTables.employees.login}') AND employees.password = AES_ENCRYPT('${request.query.password}', '${keysForTables.employees.password}')`
    }
    else
    if (request.query.for == 'roles')
    {
        
        sql = `SELECT id_employee as id, AES_DECRYPT(name, '${keysForTables.employees.name}') as name, AES_DECRYPT(profession, '${keysForTables.employees.profession}') as profession, id_role FROM employees`
    }
    else
    {
        sql = `SELECT id_employee as id, AES_DECRYPT(name, '${keysForTables.employees.name}') as name, AES_DECRYPT(email, '${keysForTables.employees.email}') as email, AES_DECRYPT(phone, '${keysForTables.employees.phone}') as phone, AES_DECRYPT(description, '${keysForTables.employees.description}') as description, AES_DECRYPT(password, '${keysForTables.employees.password}') as password, AES_DECRYPT(login, '${keysForTables.employees.login}') as login, AES_DECRYPT(profession, '${keysForTables.employees.profession}') as profession, salary FROM employees`;
    }
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql,
        function (error, results, fields) {
        
            connection.release();
            if (error) console.log(error);
           
            let new_results = ConvertDataToString(results, [['id'], ['name'], ['email'], ['salary'],
                                                            ['phone', 'phone', true], ['description'], 
                                                            ['password'], ['login'], ['profession'], 
                                                            ['id_role'], ['pages']]);
            let employees = [];
           
            if (request.query.verify !== undefined)
            {
               // console.log(new_results[0].pages)
                if (new_results[0] !== undefined)
                    employees = new_results[0].pages.split(', ');
            }
            else
            if (request.query.for == 'roles')
            {
                employees = new_results;

            }
            else
            if (Boolean(request.query.isHire == 'true'))
            {
                new_results.map((res)=>{
                  
                    if (res.password !== null && res.login !== null)
                    {

                        employees.push(res);
                    }

                })
            }
            else
            {
                new_results.map((res)=>{
                   
                    if (res.password === null && res.login === null)
                    {

                        employees.push(res);
                    }

                })
            }
      
            reply.send(employees);
        });
    })
})

router.post('/employees', function(request, reply){

    
    const dataName = [request.body.name, keysForTables.employees.name]
    const dataEmail = [request.body.email, keysForTables.employees.email];
    const dataPhone = [request.body.phone, keysForTables.employees.phone];
    const dataDescription = [request.body.description, keysForTables.employees.description];
    const dataProfession = [request.body.profession, keysForTables.employees.profession];

    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO employees SET name = AES_ENCRYPT(?), email = AES_ENCRYPT(?), phone = AES_ENCRYPT(?), description = AES_ENCRYPT(?), profession = AES_ENCRYPT(?)',
        [dataName, dataEmail, dataPhone, dataDescription, dataProfession], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.put('/employees', function(request, reply){

    
    let sql = '';
    if (request.query.hire !== undefined)
    {
        sql = sqlQueryUpdate('employees', [['login', transliterate(request.body.login), keysForTables.employees.login],
                                           ['password', request.body.password, keysForTables.employees.password]])
        sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_employee', 'IN')
    }
    else
    if (request.query.changeData !== undefined)
    {
        sql = sqlQueryUpdate('employees', [['login', transliterate(request.body.login), keysForTables.employees.login],
                                           ['password', request.body.password, keysForTables.employees.password],
                                           ['salary', request.body.salary]])
        sql = multiplyConditions(sql, [{value: request.body.id, password: ''}], 'id_employee', 'IN')
    }
    else
    if (request.query.idRole !== undefined)
    {
        sql = sqlQueryUpdate('employees', [['id_role', request.body.id_role]])
        sql = multiplyConditions(sql, [{value: request.body.id_employee}], 'id_employee', 'IN')
    }
    console.log(sql)
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query(sql,
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})

router.delete('/employees', function(request, reply){


    deleteFromDB('employees', 'employee', request.body.id, reply);
   
})

router.get('/countries', function(request, reply){


    let sql = '';
    if (request.query.with == 'description')
    {
        sql = `SELECT id_country as id, AES_DECRYPT(name, '${keysForTables.countries.name}') as name FROM countries`;
    }
    else
    if (request.query.with == 'cities')
    {
        if (request.query.whereCountryName != undefined)
        {
            console.log(request.query.whereCountryName)
            sql = multiplyConditions(`SELECT AES_DECRYPT(cities.name, '${keysForTables.cities.name}') as cityName, AES_DECRYPT(countries.name, '${keysForTables.countries.name}') as countryName, countries.id_country as idCountry, cities.id_city as idCity
            FROM countries INNER JOIN countries_bind_cities as bind ON bind.id_country = countries.id_country INNER JOIN cities ON cities.id_city = bind.id_city`, [{value: request.query.whereCountryName, password: keysForTables.countries.name}], 'countries.name', 'IN');
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
    
    mysql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        
        connection.query('INSERT INTO countries SET name = AES_ENCRYPT(?)',
        [dataName], 
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.sendStatus(200);
        });
    })
})
// router.put('/countries', function(request, reply){

    
//     const dataDescription = [request.body.description];
//     const id = request.body.id;
//     mysql.getConnection(function(err, connection) {
//         if (err) {
//             console.log(err);
//             return;
//         }
        
//         connection.query('UPDATE countries SET description = AES_ENCRYPT(?) WHERE id_country=?',
//         [dataDescription, id], 
//         function (error, results, fields) {

//             connection.release();
//             if (error) console.log(error);

//             reply.sendStatus(200);
//         });
//     })
// })

router.delete('/countries', function(request, reply){

    
    deleteFromDB('countries', 'country', request.body.id, reply);
   
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

    
    deleteFromDB('cities', 'city', request.body.id, reply);
    
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