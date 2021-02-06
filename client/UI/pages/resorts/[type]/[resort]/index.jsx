import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
//Jsx
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
//Js, scss
import Global from '../../../global.js';
import classes from './index.module.scss';

const List = dynamic(() => import('../../../../components/Common/List/List.jsx'), 
{ 
    // ssr: false | для отключения server sider rendering
    // loader: место для прелоадера
});

const Resorts = (props) => {
    const type = props.type;
    const resort = props.resort;
    const items = props.items;

    return (
        <ClientLayout title={Global.GetConvert(type)[resort]}>
            <List {...props} path={type}/>
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
    const res = await fetch(Global.url + '/api/resorts');
    const resorts = await res.json();
    
    let paths = [];
    for(let i = 0; i < resorts.length; i++)
    {
        const res = await fetch(Global.url + '/api/resorts/' + resorts[i]);
        const answer = await res.json();
        paths = paths.concat(Object.keys(answer).map((element) => {
            return { params: { type: resorts[i], resort: element } };
        }));
    }

    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    //А здесь я получаю информацию об отдыхе, а затем передаю в качестве props`a
    const type = router.params.type;
    const resort = router.params.resort;
    const res = await fetch(Global.url + '/api/resorts/'+ type + '/' + resort);
    const items = await res.json();
    return {
        props: {
            type: type,
            resort: resort,
            items: items
        }
    };
}

export default Resorts;
