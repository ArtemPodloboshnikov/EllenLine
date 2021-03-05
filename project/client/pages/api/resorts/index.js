import resorts from './resorts.json';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    res.status(200).json(resorts);
}