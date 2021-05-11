const fs = require("fs");
const path = require('path');
const filesUploader = require('./functions').filesUploader;
const parseMarkdownToHTML = require('./functions').parseMarkdownToHTML;
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
        console.log(path.join(__dirname, "../",  array[key], "/data.json"))
        fs.readFile(path.join(__dirname, "../",  array[key], "/data.json"), "utf8", 
            function(error,data){
                if(error) console.log(error);
                data = JSON.parse(data);
                
                if (isMarkdown)
                {
                    parseMarkdownToHTML(data)
                    
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
        
        parseMarkdownToHTML(data)
    
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

router.post('/relaxPhotos', filesUploader(path.join(__dirname, '../../client/', 'public/', 'images/', 'Relax/')),function(request, reply){

    

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

function deleteFile(nameFile, request, reply)
{
    let flag = false;
    console.log(request, reply)
    request.query.photosName.map((name)=>{
        
        fs.unlink(path.join(nameFile, name), function(err){
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

}
router.delete('/relaxPhotos', function(request, reply){

    deleteFile(path.join(__dirname, '../../client/', 'public/', 'images/', 'Relax/'), request, reply);
    
})

router.post('/toursPhotos', filesUploader(path.join(__dirname, '../../client/', 'public/', 'images/', 'Tours/')),function(request, reply){

    

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

router.post('/treatmentPhotos', filesUploader(path.join(__dirname, '../../client/', 'public/', 'images/', 'Treatment/')),function(request, reply){

    
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

router.delete('/treatmentPhotos', function(request, reply){
    // console.log(request)
    deleteFile(path.join(__dirname, '../../client/', 'public/', 'images/', 'Treatment/'), request, reply);
    
})


module.exports = router;