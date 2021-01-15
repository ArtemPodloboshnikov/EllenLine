import React, {useEffect, useState} from 'react';
import Search from '../Common/Search/Search';
import List from './List';
import CountryDescription from '../Common/countryDescription/countryDescription';
import classes from './Sanatorium.module.css';
import ky from 'ky';



    
const Sanatorium = () => {

    //  debugger;
   


       
    const [sanatoriums, setSanatoriums] = useState([]);

    useEffect(()=>{

        document.title = `Санатории`;

        async function getData(){
    
            const json =  await ky.get('http://localhost:4000/getSanatoriums').json();
            setSanatoriums(json);
            
        }

        getData()

    }, []);
    console.log(sanatoriums)
    
    
    let points = [];
    sanatoriums.map((sanatorium)=>{ points.push({coordinates: [sanatorium.coordinates.x, sanatorium.coordinates.y], hintContent: sanatorium.title, balloonContentBody: sanatorium.address});});
    const cityCoordinates = [58.52192654163379,31.282977010801268];
    
    let countries = [];
    
    sanatoriums.map((sanatorium) => { 

        countries.push({nameCountry: sanatorium.nameCountry, descriptionCountry: sanatorium.descriptionCountry});
        delete sanatorium.nameCountry;
        delete sanatorium.descriptionCountry;
    })
    console.log(sanatoriums);

    return (
        <div className={classes.sanatorium}>
            
            <Search type='sanatorium' />
            <CountryDescription countries={countries} />
            <List sanatoriums={sanatoriums} points={points} cityCoordinates={cityCoordinates} />
        </div>
    )
}

export default Sanatorium
