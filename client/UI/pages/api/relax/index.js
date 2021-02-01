import resort from './resort.json';
//Вызовется если не будут параметров, что логичны
export default (req, res) => {
    let massive = resort;
    res.status(200).json(JSON.stringify(massive));
}