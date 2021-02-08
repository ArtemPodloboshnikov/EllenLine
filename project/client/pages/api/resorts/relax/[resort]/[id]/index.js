// import relaxes from '../../relaxes.json';
import global from '../../../../../global';

export default (req, res, err) => {
    if(err)
        return console.log(err);
    const resort = req.query.resort;
    const id = req.query.id;
    async function getData(id)
    {

        const relaxes = await fetch(global.urlServer + '/api/relax?id=' + id);
        const relax = await relaxes.json();
        return relax;
    }
    const relaxes = getData(id);
    console.log(relaxes)
    const element = relaxes[resort].find((element) => { 
        return element.id == id 
    });
    res.status(200).json(element);
}