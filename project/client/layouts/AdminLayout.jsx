import AdminHeader from '../components/Common/Header/AdminHeader';
import DbHeader from '../components/Common/Header/DbHeader';
import OrdersHeader from '../components/Common/Header/OrdersHeader';
import Head from 'next/head';
import {useState} from 'react';
import AuthorizationContext from './authorization';

export default function AdminLayout ({children, sector, title = 'Эллинлайн'}){
    
    function ConvertSector(to_sector) {
        switch (to_sector) {

            case 'admin': return <AdminHeader/>;    

            case 'promocode': 
            case 'employees':
            case 'db': return <DbHeader sector={to_sector}/>;



            case 'orders': return <OrdersHeader/>;
        }
    }

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                    {ConvertSector(sector)}
                    {children}
            </main>
        </>
    )

}