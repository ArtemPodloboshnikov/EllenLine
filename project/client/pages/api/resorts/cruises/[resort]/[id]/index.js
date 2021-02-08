import cruises from '../../cruises.json';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    const resort = req.query.resort;
    const id = req.query.id;
    const element = cruises[resort].find((element) => { 
        return element.id == id 
    });
    res.status(200).json(element);
}