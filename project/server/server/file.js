const fs = require("fs");
const path = require('path');
const filesUploader = require('./functions').filesUploader;
const express = require('express');
const router = express.Router();

router.get('/getHomePage', (request, response)=>{
    fs.readFile("HomePageData/data.json", "utf8", 
                function(error,data){
                    if(error) console.log(error); // если возникла ошибка
                    response.send(data);  // выводим считанные данные
    });
})

router.post('/relaxPhotos', filesUploader(path.join('../../client/', 'public/', 'images/', 'RelaxDynamic/')),function(request, reply){

    

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

router.delete('/relaxPhotos', function(request, reply){

    let flag = false;
    request.body.map((name)=>{
        
        fs.unlink(path.join('../../client/', 'public/', 'images/', 'RelaxDynamic/', name), function(err){
            if (err) {
                console.log(err);
            } else 
            {
                console.log("Файл удалён");
                flag = true;
            }
        });
        
    })

    if (flag) reply.sendStatus(200)
    
})

router.post('/toursPhotos', filesUploader("images/Tours"),function(request, reply){

    

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


module.exports = router;