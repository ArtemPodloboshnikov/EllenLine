import {useEffect, useState} from 'react';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import SearchRelax from '../../../components/Common/Search/SearchRelax';
import ChooseResort from '../ChooseResort.jsx';
// import List from '../../../components/Common/List/List';
import classes from './index.module.scss';
import {useRouter} from 'next/router';

    
export default function Resort ({data}){
   // debugger
    const [dbData, setDbData] = useState(data);
    const [searchStars, setSearchStars] = useState({key: '', value: ''});
    const [searchCountry, setSearchCountry] = useState({key: '', value: ''});
    const [searchCity, setSearchCity] = useState({key: '', value: ''});
    const [searchPrice, setSearchPrice] = useState({key: '', value: '', sign: ''});
    const [searchName, setSearchName] = useState({key: '', value: ''});
    const [conditions, setConditions] = useState([searchStars, searchCountry, searchCity, searchPrice, searchName]);
    const router = useRouter();
    const {resort} = router.query;
    let cities = [];
    let countries = [];

    if (dbData !== null)
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
    console.log(searchStars)
    useEffect(() => {

        setConditions([searchStars, searchCountry, searchCity, searchPrice, searchName]);

    }, [searchStars, searchCountry, searchCity, searchPrice, searchName])
    useEffect(() => {

        async function get()
        {
            let json = [];
            let type = '';
            console.log(resort)
            if (resort == 'hotels')
            {
                type = 'отель'
            }
            else 
            if (resort == 'pensionats')
            {
                type = 'пансионат'
            }
            const res = await fetch(encodeURI(`http://localhost:4000/api/relax?type=${type}`))
            .then(response =>{

                return response.json()
            })
            .then(info => {
                
                setDbData(info);
                
            })
        }
        if (!data)
        {
            get();
        }
    }, [resort])
    
    // if (!dbData)
    // {
    //     return <Preloader/> 
    // }
    
    //const [category, setCategory] = useState(props.resort);

    return (
        <ClientLayout title='Отдых' preloader={!dbData}>
            <SearchRelax className={classes.search} setSearchStars={setSearchStars} setSearchCountry={setSearchCountry}
            setSearchCity={setSearchCity} setSearchPrice={setSearchPrice} setSearchName={setSearchName}
            cities={cities} countries={countries}/>
            <ChooseResort leftText='Пансионаты' rightText='Отели' keyLeft='pensionats' keyRight='hotels' category={resort}/>
            {/* <List category={resort} items={dbData} conditions={conditions} /> */}
        </ClientLayout>
    )
}


Resort.getInitialProps = async ({req, query}) =>{

    if (!req)
    {
        return {data: null}
    }
    let json = [];
    let type = '';
    
    if (query.resort == 'hotels')
    {
        type = 'отель'
    }
    else 
    if (query.resort == 'pensionats')
    {
        type = 'пансионат'
    }
    const res = await fetch(encodeURI(`http://localhost:4000/api/relax?type=${type}`))
    .then(response =>{

        return response.json()
    })
    .then(data => {

        json = data;
    })
    

    // json = JSON.stringify(json);
    // json = eval(json);
    // json.map(el => {

    //     el.services = JSON.parse(el.services);
        
    // })
    return {data: json}
}