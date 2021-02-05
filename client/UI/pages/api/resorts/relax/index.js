import relaxes from './relaxes.json';
//Вызовется если не будут параметров, что логичны
export default (req, res, err) => {
    if(err)
        console.log(err);
    let massive = relaxes;
    res.status(200).json(JSON.stringify(massive));
}