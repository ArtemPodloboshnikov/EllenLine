import { YMaps, Map, Placemark, Clusterer, GeoObject } from 'react-yandex-maps';
import {useState, useEffect} from 'react'
import classes from './YandexMap.module.scss';

//const mapState = { center: [59.9073, 30.3276], zoom: 10 };
//const markState = {points: [{geometry: [59.87026977960634, 30.26204491830366], hintContent: 'Эллинлайн', balloonContent: 'ул. Зайцева, 3, корп. 2, Санкт-Петербург'}]}


function EditMap(props){
   
   
    const [cityCoordinates, setCityCoordinates] = useState([59.93388253587983, 30.321229494686143]);
    
   
    const newPlacemark = (event) => {
        
        let map = event;
       // console.log(map)
        if (map !== null)
        {
            map.events.add('click', (e) =>{

                if (!map.balloon.isOpen()) {
                    let coords = e.get('coords');
                    map.balloon.open(coords, {
                        contentHeader:'Метка поставлена',
                        contentBody: `<input type='hidden' name=${props.name} value='${[
                            coords[0].toPrecision(6),
                            coords[1].toPrecision(6)
                            ]}'/>`,
                        contentFooter:'<sup>Щелкните еще раз, чтобы снять метку</sup>'
                    });
                
                }
                else {
                    map.balloon.close();
                }
                

            })

        }
            
    
    }
    
    useEffect(()=>{

       
        async function getGeocode(city)
        {
            let coordinates = [];
            await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=5594e597-90cb-48f6-a139-b76c8a42a41a&geocode=${city}`)
            .then(result => result.json())
            .then(data => {

                let coords =  data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                coordinates[0] = Number.parseFloat(coords[1]);
                coordinates[1] = Number.parseFloat(coords[0]);

            });
            
            setCityCoordinates(coordinates);
           
        }
        
        getGeocode(props.cityName);
        

    }, [props.cityName])

    //console.log(props.cityName);

    let mapState = {center: cityCoordinates, zoom: props.zoom || 10};
  
   // console.log(cityCoordinates);

    return   (<div className={props.className + ' ' + classes.wrap} id={props.id}>
            
            <YMaps enterprise query={{apikey: '5594e597-90cb-48f6-a139-b76c8a42a41a&lang=ru_RU'}} 
               version={"2.1"}>
       
            <Map state={mapState} instanceRef={map => newPlacemark(map)}>
           
            {/* <Clusterer options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}>
                {markState.points.length ? markState.points.map((point) => (
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
                    ></GeoObject>)): ''}
            </Clusterer> */}

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
    
};

export default EditMap;