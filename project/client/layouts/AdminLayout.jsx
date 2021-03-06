import AdminHeader from '../components/Common/Header/AdminHeader';
import DbHeader from '../components/Common/Header/DbHeader';
import Head from 'next/head';
import {useState} from 'react';
import AuthorizationContext from './authorization';

export default function AdminLayout ({children, sector, title = 'Эллинлайн'}){
    
    function ConvertSector(to_sector) {
        switch (to_sector) {

            case 'admin': return <AdminHeader/>;    
            case 'orders':
            case 'promocode': 
            case 'employees':
            case 'pages':
            case 'finance':
            case 'db': return <DbHeader sector={to_sector}/>;

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