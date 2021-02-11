const fs = require("fs");
const path = require('path');
const filesUploader = require('./functions').filesUploader;
const markdown = require('markdown').markdown;
const express = require('express');
const router = express.Router();

const name_page = {домашняя: 'HomePageData', условия_оплаты: 'PaymentPageData'};

router.get('/getHomePage', (request, response)=>{
    fs.readFile("HomePageData/data.json", "utf8", 
                function(error,data){
                    if(error) console.log(error); // если возникла ошибка
                    response.send(data);  // выводим считанные данные
    });
})

router.get('/pages', (request, response)=>{

    const category = request.query.category;
    const namePage = request.query.namePage;
    const get = (array, key, isMarkdown=true) =>{

        fs.readFile(array[key] + "/data.json", "utf8", 
            function(error,data){
                if(error) console.log(error);
                data = JSON.parse(data);
                
                if (isMarkdown)
                {
                    for (let value of Object.values(data))
                    {
                     
                        value.content = markdown.toHTML(value.content);
                        
                    }
                    
                }
                
                response.send(data);  // выводим считанные данные
            }
        );
    }
    if (category != undefined)
    {
        const category_page = {payment: 'PaymentPageData', home: 'HomePageData'};
        get(category_page, category)
        
    }

    if (namePage !== undefined)
    {
        get(name_page, namePage, false)
    }
})

router.post('/pages', (request, response)=>{

    const data = request.body;
    console.log(data);
    if (Object.keys(data) != 0)
    {
        
        for (let value of Object.values(data))
        {
            console.log(value)
            value.content = markdown.toHTML(value.content);
            
        }
    
        response.send(data);
    }
})

router.put('/pages', (request, response)=>{

    const data = request.body;
    const namePage = request.query.namePage;
    console.log(namePage);
    if (Object.keys(data) != 0 && namePage !== undefined)
    {
        fs.writeFile(name_page[namePage] + '/data.json', JSON.stringify(data), 
        function (error){

            if(error) console.log(error);
        })

        response.sendStatus(200);
    }
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