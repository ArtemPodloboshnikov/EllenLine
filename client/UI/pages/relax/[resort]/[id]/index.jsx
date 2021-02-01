import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PresentationMap from '../../../../components/Common/Map/PresentationMap';
import FormBooking from '../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../components/CustomElements/InfoSection.jsx';
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
import classes from './index.module.scss';

const getRelax = ({data}) => {
    // По идее здесь должен идти запрос к бд, а не передача через пропсы
    // Но это временно для проверки пока бд не прикручена
   
    const [dbData, setDbData] = useState(data);
    const router = useRouter();
    const {id} = router.query;
    let images = ['https://geekster.ru/wp-content/uploads/2017/09/warhammer-40k.jpg'];
    let coordinates = [3434, 4343];
    console.log(dbData + ' ' + (dbData!== null));
    if (dbData !== undefined && dbData !== null)
    {
        console.log('dbData!!!')
        images = [];
        let temp_images = dbData.imgSrc.split(',');
        temp_images.map(image => {

            images.push('/images/RelaxDynamic/' + image)
        })

        coordinates[0] = parseFloat(dbData.coordinates.split(',')[0]);
        coordinates[1] = parseFloat(dbData.coordinates.split(',')[1]);
        coordinates = [{coordinates: coordinates}]
        console.log(coordinates);
    }
    // Нужно заменить на конст
    // const[images, setImages] = useState(props.images);
    // const[title, setTitle] = useState(props.title);
    // const[price, setPrice] = useState(props.price);
    // const[services, setServices] = useState(props.services);
    // const[text, setText] = useState(props.text);
    // const[address, setAddress] = useState(props.address);

    useEffect(() =>{

        async function get()
        {
          
            
            
            await fetch(`http://localhost:4000/api/relax?id=${id}`)
            .then(response =>{

                return response.json()
            })
            .then(info => {
                
                setDbData(info[0]);
                
            })
        }
        if (!data)
        {
            get()
        }

    }, [])

    // if (!dbData)
    // {
    //     return (

    //         <Preloader/>
    //     )
    // }
    // let[images, setImages] = useState(props.images);
    // let[title, setTitle] = useState(props.title);
    // let[price, setPrice] = useState(props.price);
    // let[services, setServices] = useState(props.services);
    // let[text, setText] = useState(props.text);
    // let[address, setAddress] = useState(props.address);
    
  

    //#region Convert Object
    const convert = 
    { 
        'available': 
        {
            'restaurant': 
            [
                <i class="fa fa-cutlery" aria-hidden="true"></i>,
                <p>Ресторан</p>
            ], 
            'wifi': 
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в лобби</p>
            ] 
        },
        'common': 
        {
            'bar': 
            [
                <i class="fa fa-beer" aria-hidden="true"></i>,
                <p>Бар</p>
            ]
        },
        'rooms': 
        {
            'wifi':
            [
                <i class="fa fa-wifi" aria-hidden="true"></i>,
                <p>Wi-Fi в номере</p>
            ]
        }
    };
    //#endregion


        // Дальше по этому айди запрос к бд который возврщает пансионат/санаторий
   
        // let images = 
        // [ 
        //     'https://geekster.ru/wp-content/uploads/2017/09/warhammer-40k.jpg', 
        //     'https://s1.1zoom.ru/big3/72/419476-Kycb.jpg',
        //     'https://altwall.net/img/deathgroup/03_1024.jpg'
        // ];
        let services = 
        {
            'available': [ 'restaurant', 'wifi' ],
            'common': [ 'bar' ],
            'rooms': [ 'wifi' ]
        };
    

    function ConvertServices(service) {
        let massiv = services[service];
        let converts = convert[service];
        let elements = [];
        massiv.forEach(element => {
            elements.push(converts[element][0]);
            elements.push(converts[element][1]);
        });
        return elements;

    }

    const WrapForPreloader = ({data}) =>{

        return (

            <div className={classes.resort}>
                {/*  */}
                <InfoSection title={data.title} 
                            price={20000} 
                            text={data.description}
                            images={images}/>
                {/*  */}
                <div className={classes.services}>
                    <div className={classes.available}>
                        <h2>В наличии</h2>
                        <div className={classes.service}>
                            {ConvertServices('available')}
                        </div>
                    </div>
                    <div className={classes.common}>
                        <h2>Общие услуги</h2>
                        <div className={classes.service}>
                            {ConvertServices('common')}
                        </div>
                    </div>
                    <div className={classes.rooms}>
                        <h2>Услуги в номерах</h2>
                        <div className={classes.service}>
                            {ConvertServices('rooms')}
                        </div>
                    </div>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <h3>{data.address}</h3>
                    </div>
                </div>

                <PresentationMap className={classes.map}  points={coordinates}/>
               
                <FormBooking className={classes.form}/>
            </div>
        )
    }

    return (
        <ClientLayout title={!dbData ? 'Отдых' : dbData.title} preloader={!dbData}>
            <WrapForPreloader data={dbData}/>
        </ClientLayout>
    )
}

export default getRelax;

getRelax.getInitialProps = async ({req, query}) => {

    if (!req)
    {
        return {data: null}
    }
    let json = [];
    console.log(query.id)
    const res = await fetch(`http://localhost:4000/api/relax?id=${query.id}`)
    json = await res.json();


    console.log('On server: ' + JSON.stringify(json))
    return {data: json[0]}
    
}