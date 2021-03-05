import cruises from './cruises.json';
//Вызовется если не будут параметров, что логичны
export default (req, res, err) => {
    if(err)
        console.log(err);
    let massive = cruises;
    res.status(200).json(JSON.stringify(massive));
}