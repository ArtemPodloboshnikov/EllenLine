import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
//Jsx
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import ChooseResort from '../ChooseResort.jsx';
//Js, scss
import Global from '../../global.js';
import classes from './index.module.scss';

const convert = { 'pensionats': 'Пансионаты', 'sanatoriums': 'Санатории'};
const List = dynamic(() => import('./List.jsx'), { ssr: false });

const Resort = (props) => {
    const resort = props.resort;
    const items = props.items;
    console.log(process.cwd());
    // console.log('START');
    // console.log(props.items);
    // console.log(resort);
    // console.log(router);
    // console.log(process.env);
    // console.log('END');

    return (
        <ClientLayout title={convert[resort]}>
            {/* <ChooseResort /> */}
            <List {...props}/>
        </ClientLayout>
    )
}

//Эти функции необходимы для извлечении данных из БД, а затем передача их в пропсы
//Зачастую вместо них можно использовать, события жизненного цикла компонента
//Но если вы хотите обойти статическую генерацию в некоторых моментах придется их использовать
//

//Функция определяет пути которые должны быть пререндерены в самом начале
//Она необходима, для перехода на страницу сразу из строки поиска
export async function getStaticPaths() {
    //В этом случаи я получаю все типы отдыха и пререндериваю соотвествующие страницы
    //(сорри за мой русский speak)
    //
    const res = await fetch(Global.url + '/api/relax');
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
    //А здесь я получаю информацию об отдыхе, а затем передаю в качестве props`a
    const resort = router.params.resort;
    const res = await fetch(Global.url + '/api/relax/' + resort);
    const items = await res.json();
    return {
        props: {
            resort: resort,
            items: items
        }
    };
}

export default Resort;
