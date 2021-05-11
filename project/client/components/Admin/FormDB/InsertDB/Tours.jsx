import {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import servicesHandler from '../../../../functions/ServicesHandler';
import getPhotosPaths from '../../../../functions/GetPhotosPaths';
import Global from '../../../../pages/global';
//
import classes from '../Common.module.scss';
//
import InputText from '../../../CustomElements/InputText'
import TextArea from '../../../CustomElements/TextArea'
import InputNumber from '../../../CustomElements/InputNumber'
import DynamicList from '../../../CustomElements/DynamicList'
import Button from '../../../CustomElements/Button'
import Message from '../../../Common/DialogWindow/MessageDB';
import FilesUploader from '../../../CustomElements/FilesUploader'
import EditMap from '../../../Common/Map/EditMap';
import SelectEntered from '../../../CustomElements/SelectEntered'

const Tours = (props) => {
   
    const {register, handleSubmit, errors} = useForm()
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'insert'});
    const [countryName, setCountryName] = useState('Россия');
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const [zoom, setZoom] = useState();
    const [servicesRows, setServicesRows] = useState(0);
    const [servicesMember, setServicesMember] = useState([1, 1]);

    const handleOnSubmit = (data)=>{

        let new_data = new FormData();
        let services = servicesHandler(data, true);
        data.services = {freeServices: services.freeServices, paidServices: services.paidServices}

        data.photosPath = [];
        getPhotosPaths(data, 'files', 'photosPath', new_data)

        delete data.files
        data.coordinates = document.getElementsByName('coordinates')[0].value.split(',');
        data.idCity = contries_cities.cities[data.city];
        delete data.city;

        let ids_languages = [];
        data.languages.split(', ').map(language=>{

            ids_languages.push(contries_cities_languages.languages[language])
        })
        data.id_languages = ids_languages;
        delete data.languages;
        setFormData({photos: new_data, json: data})
    }

    let contries_cities_languages = {countries: {}, cities: {}, languages: {}};

    if (Object.keys(dbData).length != 0) 
    {
        
        dbData.countryWithCities.map(data => {
            
            contries_cities_languages.cities[data.cityName] = data.idCity;
        });
        dbData.countries.map(data=>{

            contries_cities_languages.countries[data.name] = data.id;
        })
        dbData.languages.map(data=>{

            contries_cities_languages.languages[data.name] = data.id;
        })
       
    }
    console.log(contries_cities_languages)
    useEffect(()=>{


        async function get()
        {
            let result = {};
            let arrayCountryNames = (countryName !== undefined)? countryName.split(', ') : ['Россия'];
            let conditions = '';
            console.log(arrayCountryNames)
            arrayCountryNames.map(name =>{

                conditions += '&whereCountryName[]=' + name
            })
            await fetch(Global.urlServer + '/api/countries?with=cities' + conditions)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {countryWithCities: data};
              });
            await fetch(Global.urlServer + '/api/countries')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, countries: data};
              });
            
            await fetch(Global.urlServer + '/api/languages')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, languages: data};
              });
            
            setDbData(result);
        }
        get();


    }, [countryName])

    useEffect(()=>{

        async function insert(data)
        {
            
            // let request = new XMLHttpRequest()
            // request.open("POST", "http://localhost:4000/api/sanatoriums")
            // request.withCredentials = true
            // request.send(formData)
            let response =  await fetch(Global.urlServer + '/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            if (response.status !== 404)
            {
                setMessage({style: {display: 'grid'}, status: json.status, method: 'insert'});
                console.log(message);
            }
            
            
        }
        async function uploadPhotos(data)
        {

            let response =  await fetch(Global.urlServer + '/api/toursPhotos', {
                mode: 'no-cors',
                method: 'POST',
                body: data
            });
            console.log(response);
            
            
            if (response.status === 404)
            {
                setMessage({style: {display: 'grid'}, status: json.status, method: json.statusText});
                console.log(message);
            }
        }
        if (Object.keys(formData).length != 0)
        {
            console.log(formData)
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
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method}/>
            <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='title' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Название'/>
            
                <TextArea register={register({required: true})} name='description'
                className={classes.textarea} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'/>

                <FilesUploader register={register({required: true})} name='files' 
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото предстоящих открытий' />
                
                <SelectEntered register={register({required: true})} name='type'
                className={classes.select} placeholder='Тип' options={['Однодневный', 'Многодневный']} type='select'/>

                <SelectEntered register={register({required: true})} name='languages' type='multiply'
                className={classes.select} placeholder='Язык' options={Object.keys(contries_cities_languages.languages)} />

                <SelectEntered register={register({required: true})} name='country' value={countryName} onChangeFunction={(obj)=>setCountryName(obj.value)}
                className={classes.select} placeholder='Страна' options={Object.keys(contries_cities_languages.countries)} type='multiply'/>

                <SelectEntered register={register({required: true})} name='city' type='multiply'
                className={classes.select} placeholder='Город' options={Object.keys(contries_cities_languages.cities)} />

                <InputText register={register({required: true})} name='address' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Адрес встречи' onBlur={onBlurAddress}/>

                <EditMap name='coordinates' cityName={cityName} className={classes.map} zoom={zoom}/>
    
                <div className={classes.form__services} style={{gridTemplateRows: `repeat(${servicesRows}, 1fr)`, height: `${servicesRows * 10}vh`, gridTemplateColumns: 'repeat(2, 1fr)'}}>
                    <DynamicList name='freeServices' register={register({required: true})} className={classes.dynamicList} 
                    members={servicesMember} setMembers={setServicesMember} index={0}
                    classInput={classes.dynamicList__input} placeholder='Оплаченные услуги' rows={servicesRows} setRows={setServicesRows}/>
                    <DynamicList name='paidServices' register={register({required: true})} className={classes.dynamicList} 
                    members={servicesMember} setMembers={setServicesMember} index={1}
                    classInput={classes.dynamicList__input} placeholder='Платные услуги' rows={servicesRows} setRows={setServicesRows}/>
                </div>

                <TextArea register={register({required: true})} name='program'
                className={classes.textarea + ' ' + classes.textarea_top10} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Программа тура' placeholder='Действует Markdown разметка'/>

                <InputNumber classWrap={classes.inputNumber_wrap} register={register({required: true})} name='count_people' 
                className={classes.inputNumber} placeholder='Количество билетов' min='1'/>

                <InputNumber register={register({required: true})} name='price' 
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} placeholder='Цена' min='1'/>

                <InputNumber register={register({required: true})} name='pricePerChield' 
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} placeholder='Цена для детей' min='0'/>

                <InputNumber register={register({required: true})} name='pricePerTeenager' 
                className={classes.inputNumber}  classWrap={classes.inputNumber_wrap} placeholder='Цена для подростков' min='0'/>

                <InputNumber register={register({required: true})} name='pricePerPet' 
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} placeholder='Цена для питомцев' min='0'/>

                <InputNumber register={register({required: true})} name='discount' 
                className={classes.inputNumber} classWrap={classes.inputNumber_wrap} placeholder='Скидка' min='0' max='100' value='0'/>

                <Button className={classes.button} classInput={classes.button__text} value='Внести' />
            </form>
        </>
    )
}

export default Tours
