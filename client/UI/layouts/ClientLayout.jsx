import React, {useState} from 'react'; 
import Head from 'next/head';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import Preloader from '../components/Common/Preloader/Preloader';
import AsideHeader from '../components/Common/Header/AsideHeader';
//
import classes from './ClientLayout.module.scss';

export default function ClientLayout ({children, title = 'Эллинлайн', preloader=false}){

    let preloaderAction;
    const [firstPreload, setFirstPreload] = useState(preloader);
    if (preloader)
    {
        preloaderAction = 'start';
    }
    else
    if (firstPreload == false)
    {
        preloaderAction = 'none';
    }
    else
    {
        preloaderAction = 'stop';
    }

    console.log('preloader: ' + preloader)
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header/>
            <AsideHeader className={classes.header}/>
            <main className={classes.main}>
                <Preloader action={preloaderAction}/>
                    {(()=>{
                        
                        if (preloaderAction == 'stop' || preloaderAction =='none')
                        {
                            return <div>{children}</div>;
                        }
                    
                    })()}
                <Footer/>
            </main>
        </>
    )

}