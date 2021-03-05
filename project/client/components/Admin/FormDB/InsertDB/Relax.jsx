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

const Sanatorium = (props) => {
   
    const {register, handleSubmit, errors} = useForm()
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: ''});
    const [countryName, setCountryName] = useState('Россия');
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const [zoom, setZoom] = useState();
    const [servicesRows, setServicesRows] = useState(0);
  
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

    if (Object.keys(dbData).length != 0) 
    {
        
        dbData.countryWithCities.map(data => {
            
            contries_cities.cities[data.cityName] = data.idCity;
        });
        dbData.countries.map(data=>{

            contries_cities.countries[data.name] = data.id;
        })
       
    }

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

    const onBlurAddress = (e)=>{

        if (e.target.value != '')
        {
            setCityName(e.target.value);
            setZoom(18);
        }
    }
    
    return (

        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body} method='insert'/>
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='title' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Название'/>
            
                <TextArea register={register({required: true})} name='description'
                className={classes.textarea} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'/>

                <InputNumber register={register({required: true})} name='stars' 
                className={classes.inputNumber} placeholder='★' min='1' max='5'/>

                <FilesUploader register={register({required: true})} name='files' 
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото отеля/пансионата' />
                
                <SelectEntered register={register({required: true})} name='type'
                className={classes.select} placeholder='Тип заведения' options={['Пансионат', 'Отель']} type='select'/>

                <InputText register={register({required: true})} name='typeOfRoom' className={classes.inputText + ' ' + classes.inputText_width50} 
                classInput={classes.inputText__input} placeholder='Тип номера'/>

                <SelectEntered register={register({required: true})} name='country' value={countryName} onChangeFunction={setCountryName}
                className={classes.select} placeholder='Страна' options={Object.keys(contries_cities.countries)}/>

                <SelectEntered register={register({required: true})} name='city' onChangeFunction={setCityName}
                className={classes.select} placeholder='Город' options={Object.keys(contries_cities.cities)} />

                <InputText register={register({required: true})} name='address' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Адрес' onBlur={onBlurAddress}/>

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

                <InputNumber register={register({required: true})} name='price' 
                className={classes.inputNumber} placeholder='Цена' min='1'/>

                <InputNumber register={register({required: true})} name='discount' 
                className={classes.inputNumber} placeholder='Скидка' min='0' max='100' value='0'/>

                <Button className={classes.button} classInput={classes.button__text} value='Внести' />
            </form>
        </>
    )
}

export default Sanatorium
