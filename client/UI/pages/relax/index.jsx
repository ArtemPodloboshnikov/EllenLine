import React, {useEffect, useState} from 'react';
import { NavLink, Route } from 'react-router-dom';
import ClientLayout from '../../layouts/ClientLayout';
//import CountryDescription from '../Common/countryDescription/countryDescription';
import ChooseResort from './ChooseResort.jsx';
import classes from './index.module.css';



    
const Relax = () => {
    const [sanatoriums, setSanatoriums] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        console.log();
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
    
    
    // let points = [];
    // sanatoriums.map((sanatorium) => 
    // { 
    //     points.push({
    //         coordinates: [sanatorium.coordinates.x, sanatorium.coordinates.y],
    //         hintContent: sanatorium.title, balloonContentBody: sanatorium.address});
    // });
    // const cityCoordinates = [58.52192654163379,31.282977010801268];
    
    
    return (
        <ClientLayout title='Отдых'>
            <ChooseResort />
        </ClientLayout>
    )
}

export default Relax
