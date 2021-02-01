import resorts from '../resort.json';

//Функция 
export default (req, res, err) => {
    if(err)
        return console.log(err);
    let type = req.query.resort;
    console.log('SERVER');
    console.log(resorts[type]);
    res.status(200).json(resorts[type]);
}