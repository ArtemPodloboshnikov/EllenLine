import React from 'react';
import dynamic from 'next/dynamic';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const convert = { 'river': 'Речные', 'marine': 'Морские' };
const List = dynamic(() => import('../../../components/Common/List/List.jsx'), 
{ 
    // ssr: false | для отключения server sider rendering
    // loader: место для прелоадера
});

//Этот resort как и в другой папке можно выделить в отдельный компонент
//Но я оставил все как есть на случай изменений
const Resorts = (props) => {
    const resort = props.resort;
    const items = props.items;

    return (
        <ClientLayout title={convert[resort]}>
            <List {...props} path = 'cruises'/>
        </ClientLayout>
    )
} 

//Единственное что тут различается это эти функции 
//И то их можно свести к одной
export async function getStaticPaths() {
    const res = await fetch(Global.url + '/api/cruises');
    const resorts = await res.json();
    const paths = Object.keys(resorts).map((element) => {
        return { params: { resort: element } };
    });
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    const resort = router.params.resort;
    const res = await fetch(Global.url + '/api/cruises/' + resort);
    const items = await res.json();
    return {
        props: {
            resort: resort,
            items: items
        }
    };
}

export default Resorts;