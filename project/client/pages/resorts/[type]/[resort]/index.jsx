import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
//Jsx
import ClientLayout from '../../../../layouts/ClientLayout';
import SearchRelax from '../../../../components/Common/Search/SearchRelax';
import List from '../../../../components/Common/List/List';
import ChooseResort from '../../../../components/Common/ChooseResort/ChooseResort';
//Js, scss
import Global from '../../../global.js';
import classes from './index.module.scss';

const Resorts = ({data}) => {
   
    const router = useRouter();
    const resort = router.query.resort;
    const type = router.query.type;
    const convert = Global.GetConvert(type);
    const convertKeys = Object.keys(convert);
    const keyLeft = convertKeys[1];
    const keyRight = convertKeys[2];
    const [dbData, setDbData] = useState(data);
    const [searchStars, setSearchStars] = useState({key: '', value: ''});
    const [searchCountry, setSearchCountry] = useState({key: '', value: ''});
    const [searchCity, setSearchCity] = useState({key: '', value: ''});
    const [searchPrice, setSearchPrice] = useState({key: '', value: '', sign: ''});
    const [searchName, setSearchName] = useState({key: '', value: ''});
    const [searchCountPeople, setSearchCountPeople] = useState({key: '', value: '', sign: ''});
    const [conditions, setConditions] = useState([searchStars, searchCountry, searchCity, searchPrice, searchName]);
    
    
    let cities = [];
    let countries = [];
    console.log('resort: ' + resort)
    if (dbData !== null && dbData !== undefined)
    {
        if (Object.keys(dbData).length != 0)
        {
            dbData.map((item)=>{

                cities.push(item.city_name)
            })

            dbData.map((item)=>{

                countries.push(item.county_name)
            })

            cities = cities.filter((item, index) => {
                return cities.indexOf(item) === index
            })

            countries = countries.filter((item, index) => {
                return countries.indexOf(item) === index
            })
        }
    }

    useEffect(() => {

        setConditions([searchStars, searchCountry, searchCity, searchPrice, searchName, searchCountPeople]);

    }, [searchStars, searchCountry, searchCity, searchPrice, searchName, searchCountPeople])

    useEffect(() => {

        async function get()
        {
            
            let category = '';
            if (resort == 'hotels')
            {
                category = 'отель'
            }
            else 
            if (resort == 'pensionats')
            {
                category = 'пансионат'
            }
            const res = await fetch(encodeURI(`${Global.urlServer}/api/${type}?type=${category}`))
            const json = await res.json();
            console.log(json)    
            setDbData(json);
                
            
        }
        if (!data)
        {
            get();
        }
    }, [resort])

    return (
        <ClientLayout 
            title={Global.GetConvert(type)[resort]} 
            description={dbData !== null ? Global.GetConvert(type)['discription'] : ''} 
            keywords={dbData !== null ? `${Global.GetConvert(type)[resort]}, ${type}` : ''} 
            preloader={!dbData}
            crumbs={[{href: '/resorts/[type]', as: `/resorts/${type}`, text: Global.GetConvert(type).name}, 
                     {href: '/resorts/[type]/[resort]', as: `/resorts/${type}/${resort}`, text: Global.GetConvert(type)[resort]}]}>
            
            {(()=>{

                switch (type)
                {
                    case 'Saint-Petersburg': return;

                    case 'relax': return <SearchRelax className={classes.search} setSearchStars={setSearchStars} setSearchCountry={setSearchCountry}
                                         setSearchCity={setSearchCity} setSearchPrice={setSearchPrice} setSearchName={setSearchName} setSearchCountPeople={setSearchCountPeople}
                                         cities={cities} countries={countries}/>;
                }

                if (type != 'Saint-Petersburg')
                    return <ChooseResort 
                            path={type} 
                            resort={resort}
                            convert={convert}
                            keyLeft={keyLeft}
                            keyRight={keyRight}
                            />
            })()}
            
            
            <List path={type} resort={resort} items={dbData} conditions={conditions}/>
        </ClientLayout>
    )
}


Resorts.getInitialProps = async ({req, query}) => {
    
    if (!req)
    {
        return {data: null}
    }
    const type = query.type;
    const resort = query.resort;
    let typeResort;
    if (resort == 'hotels')
    {
        typeResort = 'отель'
    }
    else 
    if (resort == 'pensionats')
    {
        typeResort = 'пансионат'
    }
    const res = await fetch(encodeURI(Global.urlServer + '/api/'+ type + '?type=' + typeResort));
    const items = await res.json();
    console.log(items)
    return {data: items};
}

export default Resorts;
