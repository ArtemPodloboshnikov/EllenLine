import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import classes from './Treatment.module.scss';
import concatFormArray from '../../../../functions/ConcatFormArray';
import getPhotosPaths from '../../../../functions/GetPhotosPaths';
import Global from '../../../../pages/global';
//
import InputText from '../../../CustomElements/InputText'
import TextArea from '../../../CustomElements/TextArea'
import InputNumber from '../../../CustomElements/InputNumber'
import DynamicList from '../../../CustomElements/DynamicList'
import Button from '../../../CustomElements/Button'
import Message from '../../../Common/DialogWindow/Message';
import FilesUploader from '../../../CustomElements/FilesUploader'
import EditMap from '../../../Common/Map/EditMap';
import SelectEntered from '../../../CustomElements/SelectEntered'

const Sanatoriums = (props) => {
   
    const {register, handleSubmit, errors} = useForm()
    const [formData, setFormData] = useState({}); 
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'insert'});
    const [countryName, setCountryName] = useState('Россия');
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const [zoom, setZoom] = useState();
    const [servicesRows, setServicesRows] = useState(0);
    const [servicesMember, setServicesMember] = useState([1, 1, 1]);

    const handleOnSubmit = (data)=>{

        let new_data = new FormData();

        concatFormArray(data, data, ['commonServices', 'servicesRoom', 'inStock'])
        // let commonServices = [];
        // for (let i = 0; ; i++)
        // {
            
        //     if (data['commonServices' + i] === undefined)
        //     {
        //         break;
        //     }
        //     commonServices.push(data['commonServices' + i]);
        //     delete data['commonServices' + i]
        // }
        // data.commonServices = commonServices;

        // let servicesRoom = [];
        // for (let i = 0; ; i++)
        // {
           
            
        //     if (data['servicesRoom' + i] === undefined)
        //     {
        //         break;
        //     }
        //     servicesRoom.push(data['servicesRoom' + i]);
        //     delete data['servicesRoom' + i];
        // }
        // data.servicesRoom = servicesRoom;

        // let inStock = [];
        // for (let i = 0; ; i++)
        // {
            
        //     if (data['inStock' + i] === undefined)
        //     {
        //         break;
        //     }
        //     inStock.push(data['inStock' + i]);
        //     delete data['inStock' + i];
        // }
        // data.inStock = inStock;

        getPhotosPaths(data, 'files', 'photosPath', new_data)
        // data.photosPath = [];
        // for (let i = 0; i < data.files.length; i++)
        // {
        //     new_data.append('photos[]', data.files[i], data.files[i].name);
        //     data.photosPath.push(data.files[i].name);
        // }

        // delete data.files
        data.coordinates = document.getElementsByName('coordinates')[0].value.split(',');
        data.idCity = contries_cities.cities[data.city];
        delete data.city;
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
        // dbData.languages.map(data=>{

        //     contries_cities_languages.languages[data.name] = data.id;
        // })
       
    }
    console.log(contries_cities)
    useEffect(()=>{


        async function get()
        {
            let result = {};

            await fetch(Global.urlServer + '/api/countries?with=cities&whereCountryName[]=' + countryName)
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
            
            // await fetch('http://localhost:4000/api/languages')
            //   .then((response) => {
            //     return response.json();
            //   })
            //   .then((data) => {
            //     result = {...result, languages: data};
            //   });
            
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
            let response =  await fetch(Global.urlServer + '/api/treatment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            if (response.status === 404)
            {
                setMessage({style: {display: 'grid'}, status: json.status, method: 'insert'});
                console.log(message);
            }
            
            alert('Data send');
            
        }
        async function uploadPhotos(data)
        {

            let response =  await fetch(Global.urlServer + '/file/treatmentPhotos', {
                mode: 'no-cors',
                method: 'POST',
                body: data
            });
            console.log(response);
            
            
            if (response.status === 404)
            {
                setMessage({style: {display: 'grid'}, status: json.status, method: 'insert'});
                console.log(message);
            }
        }
        if (Object.keys(formData).length != 0)
        {
            console.log(formData)
            // insert(formData.json)
            // uploadPhotos(formData.photos)
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
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method} />
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                <InputText register={register({required: true})} name='title' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Название'/>
            
                <TextArea register={register({required: true})} name='description'
                className={classes.textarea} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'/>

                <FilesUploader register={register({required: true})} name='files' 
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото предстоящих открытий' />
                
                <SelectEntered register={register({required: true})} name='type'
                className={classes.select} placeholder='Тип' options={['Клиника', 'Санаторий']} type='select'/>

                {/* <SelectEntered register={register({required: true})} name='country' type='multiply'
                className={classes.select} placeholder='Язык' options={Object.keys(contries_cities_languages.languages)} /> */}

                <SelectEntered register={register({required: true})} name='country' value={countryName} onChangeFunction={(obj)=>setCountryName(obj.value)}
                className={classes.select} placeholder='Страна' options={Object.keys(contries_cities.countries)}/>

                <SelectEntered register={register({required: true})} name='city' onChangeFunction={(obj) => { setCityName(obj.value) }}
                className={classes.select} placeholder='Город' options={Object.keys(contries_cities.cities)} />

                <InputText register={register({required: true})} name='address' className={classes.inputText} 
                classInput={classes.inputText__input} placeholder='Адрес встречи' onBlur={onBlurAddress}/>

                <EditMap name='coordinates' cityName={cityName} className={classes.map} zoom={zoom}/>
    
                <div className={classes.form__services} style={{gridTemplateRows: `repeat(${servicesRows}, 1fr)`, height: `${servicesRows * 10}vh`}}>
                    <DynamicList name='inStock' register={register({required: true})} className={classes.dynamicList} 
                    members={servicesMember} setMembers={setServicesMember} index={0} classWrap={classes.form__services_wrap}
                    classInput={classes.dynamicList__input} placeholder='В наличии' rows={servicesRows} setRows={setServicesRows}/>

                    <DynamicList name='commonServices' register={register({required: true})} className={classes.dynamicList} 
                    members={servicesMember} setMembers={setServicesMember} index={1} classWrap={classes.form__services_wrap}
                    classInput={classes.dynamicList__input} placeholder='Общие услуги' rows={servicesRows} setRows={setServicesRows}/>

                    <DynamicList name='servicesRoom' register={register({required: true})} className={classes.dynamicList} 
                    members={servicesMember} setMembers={setServicesMember} index={2} classWrap={classes.form__services_wrap}
                    classInput={classes.dynamicList__input} placeholder='Услуги в номерах' title='В номерах' rows={servicesRows} setRows={setServicesRows}/>
                </div>

                <TextArea register={register({required: true})} name='treatment'
                className={classes.textarea + ' ' + classes.textarea_top10} classTitle={classes.textarea__title} 
                classTextArea={classes.textarea__text} title='Программа лечения' placeholder='Действует Markdown разметка'/>

                <InputNumber register={register({required: true})} name='price' 
                className={classes.inputNumber} placeholder='Цена' min='1' classWrap={classes.inputNumber_wrap}/>

                <InputNumber register={register({required: true})} name='pricePerChield' value='0'
                className={classes.inputNumber} placeholder='Цена для детей' min='0' classWrap={classes.inputNumber_wrap}/>

                <InputNumber register={register({required: true})} name='pricePerTeenager' value='0'
                className={classes.inputNumber} placeholder='Цена для подростков' min='0' classWrap={classes.inputNumber_wrap}/>

                <InputNumber register={register({required: true})} name='pricePerPet' value='0'
                className={classes.inputNumber} placeholder='Цена для питомцев' min='0' classWrap={classes.inputNumber_wrap}/>

                <InputNumber register={register({required: true})} name='discount' value='0'
                className={classes.inputNumber} placeholder='Скидка' min='0' max='100' classWrap={classes.inputNumber_wrap}/>

                <Button className={classes.button} classInput={classes.button__text} value='Внести' />
            </form>
        </>
    )
}

export default Sanatoriums
