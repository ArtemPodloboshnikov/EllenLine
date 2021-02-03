import cruises from '../cruises.json';

//Функция 
export default (req, res, err) => {
    if(err)
        return console.log(err);
    let type = req.query.resort;
    res.status(200).json(cruises[type]);
}