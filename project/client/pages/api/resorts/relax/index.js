import global from '../../../global';
//Вызовется если не будут параметров, что логичны
export default (req, res, err) => {
    if(err)
        console.log(err);
    async function getData()
    {
        const relax = await fetch(global.urlServer + '/api' + '/relax');
        const json = await relax.json();
        return json;
    }
    res.status(200).json(JSON.stringify(getData()));
}