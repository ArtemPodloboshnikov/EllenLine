import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//import CountryDescription from '../Common/countryDescription/countryDescription';
import ChooseResort from '../ChooseResort.jsx';
import List from './List.jsx';
import classes from './index.module.scss';



    
const Resort = (props) => {
    // const router = useRouter();
    // const [category, setCategory] = useState(router.query.resort);
    const [category, setCategory] = useState(props.resort);

    return (
        <ClientLayout title='Отдых'>
            <ChooseResort />
            <List category={category}/>
        </ClientLayout>
    )
}

Resort.getInitalProps = ({ query }) => {
    console.log('resort done');
    return {
        resort: query.resort
    }
} ;

export default Resort;
