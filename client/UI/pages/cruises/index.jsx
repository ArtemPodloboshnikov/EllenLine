import React from 'react';
import dynamic from 'next/dynamic';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import classes from './index.module.scss';

const ChooseResort = dynamic(() => import('../../components/Common/ChooseResort/ChooseResort.jsx'), 
{
    // loader: место для прелоадера
});

const Cruises = (props) => {
    
    return (
        <ClientLayout title='Круизы'>
            <ChooseResort path='cruises' left='river' right='marine'/>
        </ClientLayout>
    )
}

export default Cruises;