import React, { useEffect, useState } from 'react'
import Services from './Services'
import Advantages from './Advantages';
import Reviews from './Reviews';
import Clients from './Clients';
import QRcode from './QRcode'
import classes from './Home.module.css';
import ky from 'ky';

function Home() {

    const [data, setData] = useState({advantages: [], services: []});
    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        document.title = `О нас`;

        async function getData(){
    
          const json =  await ky.get('http://localhost:4000/file/getHomePage').json();
          setData(json);
          
      }

      getData()
        
      }, []);
    console.log(data);

    return (
        <div className={classes.home}>
          <Services data={data.services}/>
          <Advantages data={data.advantages}/>
          <Reviews/>
          <Clients/>
          <QRcode/>
        </div>
    )
}

export default Home
