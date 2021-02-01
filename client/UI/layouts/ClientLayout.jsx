import Head from 'next/head';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import { Component } from 'react';

export default class ClientLayout extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            children: props.children,
            title: props.title
        }
    }

    static async getInitialProps({ query }) {
        console.log(query);
    }

    render() {
        return(
            <>
                <Head>
                    <title>{this.state.title}</title>
                </Head>
                <Header/>
                <main class="main">
                        {this.state.children}
                    <Footer/>
                </main>
            </>
        )
    }

}