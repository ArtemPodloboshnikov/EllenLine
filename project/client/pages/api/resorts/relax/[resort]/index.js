import global from '../../../../global';

//Функция 
export default (req, res, err) => {
    if(err)
        return console.log(err);
    let type = req.query.resort;
    async function getData(type)
    {
        if (type == 'hotels')
        {
            type = 'отель'
        }
        else 
        if (type == 'pensionats')
        {
            type = 'пансионат'
        }
        const relax = await fetch(global.urlServer + '/api' + '/relax?type=' + type);
        const json = relax.json();

        return json;
    }
    const relaxes = getData(type)
    console.log(relaxes)
    res.status(200).json(relaxes);
}