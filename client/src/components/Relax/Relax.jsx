import React, {useEffect, useState} from 'react';
import { Link, Route } from 'react-router-dom';
import Search from '../Common/Search/Search';
import List from './List';
import CountryDescription from '../Common/countryDescription/countryDescription';
import classes from './Relax.module.css';
// import TextAres from './../CustomElements/TextArea.jsx';
import ky from 'ky';



    
const Relax = () => {
    const [sanatoriums, setSanatoriums] = useState([]);
    const [countries, setCountries] = useState([]);
    useEffect(()=>{

        document.title = `Санатории`;

        async function getData(){
    
            const json =  await ky.get('http://localhost:4000/getSanatoriums').json();
            setSanatoriums(json);
            let bufCountries = [];
            sanatoriums.map((sanatorium) => { 

                bufCountries.push({nameCountry: sanatorium.nameCountry, descriptionCountry: sanatorium.descriptionCountry});
                delete sanatorium.nameCountry;
                delete sanatorium.descriptionCountry;
            })
            setCountries(bufCountries);
        }

        getData()

    }, []);
    console.log(sanatoriums)
    
    
    let points = [];
    sanatoriums.map((sanatorium) => 
    { 
        points.push({
            coordinates: [sanatorium.coordinates.x, sanatorium.coordinates.y],
            hintContent: sanatorium.title, balloonContentBody: sanatorium.address});
    });
    const cityCoordinates = [58.52192654163379,31.282977010801268];
    
    
    return (
        <div className={classes.relax}>
            <Search type='sanatorium' className='search'/>
            <div className={classes.choose}>
                <div className={classes.pansionat}><Link to='pansionats'><h1>Пансионаты</h1></Link></div>
                <div className={classes.sanatorium}><Link to='sanatoriums'><h1>Санатории</h1></Link></div>
            </div>
            <div className={classes.rest}>
                <Route path='/relax/:category' component={List}></Route>
                    {/* // items=1
                    // {[
                    //     { 
                    //         title: 'Север', 
                    //         imgSrc: 'https://static.wikia.nocookie.net/mlp/images/d/d1/Rarity_standing_S1E19_CROPPED.png/revision/latest/scale-to-width-down/340?cb=20130418142043',
                    //         address: 'Народная 46',
                    //         price: '20 000 руб.',
                    //         services: [ 'cofe', 'tea' ]
                    //     },
                    //     {
                    //         title: 'Юг', 
                    //         imgSrc: 'https://static.wikia.nocookie.net/mlp/images/d/d1/Rarity_standing_S1E19_CROPPED.png/revision/latest/scale-to-width-down/340?cb=20130418142043',
                    //         address: 'Английская 3',
                    //         price: '10 000 руб.',
                    //         services: [ 'tea' ]
                    //     }
                    // ] */}
            </div>

            
            {/* <CountryDescription countries={countries} />
            <List sanatoriums={sanatoriums} points={points} cityCoordinates={cityCoordinates} /> */}

        </div>
    )
}

export default Relax
