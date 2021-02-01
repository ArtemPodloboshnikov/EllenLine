import {useEffect, useState} from 'react';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//import CountryDescription from '../Common/countryDescription/countryDescription';
import ChooseResort from '../ChooseResort.jsx';
import List from './List.jsx';
import classes from './index.module.scss';
import {useRouter} from 'next/router';

    
export default function Resort ({data}){
    
    const [dbData, setDbData] = useState(data);
    const router = useRouter();
    const {resort} = router.query;

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
            <ChooseResort />
            <List category={resort} items={dbData}/>
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