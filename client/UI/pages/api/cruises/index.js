import cruises from './cruises.json';
//Вызовется если не будут параметров, что логичны
export default (req, res) => {
    let massive = cruises;
    res.status(200).json(JSON.stringify(massive));
}