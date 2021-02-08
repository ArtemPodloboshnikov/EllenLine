import tours from '../../tours.json';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    const resort = req.query.resort;
    const id = req.query.id;
    const element = tours[resort].find((element) => {
        return element.id == id
    });
    res.status(200).json(element);
}