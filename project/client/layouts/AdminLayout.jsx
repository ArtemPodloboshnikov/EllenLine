import React from 'react';
//
import AdminHeader from '../components/Common/Header/AdminHeader';
//
import Head from 'next/head';

export default function AdminLayout ({children, sector, title = 'Эллинлайн'}){


    function GenerateSector(sector) {
        return sector ? <AdminHeader/> : '';
    }

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                {GenerateSector(sector)}
                {children}
            </main>
        </>
    )

}