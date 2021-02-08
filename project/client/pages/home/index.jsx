import React from 'react';
import Enter from './Enter.jsx';
import ClientLayout from '../../layouts/ClientLayout.jsx';
import classes from './index.module.scss';

const Home = () => {

    return (
        <ClientLayout title='О нас'>
            <Enter/>
        </ClientLayout>
    )
}

export default Home;
