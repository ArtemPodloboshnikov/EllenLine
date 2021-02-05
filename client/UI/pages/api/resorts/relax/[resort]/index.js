import relaxes from '../relaxes.json';

//Функция 
export default (req, res, err) => {
    if(err)
        return console.log(err);
    let type = req.query.resort;
    res.status(200).json(relaxes[type]);
}