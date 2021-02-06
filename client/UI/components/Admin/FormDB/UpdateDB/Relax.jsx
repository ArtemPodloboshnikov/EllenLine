import {useState, useEffect} from 'react'
import classes from './Relax.module.scss'
import InputText from '../../../CustomElements/InputText'
import TextArea from '../../../CustomElements/TextArea'
import InputNumber from '../../../CustomElements/InputNumber'
import DynamicList from '../../../CustomElements/DynamicList'
import Button from '../../../CustomElements/Button'
import { useForm } from "react-hook-form";
import Message from '../../../Common/DialogWindow/Message';
import FilesUploader from '../../../CustomElements/FilesUploader'
import EditMap from '../../../Common/Map/EditMap';
import SelectEntered from '../../../CustomElements/SelectEntered'
import SelectOption from '../../../CustomElements/SelectOption';
import ChangeItemFromDB from '../../../Common/ChangeItemFromDB/ChangeItemFromDB'
import ImagesObserver from '../../../CustomElements/ImagesObserver';

const Sanatorium = (props) => {
   
    const {register, handleSubmit, errors} = useForm()
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [countryName, setCountryName] = useState('Россия');
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const [zoom, setZoom] = useState();
    const [servicesRows, setServicesRows] = useState(0);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState()
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [type, setType] = useState();
    const [typeOfRoom, setTypeOfRoom] = useState();
    const [photos, setPhotos] = useState();
    const [tempPhotos, setTempPhotos] = useState(['']);
    const [institution, setInstitution] = useState('');

    const handleOnSubmit = (data)=>{

        let new_data = new FormData();
        let commonServices = [];

        for (let i = 0; ; i++)
        {
            
            if (data['commonServices' + i] === undefined)
            {
                break;
            }
            commonServices.push(data['commonServices' + i]);
            delete data['commonServices' + i]
        }

        let servicesRoom = [];
        for (let i = 0; ; i++)
        {
           
            
            if (data['servicesRoom' + i] === undefined)
            {
                break;
            }
            servicesRoom.push(data['servicesRoom' + i]);
            delete data['servicesRoom' + i];
        }

        let inStock = [];
        for (let i = 0; ; i++)
        {
            
            if (data['inStock' + i] === undefined)
            {
                break;
            }
            inStock.push(data['inStock' + i]);
            delete data['inStock' + i];
        }

        data.services = {inStock: inStock, servicesRoom: servicesRoom, commonServices: commonServices}
        data.photosPath = [];
        for (let i = 0; i < data.files.length; i++)
        {
            new_data.append('photos[]', data.files[i], data.files[i].name);
            data.photosPath.push(data.files[i].name);
        }

        delete data.files

        if (document.getElementsByName('coordinates')[0] != undefined)
        {

            data.coordinates = document.getElementsByName('coordinates')[0].value.split(',');
        }
        data.idCity = contries_cities.cities[data.city];
        delete data.city;
        data.price = Number.parseInt(data.price);
        data.discount = Number.parseInt(data.discount);
        data.stars = Number.parseInt(data.stars);
        setFormData({photos: new_data, json: data})
    }

    let contries_cities = {countries: {}, cities: {}};
    let dataHotels = {' ': {}};

    if (Object.keys(dbData).length != 0) 
    {
        
        dbData.countryWithCities.map(data => {
            
            contries_cities.cities[data.cityName] = data.idCity;
        });
        dbData.countries.map(data=>{

            contries_cities.countries[data.name] = data.id;
        })
        dbData.dataHotels.map(data=>{
           
            dataHotels[data.title + ': ' + data.typeOfRoom + ' - ' + data.idItem] = data; 
            if (data.imgSrc != undefined)
            {
                dataHotels[data.title + ': ' + data.typeOfRoom + ' - ' + data.idItem].photos = data.imgSrc.split(',');
            }
            if (data.type != undefined)
            {
                dataHotels[data.title + ': ' + data.typeOfRoom + ' - ' + data.idItem].type = data.type.toUpperCase()[0] + data.type.split('').splice(1).join('');
            }
        })
       
    }
    console.log('tempPhotos: ' + tempPhotos + ' photos: ' + photos)
    useEffect(()=>{

        if (institution != '')
        {
           
            
            setTitle(dataHotels[institution].title);
            setDescription(dataHotels[institution].description);
            setStars(dataHotels[institution].stars);
            setType(dataHotels[institution].type);
            setTypeOfRoom(dataHotels[institution].typeOfRoom);
            setCountry(dataHotels[institution].country);
            setCity(dataHotels[institution].city);
            setAddress(dataHotels[institution].address);
            setPhotos(dataHotels[institution].photos);
            setTempPhotos(dataHotels[institution].photos)
            setPrice(dataHotels[institution].price);
            setDiscount(dataHotels[institution].discount)
        }

    }, [institution])
    
    useEffect(()=>{


        async function get()
        {
            let result = {};

            await fetch('http://localhost:4000/api/countries?with=cities&whereCountryName=' + countryName)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {countryWithCities: data};
              });

            await fetch('http://localhost:4000/api/countries')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, countries: data};
              });
           
            await fetch('http://localhost:4000/api/relax')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, dataHotels: eval(data)};
              });
            
            setDbData(result);
        }
        get();


    }, [countryName])

    useEffect(()=>{

        async function insert(data)
        {
            console.log(data)
            let response =  await fetch('http://localhost:4000/api/relax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            
            console.log(response);

          
            setMessage({style: {display: 'grid'}, status: response.status, body: response.statusText});
            console.log(message);
            
            
          
            
        }
        async function uploadPhotos(data)
        {
            console.log(data.get('photos[]'))
            let response =  await fetch('http://localhost:4000/api/relaxPhotos', {
                mode: 'no-cors',
                method: 'POST',
                body: data
            });
            console.log(response);
            
            
            // if (response.status === 404)
            // {
            //     setMessage({style: {display: 'grid'}, status: json.status, body: json.statusText});
            //     console.log(message);
            // }
        }
        if (Object.keys(formData).length != 0)
        {
           
            insert(formData.json)
            uploadPhotos(formData.photos)
        }

    }, [formData])
   // console.log(dbData.dataHotels[1].price)

    const onBlurCheckbox = (value, keyObject, keyString) =>{

        if (value != '' && (value != (keyObject || (!dbData.dataHotels ? '' : dbData.dataHotels[0][keyString]))))
        {

            document.getElementById(keyString).checked = true;
        }
        else
        {
            document.getElementById(keyString).checked = false;
        }
    }

    const onBlurAddress = (e)=>{

        if (e.target.value != '')
        {
            setCityName(e.target.value);
            setZoom(18);
            onBlurCheckbox(e.target.value, address, 'address')
        }
    }

    return (

        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body} method='insert'/>
            <ChangeItemFromDB type='relax' options={Object.keys(dataHotels)} onChangeFunction={setInstitution}
            idsChecked={['title', 'description', 'type', 'typeOfRoom', 'country', 'city', 'address']}
            />
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <div className={classes.block}>
                    <InputText name='title' className={classes.inputText} value={title || (!dbData.dataHotels ? '' : dbData.dataHotels[0].title)}
                    classInput={classes.inputText__input} placeholder='Название' 
                    onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, title, 'title')
                    }}/>
                    <input type='checkbox' id='title' disabled={true} onChange={()=>{

                        document.getElementsByName('title')[0].register = register({required: true})
                    }}/>
                </div>
                <div className={classes.block}>
                    <TextArea register={register({required: true})} name='description'
                    className={classes.textarea} classTitle={classes.textarea__title} value={description || (!dbData.dataHotels ? '' : dbData.dataHotels[0].description)}
                    classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'
                    onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, description, 'description')
                    }}
                    />
                    <input type='checkbox' id='description' disabled={true} onChange={()=>{

                        document.getElementsByName('description')[0].register = register({required: true})
                    }}/>
                </div>
                <div className={classes.block}>
                    <InputNumber register={register({required: true})} name='stars' 
                    className={classes.inputNumber} placeholder='★' min='1' max='5' value={stars || (!dbData.dataHotels ? '' : dbData.dataHotels[0].stars)} onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, stars, 'stars')
                    }}
                    />
                    <input type='checkbox' id='stars' disabled={true} onChange={()=>{

                        document.getElementsByName('stars')[0].register = register({required: true})
                    }}
                    />
                </div>

                <ImagesObserver prefix='/images/RelaxDynamic/' pathImages={photos || (!dbData.dataHotels ? ['/images/logo.svg'] : dbData.dataHotels[0].photos)} tempPhotos={tempPhotos} setTempPhotos={setTempPhotos}/>

                <FilesUploader register={register({required: true})} name='files' 
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото отеля/пансионата' />
                <div className={classes.block}>
                    <SelectEntered register={register({required: true})} name='type' value={type || (!dbData.dataHotels ? '' : dbData.dataHotels[0].type)}
                    className={classes.select} placeholder='Тип заведения' options={['Пансионат', 'Отель']} type='select'
                    onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, type, 'type')
                    }}
                    />
                    <input type='checkbox' id='type' disabled={true} onChange={()=>{

                        document.getElementsByName('type')[0].register = register({required: true})
                    }}
                    />
                </div>
                <div className={classes.block}>
                    <InputText register={register({required: true})} name='typeOfRoom' className={classes.inputText + ' ' + classes.inputText_width50} 
                    classInput={classes.inputText__input} placeholder='Тип номера' value={typeOfRoom || (!dbData.dataHotels ? '' : dbData.dataHotels[0].typeOfRoom)} onBlur={(e)=>{

                    onBlurCheckbox(e.target.value, typeOfRoom, 'typeOfRoom')
                    }}
                    />
                    <input type='checkbox' id='typeOfRoom' disabled={true} onChange={()=>{

                    document.getElementsByName('typeOfRoom')[0].register = register({required: true})
                    }}/>

                </div>
                <div className={classes.block}>
                    <SelectEntered register={register({required: true})} name='country' value={countryName} onChangeFunction={setCountryName}
                    className={classes.select} placeholder='Страна' options={Object.keys(contries_cities.countries)} value={country || (!dbData.dataHotels ? '' : dbData.dataHotels[0].country_name)} onBlur={(e)=>{

                    onBlurCheckbox(e.target.value, country, 'country')
                    }}
                    />
                    <input type='checkbox' id='country' disabled={true} onChange={()=>{

                    document.getElementsByName('country')[0].register = register({required: true})
                    }}
                    />

                </div>
                <div className={classes.block}>
                    <SelectEntered register={register({required: true})} name='city' onChangeFunction={setCityName}
                    className={classes.select} placeholder='Город' options={Object.keys(contries_cities.cities)} value={city || (!dbData.dataHotels ? '' : dbData.dataHotels[0].city_name)} onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, city, 'city')
                    }}
                    />
                    <input type='checkbox' id='city' disabled={true} onChange={()=>{

                    document.getElementsByName('city')[0].register = register({required: true})
                    }}
                    />

                </div>
                <div className={classes.block}>
                    <InputText register={register({required: true})} name='address' className={classes.inputText} value={address || (!dbData.dataHotels ? '' : dbData.dataHotels[0].address)}
                    classInput={classes.inputText__input} placeholder='Адрес' onBlur={onBlurAddress}/>
                    <input type='checkbox' id='address' disabled={true} onChange={()=>{

                        document.getElementsByName('address')[0].register = register({required: true})
                    }}
                    />
                </div>

                <EditMap name='coordinates' cityName={cityName} className={classes.map} zoom={zoom}/>
                {/* <SelectOption type='dynamic' /> */}
                <div className={classes.form__services} style={{gridTemplateRows: `repeat(${servicesRows}, 1fr`, height: `${servicesRows * 10}vh`}}>
                    <DynamicList name='inStock' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='В наличии' rows={servicesRows} setRows={setServicesRows}/>
                    <DynamicList name='commonServices' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='Общие услуги' rows={servicesRows} setRows={setServicesRows}/>
                    <DynamicList name='servicesRoom' register={register({required: true})} className={classes.dynamicList} 
                    classInput={classes.dynamicList__input} placeholder='Услуги в номерах' rows={servicesRows} setRows={setServicesRows}/>
                </div>
                
                <div className={classes.block}>
                    <InputNumber register={register({required: true})} name='price' 
                    className={classes.inputNumber} placeholder='Цена' min='1' value={price || (!dbData.dataHotels ? '' : dbData.dataHotels[0].price)} onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, price, 'price')
                    }}
                    />

                    <input type='checkbox' id='price' disabled={true} onChange={()=>{

                        document.getElementsByName('price')[0].register = register({required: true})
                    }}
                    />
                </div>
                <div className={classes.block}>{console.log(dbData.dataHotels)}
                    <InputNumber register={register({required: true})} name='discount' 
                    className={classes.inputNumber} placeholder='Скидка' min='0' max='100' value={discount || (!dbData.dataHotels ? '' : dbData.dataHotels[0].discount)} onBlur={(e)=>{

                        onBlurCheckbox(e.target.value, discount, 'discount')
                    }}
                    />
                    <input type='checkbox' id='discount' disabled={true} onChange={()=>{

                        document.getElementsByName('discount')[0].register = register({required: true})
                    }}
                    />
                </div>
                
                <Button className={classes.button} classInput={classes.button__text} value='Обновить' />
                    
            </form>
            
        </>
    )
}

export default Sanatorium
