import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//
import Global from '../../global.js';

const ChooseResort = dynamic(() => import('../../../components/Common/ChooseResort/ChooseResort.jsx'), 
{
    // loader: место для прелоадера
});

const Relax = () => {
    const router = useRouter();
    const type = router.query.type;
    const convert = Global.GetConvert(type);


    return (
        <ClientLayout 
            title={convert[Object.keys(convert)[0]]}
            crumbs={[{href: '/resorts/[type]', as: `/resorts/${type}`, text: Global.GetConvert(type).name}]}>
            {(()=>{

                if (type != 'Saint-Petersburg')
                {
                    return <ChooseResort 
                            path={type} 
                            convert={convert}/>
                }

            })()}
            
        </ClientLayout>
    )
}

export default Relax;
