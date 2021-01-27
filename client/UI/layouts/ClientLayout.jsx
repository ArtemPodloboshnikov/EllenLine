import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import Head from 'next/head';

export default function ClientLayout ({children, title = 'Эллинлайн'}){

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Header/>
                {children}
                <Footer/>
            </main>
        </>
    )

}