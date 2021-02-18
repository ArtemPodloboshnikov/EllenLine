import React, {useState} from 'react'; 
import Head from 'next/head';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import Preloader from '../components/Common/Preloader/Preloader';

export default function ClientLayout ({children, title = 'Эллинлайн', description='Турфирма Эллинлайн предлагает экскурсионные туры по Санкт-Петербургу, туры по России, круизы, разнообразные направления, доступные цены.', keywords='турфирма, путешествия, отдых, отели, санатории, клиники, туры, экскурсии, круизы, Санкт-Петербург', preloader=false}){

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
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="robots" content="index, follow" />
            </Head>
            <Header/>
            <main class="main">
                <Preloader action={preloaderAction}/>
                    {(()=>{
                        
                        if (preloaderAction == 'stop' || preloaderAction =='none')
                        {
                            return children;
                        }
                    
                    })()}
                <Footer/>
            </main>
        </>
    )

}