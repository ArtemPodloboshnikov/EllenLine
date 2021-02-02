import cruises from '../../cruises.json';

export default (req, res) => {
    const resort = req.query.resort;
    const id = req.query.id;
    const element = resorts[resort].find((element) => { 
        return element.idItem == id 
    });
    res.status(200).json(element);
}