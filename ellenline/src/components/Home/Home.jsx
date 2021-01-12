import React, { useEffect } from 'react'
import Services from './Services'
import Advantages from './Advantages';
import Reviews from './Reviews';
import Clients from './Clients';
import classes from './Home.module.css';


function Home() {
    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        document.title = `О нас`;
        //let arUrl = window.location.pathname.split('/');
        // if (arUrl[1] == "")
        // {
        //     console.log(arUrl);
        //     let newUrl = '/home';
        //     history.pushState('', '', newUrl);
        // }
        
      });
    
    return (
        <div className={classes.home}>
          <Services/>
          <Advantages/>
          <Reviews/>
          <Clients/>
        </div>
    )
}

export default Home
