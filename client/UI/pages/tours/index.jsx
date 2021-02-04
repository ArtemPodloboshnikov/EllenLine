import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import classes from './index.module.scss';

const ChooseResort = dynamic(() => import('../../components/Common/ChooseResort/ChooseResort.jsx'), 
{
    // loader: место для прелоадера
});

const Relax = (props) => {

    return (
        <ClientLayout title='Отдых'>
            <ChooseResort path='tours' left='pensionats' right='sanatoriums'/>
        </ClientLayout>
    )
}

export default Relax;
