const fs = require("fs");
const express = require('express');
const router = express.Router();

router.get('/getHomePage', (request, response)=>{
    fs.readFile("HomePageData/data.json", "utf8", 
                function(error,data){
                    if(error) console.log(error); // если возникла ошибка
                    response.send(data);  // выводим считанные данные
    });
})

module.exports = router;