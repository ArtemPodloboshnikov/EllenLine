import Head from 'next/head';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';

export default function ClientLayout ({children, title = 'Эллинлайн'}){

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header/>
            <main class="main">
                    {children}
                {/* <BrowserRouter>
                </BrowserRouter> */}
                <Footer/>
            </main>
        </>
    )

}