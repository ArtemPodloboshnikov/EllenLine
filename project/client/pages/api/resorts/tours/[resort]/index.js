import tours from '../tours.json';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    let type = req.query.resort;
    res.status(200).json(tours[type]);
}