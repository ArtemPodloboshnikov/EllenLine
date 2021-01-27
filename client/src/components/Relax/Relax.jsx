import React, {useEffect, useState} from 'react';
import { NavLink, Route } from 'react-router-dom';
import List from './List.jsx'; 
import CountryDescription from '../Common/countryDescription/countryDescription';
import classes from './Relax.module.css';
import ChooseResort from './ChooseResort.jsx';
import Resort from './Resort.jsx';
import ky from 'ky';



    
const Relax = () => {
    const [sanatoriums, setSanatoriums] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(()=>{

        document.title = `Отдых`;
        //#region Old Quest
        // async function getData(){
    
        //     const json =  await ky.get('http://localhost:4000/getSanatoriums').json();
        //     setSanatoriums(json);
        //     let bufCountries = [];
        //     sanatoriums.map((sanatorium) => { 

        //         bufCountries.push({nameCountry: sanatorium.nameCountry, descriptionCountry: sanatorium.descriptionCountry});
        //         delete sanatorium.nameCountry;
        //         delete sanatorium.descriptionCountry;
        //     })
        //     setCountries(bufCountries);
        // }

        // getData();
        //#endregion

        // async function getSanatoriums() 
        // {
        //     const answer = await fetch('http://localhost:4000/api/sanatoriums')
        //     .then((res) => 
        //     {
        //         return res.json();
        //     })
        //     .then((data) => 
        //     {
        //         console.log('Returned: \n');
        //         console.log(data);
        //     });
        //     console.log('Answer: \n');
        //     console.log(answer);
        // }

        // getSanatoriums();
    });
    
    
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
            {/* THIS MAYBE STUPID SHIT */}
            <Route exact path='/relax' component={ChooseResort}></Route>
            <Route exact path='/relax/:category' component={ChooseResort}></Route>
            {/* PLEASE FIX THIS, IF THAT`S NOT HOW IT`S DONE, ALSO THERE ANOTHER <Route/> in <ChooseResort/>*/}

            <Route exact path='/relax/:category/:id' component={Resort}></Route>
            {/* <Route path='/relax/:category' component={ChooseResort}></Route> */}

            
            {/* <CountryDescription countries={countries} />
            <List sanatoriums={sanatoriums} points={points} cityCoordinates={cityCoordinates} /> */}

        </div>
    )
}

export default Relax
