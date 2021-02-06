import tours from './tours.json';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    let massive = tours;
    res.status(200).json(JSON.stringify(massive));
}