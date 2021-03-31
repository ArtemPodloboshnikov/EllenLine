import React, {useState} from 'react'; 
import Head from 'next/head';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import AsideHeader from '../components/Common/Header/AsideHeader';
//
import classes from './ClientLayout.module.scss';

export default function ClientLayout ({ children, title = 'Эллинлайн' }){
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header/>
            <AsideHeader className={classes.header}/>
            <main className={classes.main}>
                {children}
                <Footer/>
            </main>
        </>
    )

}