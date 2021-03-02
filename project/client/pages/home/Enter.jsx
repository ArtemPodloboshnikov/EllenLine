import { useEffect, useState } from 'react';
import Global from '../global';
import Services from './Services.jsx';
import Advantages from './Advantages.jsx';
import Clients from './Clients.jsx';
import QRcode from './QRcode.jsx';
import classes from './Enter.module.scss';

// Стоит выделить Home в отдельный компонент в папку Home, вместе со стилями
export default function Home(){

    const [data, setData] = useState({advantages: [], services: []});
    useEffect(() => 
    {
        // Обновляем заголовок документа, используя API браузера

        async function getData()
        {
    
          const response =  await fetch(Global.urlServer + '/file/getHomePage');
          const json = await response.json();
          setData(json);
        }

        getData();
    }, []);

    console.log(data);

    return (
        <div className={classes.home}>
            <Services data={data.services}/>
            <Advantages data={data.advantages}/>
            <Clients/>
            <QRcode/>
        </div>
    )

}