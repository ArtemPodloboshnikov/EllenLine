import ClientLayout from '../layouts/ClientLayout'
import { useEffect, useState } from 'react'
import Services from '../components/Home/Services'
import Advantages from '../components/Home/Advantages';
import Reviews from '../components/Home/Reviews';
import Clients from '../components/Home/Clients';
import QRcode from '../components/Home/QRcode'
import classes from '../styles/Home/Home.module.css';

export default function Home(){

    const [data, setData] = useState({advantages: [], services: []});
    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера

        async function getData(){
    
          const response =  await fetch('http://localhost:4000/file/getHomePage');
          const json = await response.json();
          setData(json);
          
      }

      getData()
        
      }, []);
    console.log(data);

    return (
        <ClientLayout title='О нас'>
            <div className={classes.home}>
                <Services data={data.services}/>
                <Advantages data={data.advantages}/>
                <Reviews/>
                <Clients/>
                <QRcode/>
            </div>
        </ClientLayout>
    )

}