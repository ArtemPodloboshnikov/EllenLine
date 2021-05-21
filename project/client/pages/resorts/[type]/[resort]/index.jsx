import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
//Jsx
import ClientLayout from '../../../../layouts/ClientLayout';
import SearchRelax from '../../../../components/Common/Search/SearchRelax';
import SearchTreatment from '../../../../components/Common/Search/SearchTreatment';
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
    const [searchProfile, setSearchProfile] = useState({key: '', value: ''});
    const [searchCountry, setSearchCountry] = useState({key: '', value: ''});
    const [searchCity, setSearchCity] = useState({key: '', value: ''});
    const [searchPrice, setSearchPrice] = useState({key: '', value: '', sign: ''});
    const [searchName, setSearchName] = useState({key: '', value: ''});
    const [searchCountPeople, setSearchCountPeople] = useState({key: '', value: '', sign: ''});
    const [conditions, setConditions] = useState([searchStars, searchProfile, searchCountry, searchCity, searchPrice, searchName]);
    
    
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

        setConditions([searchStars, searchProfile, searchCountry, searchCity, searchPrice, searchName, searchCountPeople]);

    }, [searchStars, searchProfile, searchCountry, searchCity, searchPrice, searchName, searchCountPeople])

    useEffect(() => {

        async function get()
        {
            
            const category = Global.GetTypeRus(resort);
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
            >
            
            {(()=>{

                switch (type)
                {
                    case 'Saint-Petersburg': return;
                    case 'treatment': return <SearchTreatment className={classes.search} setSearchProfile={setSearchProfile} setSearchCountry={setSearchCountry}
                                         setSearchCity={setSearchCity} setSearchPrice={setSearchPrice} setSearchName={setSearchName} setSearchCountPeople={setSearchCountPeople}
                                         cities={cities} countries={countries}/>;
                    case 'relax': return <SearchRelax className={classes.search} setSearchStars={setSearchStars} setSearchCountry={setSearchCountry}
                                         setSearchCity={setSearchCity} setSearchPrice={setSearchPrice} setSearchName={setSearchName} setSearchCountPeople={setSearchCountPeople}
                                         cities={cities} countries={countries}/>;
                }
                console.log(type)
                if (type != 'Saint-Petersburg')
                {

                    return <ChooseResort 
                            path={type} 
                            resort={resort}
                            convert={convert}
                            keyLeft={keyLeft}
                            keyRight={keyRight}
                            />
                }
            })()}
            
            
            <List items={dbData} conditions={conditions} type={type}/>
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
    const typeResort = Global.GetTypeRus(resort);
    const res = await fetch(encodeURI(Global.urlServer + '/api/'+ type + '?type=' + typeResort));
    const items = await res.json();
    console.log(items)
    return {data: items};
}

export default Resorts;
