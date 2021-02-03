import cruises from '../../cruises.json';

export default (req, res) => {
    const resort = req.query.resort;
    const id = req.query.id;
    console.log('RESORT: ' + resort);
    console.log('HIS ID: ' + id);
    const element = cruises[resort].find((element) => { 
        return element.id == id 
    });
    res.status(200).json(element);
}