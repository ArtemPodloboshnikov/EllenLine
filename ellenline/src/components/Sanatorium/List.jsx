import React from 'react'
import classes from './List.module.css';
import YandexMap from '../Common/Map/YandexMap';
import ky from 'ky';

async function getData(){

    const json =  await ky.get('http://localhost:4000/getSanatoriums').json();
    console.log(json);
}
getData();
const points = [{coordinates: [58.52004065879686,31.261519338682145], hintContent: 'Господин Великий Новгород', balloonContentBody: 'ул. Новая, 2'}];
const cityCoordinates = [58.52192654163379,31.282977010801268];
const List = () => {
    return (
        <div className={classes.list}>
            <div className={classes.map}>
                <YandexMap cityCoordinates={cityCoordinates} points={points}/>
            </div>
            <div className={classes.names}>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                    <div>
                        {
                            

                        }
                    </div>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
                <div>
                    <p>Государь Великий Новгород</p>
                    <p>ул. Новая, 2</p>
                </div>
            </div>
        </div>
    )
}

export default List
