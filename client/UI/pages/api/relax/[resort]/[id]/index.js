import resorts from '../../resort.json';

export default (req, res) => {
    const resort = req.query.resort;
    const id = req.query.id;
    const element = resorts[resort].find((element) => { 
        return element.id == id 
    });
    res.status(200).json(element);
}