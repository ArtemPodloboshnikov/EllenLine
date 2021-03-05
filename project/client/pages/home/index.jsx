import React, { useEffect } from 'react';
//
import Enter from './Enter.jsx';
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import Global from './../global.js';
import classes from './index.module.scss';

const Home = () => {

    async function GetAnswer() {
        const result = await fetch(`${Global.url}/api/hello`);
        const json = await result.json();
        console.log(json);
    }
    useEffect(() => {
        GetAnswer();
    });

    return (
        <ClientLayout title='О нас'>
            <Enter/>
        </ClientLayout>
    )
}

export default Home;
