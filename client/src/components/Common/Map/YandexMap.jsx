import { YMaps, Map, Placemark, Clusterer, GeoObject } from 'react-yandex-maps';
import React from 'react'
import classes from './YandexMap.module.css';

//const mapState = { center: [59.9073, 30.3276], zoom: 10 };
//const markState = {points: [{geometry: [59.87026977960634, 30.26204491830366], hintContent: 'Эллинлайн', balloonContent: 'ул. Зайцева, 3, корп. 2, Санкт-Петербург'}]}

function YandexMap(props){
    //debugger;
    console.log(props.points);
    let mapState = {};
    if (Object.keys(props.points).length == 1)
    {
        mapState = {center: props.points[0].coordinates, zoom: 17};
    }
    else
    {
        if (props.cityCoordinates.length == 0)
        {
            mapState = {center: props.points[0].coordinates, zoom: 10};
        }
        else
        {

            mapState = {center: props.cityCoordinates, zoom: 10};
        }
    }
    //console.log(props.points[0].hintContent);
    const markState = {points: props.points,  modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']}

     return   (<YMaps enterprise query={{apikey: '5594e597-90cb-48f6-a139-b76c8a42a41a&lang=ru_RU'}} version={"2.1"}>
       
            <Map state={mapState}>
            <Clusterer options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}>
                {markState.points.map((point) => (
                    <GeoObject 
                        geometry={{type: "Point", coordinates: point.coordinates}} 
                        properties={{hintContent: point.hintContent, balloonContentBody: point.balloonContentBody}} 
                        modules={[...markState.modules]} 
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: 'images/marker.svg',
                            iconImageSize: [60, 52],
                            iconImageOffset: [-30, -56]
                        }}
                    ></GeoObject>))}
            </Clusterer>

                {/* <Placemark geometry={[59.87026977960634, 30.26204491830366]}
                properties={{
                    hintContent: "Эллинлайн",
                    balloonContent: 'ул. Зайцева, 3, корп. 2, Санкт-Петербург'
                }}
                modules={[
                    'geoObject.addon.balloon', 'geoObject.addon.hint'
                ]}

                options={{
                    iconImageHref:'images/logo-header.svg',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                }}>


                </Placemark> */}

            </Map>
          
        </YMaps>)
    
};

export default YandexMap;