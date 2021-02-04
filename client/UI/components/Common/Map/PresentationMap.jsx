import { YMaps, Map, Placemark, Clusterer, GeoObject } from 'react-yandex-maps';
import classes from './YandexMap.module.scss';

const PresentationMap = (props) => {
    let mapState = {};

    if (Object.keys(props.points).length == 1)
    {
        mapState = {center: props.points[0].coordinates, zoom: 17};
    }
    else
    {
        
        mapState = {center: props.cityCoordinates, zoom: 10};
    }
  
    console.log(mapState);

    const markState = {points: props.points,  modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']}

    return   (<div className={props.className + ' ' + classes.wrap} id={props.id}>
            
            <YMaps enterprise query={{apikey: '5594e597-90cb-48f6-a139-b76c8a42a41a&lang=ru_RU'}} 
               version={"2.1"}>
       
            <Map state={mapState}>
            <Clusterer options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}>
                {markState.points.length ? markState.points.map((point) => (
                    <GeoObject 
                        geometry={{type: "Point", coordinates: point.coordinates}} 
                        properties={{hintContent: (point.hintContent || ''), balloonContentBody: (point.balloonContentBody || '')}} 
                        modules={[...markState.modules]} 
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/images/marker.svg',
                            iconImageSize: [60, 52],
                            iconImageOffset: [-30, -56]
                        }}
                    ></GeoObject>)): ''}
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
          
        </YMaps>
        </div>)
}

export default PresentationMap
