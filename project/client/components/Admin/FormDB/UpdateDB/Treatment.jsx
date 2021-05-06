import {useState, useEffect} from 'react';
import {arrayConcat, getPhotosPath, getExistingPhotosNames} from '../../functions';
import servicesHandler from '../../../../functions/ServicesHandler';
import {useForm} from 'react-hook-form';
//
import classes from './Treatment.module.scss';
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
import SelectOption from '../../../CustomElements/SelectOption';
import ChangeItemFromDB from '../../../Common/ChangeItemFromDB/ChangeItemFromDB'
import ImagesObserver from '../../../CustomElements/ImagesObserver';
import Table from '../../../CustomElements/Table';
import Checkbox from '../../../CustomElements/Checkbox';

const Treatment = (props) => {
   
    const [formData, setFormData] = useState({}); 
    const {register, handleSubmit} = useForm();
    const [dbData, setDbData] = useState({});
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', body: '', method: 'none'});
    const [cityName, setCityName] = useState('Санкт-Петербург');
    const [zoom, setZoom] = useState();
    const [servicesRows, setServicesRows] = useState(10);
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
    const [institution, setInstitution] = useState({uuid: ''});
    const [inputsCheckbox, setInputsCheckbox] = useState({title: false, description: false, stars: false, type: false, 
                                          typeOfRoom: false, country: false, city: false, address: false,
                                          price: false, discount: false, id: false})
    let inputs = [];
    let cities = {};
    let dataTreatment = {' ': {}};

    console.log(tempPhotos)
    const handleOnSubmit = (data)=>{
        console.log(document.getElementsByName('fileUploader')[0])
        let loadPhotosName = new FormData();
        let deletedPhotos = getExistingPhotosNames(photos, tempPhotos)
        
        console.log(photos, deletedPhotos)
        getPhotosPath(data, loadPhotosName, document.getElementsByName('fileUploader')[0])
        data.photosPath = arrayConcat(data.photosPath, tempPhotos);
        if (data.photosPath.length == 0)
        {
            data.photosPath = ['../no_image.jpg'];
        }
        
        if (data.inStock0 !== undefined || data.commonServices0 !== undefined || data.servicesRoom0 !== undefined)
        {
            let services = servicesHandler(data);
            data.services = {inStock: services.inStock, servicesRoom: services.servicesRoom, commonServices: services.commonServices}
        }
        
        if (document.getElementsByName('coordinates')[0] != undefined)
        {

            data.coordinates = document.getElementsByName('coordinates')[0].value.split(',');
        }
        
        data.id = institution.id
        data.id_city = cities[data.city];
        delete data.city
        // if (document.getElementsByName('coordinates')[0] != undefined)
        // {

        //     data.coordinates = document.getElementsByName('coordinates')[0].value.split(',');
        // }
        // data.idCity = contries_cities.cities[data.city];
        // delete data.city;
        // data.price = Number.parseInt(data.price);
        // data.discount = Number.parseInt(data.discount);
        // data.stars = Number.parseInt(data.stars);
        console.log(data)
        setFormData({photos: loadPhotosName, deletedPhotos: deletedPhotos, json: data})
    }

    let citiesNameId = {};

    if (Object.keys(dbData).length != 0) 
    {
        
       
        
        dbData.cities.map(data => {
            
            cities[data.name] = data.id;
            citiesNameId[data.id] = data.name;
        });
        dbData.dataTreatment.map(data=>{

            
           
            let temp_data = {...data}
            dataTreatment[data.title + ': ' + data.typeOfRoom] = temp_data; 
            dataTreatment[data.title + ': ' + data.typeOfRoom].services = [JSON.parse(temp_data.services)];
            //console.log(data.services)
            if (data.images != undefined)
            {
                dataTreatment[data.title + ': ' + data.typeOfRoom].photos = temp_data.images.split(',');
                let images = dataTreatment[temp_data.title + ': ' + temp_data.typeOfRoom].photos;
                if (images.length > 1 && images[images.length - 1] == '../no_image.jpg')
                {
                    dataTreatment[temp_data.title + ': ' + temp_data.typeOfRoom].photos = images.splice(0, 1);
                }
                
            }
            if (data.type != undefined)
            {
                dataTreatment[temp_data.title + ': ' + temp_data.typeOfRoom].type = temp_data.type.toUpperCase()[0] + temp_data.type.split('').splice(1).join('');
            }
            dataTreatment[temp_data.title + ': ' + temp_data.typeOfRoom].program = temp_data.program;
            dataTreatment[temp_data.title + ': ' + temp_data.typeOfRoom].count_people = temp_data.count_people;
        })
       
    }
    
    Object.keys(inputsCheckbox).map((key)=>{
        
        const isCheck = (component) =>{

            if (inputsCheckbox[key])
            {
    
                inputs.push(component)
            }
            else
            {
                inputs = inputs.filter((elem) => {return elem != component});
            }
        }
        switch (key)
        {
            case 'title': {

                const component = <InputText register={register({required: true})} className={classes.inputText} 
                                   placeholder='Название' name='title'/>;
                isCheck(component)

                break;
            }
            case 'price': {

                const component = <InputNumber name='price' className={classes.inputNumber} register={register({required: true})}
                                  placeholder='Цена' min='1' classWrap={classes.inputNumberWrap}/>;
                isCheck(component)

                break;
            }
            case 'discount': {

                const component = <InputNumber name='discount' className={classes.inputNumber} register={register({required: true})}
                                  placeholder='Скидка' min='1' classWrap={classes.inputNumberWrap}/>;
                isCheck(component)

                break;
            }
            case 'count_people': {

                const component = <InputNumber name='count_people' className={classes.inputNumber} register={register({required: true})}
                                  placeholder='Кл. мест' min='1' classWrap={classes.inputNumberWrap}/>;
                isCheck(component)

                break;
            }
            case 'payment_term': {

                const component = <InputText name='payment_term' className={classes.inputText} 
                                  register={register({required: true})} placeholder='Условия оплаты'/>;
                isCheck(component)

                break;
            }
            case 'description': {

                const component = <TextArea name='description' className={classes.textarea} register={register({required: true})}
                                  classTitle={classes.textarea__title} classTextArea={classes.textarea__text} 
                                  title='Описание' placeholder='Введите описание'/>;
                isCheck(component)

                break;
            }
            case 'type': {

                const component = <SelectEntered name='type' className={classes.select} register={register({required: true})}
                                  placeholder='Тип заведения' options={['Пансионат', 'Отель']} type='select'/>;
                isCheck(component)

                break;
            }
            case 'typeOfRoom': {

                const component = <InputText name='typeOfRoom' className={classes.inputText} 
                                  placeholder='Тип заведения' register={register({required: true})}/>;
                isCheck(component)

                break;
            }
            case 'city': {

                const onBlurAddress = (e)=>{

                    if (e.target.value != '')
                    {
                        setCityName(e.target.value);
                        setZoom(18);
                    }
                }

                const component = 
                <>
                    <SelectEntered name='city' className={classes.select} register={register({required: true})}
                                    placeholder='Город' options={Object.keys(cities)} onBlur={onBlurAddress}/>
                    <EditMap name='coordinates' cityName={cityName} className={classes.map} zoom={zoom}/>
                </>
                isCheck(component)

                break;
            }
            case 'address': {

                const component = <InputText name='address' className={classes.inputText} register={register({required: true})}
                                  classInput={classes.inputText__input} placeholder='Адрес'/>
                isCheck(component)

                break;
            }
            case 'program': {

                const component = <TextArea name='program' className={classes.textarea} register={register({required: true})}
                classTitle={classes.textarea__title} classTextArea={classes.textarea__text} title='Программа лечения' 
                classInput={classes.inputText__input} placeholder='Действует Markdown разметка' value={institution.program}/>
                isCheck(component)

                break;
            }
            case 'services': {

                const component = 
                <div className={classes.form__services} style={{gridTemplateRows: `repeat(${servicesRows}, 1fr)`, height: `${servicesRows * 10}vh`}}>
                    <DynamicList name='inStock' className={classes.dynamicList} value={institution.services !== undefined? institution.services[0].inStock : ['']}
                    classInput={classes.dynamicList__input} placeholder='В наличии' rows={servicesRows} setRows={setServicesRows} register={register({required: true})}/>
                    <DynamicList name='commonServices' className={classes.dynamicList} value={institution.services !== undefined? institution.services[0].commonServices : [''] }
                    classInput={classes.dynamicList__input} placeholder='Общие услуги' rows={servicesRows} setRows={setServicesRows} register={register({required: true})}/>
                    <DynamicList name='servicesRoom' className={classes.dynamicList} value={institution.services !== undefined? institution.services[0].servicesRoom : ['']}
                    classInput={classes.dynamicList__input} placeholder='Услуги в номерах' rows={servicesRows} setRows={setServicesRows} register={register({required: true})}/>
                </div>
                
                isCheck(component)
                
                break;
            }

        }
    })

    console.log(institution)
    
    if (institution.uuid != '')
    {
        
        const newObject = (obj, names) =>{

            names.map((name)=>{

                obj[name] = dataTreatment[institution.uuid][name]
            })

            return obj
        }
        // console.log(newObject({uuid: '', city: citiesNameId[dataHotels[institution.uuid].id_city]}, 
        //                                            ['title', 'description', 'stars', 'type', 
        //                                             'typeOfRoom', 'address', 'program',
        //                                             'price', 'discount', 'id', 'services']))
        setInstitution(newObject({uuid: '', city: citiesNameId[dataTreatment[institution.uuid].id_city]}, 
                                             ['title', 'description', 'stars', 'type', 
                                              'typeOfRoom', 'address', 'services',
                                              'price', 'discount', 'id', 'program',
                                              'payment_term', 'count_people']))

        setPhotos(dataTreatment[institution.uuid].photos);
        setTempPhotos(dataTreatment[institution.uuid].photos)

    }

   
    
    useEffect(()=>{


        async function get()
        {
            let result = {};

            await fetch('http://localhost:4000/api/cities')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {cities: data};
              });

            await fetch('http://localhost:4000/api/countries')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, countries: data};
              });
           
            await fetch('http://localhost:4000/api/treatment')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                result = {...result, dataTreatment: data};
              });
            console.log(result.dataHotels)
            setDbData(result);
        }
        if (Object.keys(dbData).length == 0)
            get();


    }, [dbData])

    useEffect(()=>{

        async function update(data)
        {
            console.log(data)
            let response =  await fetch('http://localhost:4000/api/treatment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            
            console.log(response);

          
            setMessage({style: {display: 'grid'}, status: response.status, body: response.statusText, method: 'update'});
            //console.log(message);
            
            
          
            
        }
        async function uploadPhotos(data)
        {
            //console.log(data.get('photos[]'))
            let response =  await fetch('http://localhost:4000/file/treatmentPhotos', {
                mode: 'no-cors',
                method: 'POST',
                body: data
            });
            //console.log(response);
            
            
            // if (response.status === 404)
            // {
            //     setMessage({style: {display: 'grid'}, status: json.status, body: json.statusText});
            //     console.log(message);
            // }
        }
        async function deletePhotos(data)
        {console.log(data)

            let query = '';

            data.map(el=>{

                if (query.indexOf('?') === -1) 
                {
                    query += '?photosName[]=' + el;  
                }
                else
                {
                    query += '&photosName[]=' + el;
                }
            })
            console.log(query)
            let response =  await fetch('http://localhost:4000/file/treatmentPhotos' + encodeURI(query), {
                method: 'DELETE'
            });
            console.log(response);

            setMessage({style: {display: 'grid'}, status: response.status, body: response.statusText, method: 'deletedFile'});
        }

        async function deletePhotosFromDB(data)
        {
            let response =  await fetch('http://localhost:4000/file/treatment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            setMessage({style: {display: 'grid'}, status: response.status, body: response.statusText, method: 'deletedFile'});
        }

        console.log(formData)
        if (Object.keys(formData).length != 0)
        {
            if (Object.keys(formData.json).length != 0)
                update(formData.json)
            if (formData.photos.get('photos[]') !== undefined)
                uploadPhotos(formData.photos)
            if (formData.deletedPhotos.length != 0)
                deletePhotos(formData.deletedPhotos)
            //if (formData.)
            setDbData({});
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

    function onBlurAddress(e){

        if (e.target.value != '')
        {
            setCityName(e.target.value);
            setZoom(18);
            onBlurCheckbox(e.target.value, address, 'address')
        }
    }
    
    return (

        <>
            <Message setFunction={setMessage} style={message.style} status={message.status} body={message.body} method={message.method}/>
            <ChangeItemFromDB type='treatment' options={Object.keys(dataTreatment)} onChangeFunction={(obj)=>setInstitution({uuid: obj.value})}
            />
            <div style={{overflowX: 'hidden'}}>
            <Table titles={[{value: 'Название', key: 'title'}, {value: 'Цена', key: 'price'}, 
                            {value: 'Скидка', key: 'discount'}, {value: 'Условия оплаты', key: 'payment_term'},
                            {value: 'Описание', key: 'description'}, {value: 'Тип', key: 'type'}, 
                            {value: 'Тип комнаты', key: 'typeOfRoom'}, {value: 'Город', key: 'city'}, 
                            {value: 'Адрес', key: 'address'}, {value: 'Программа лечения', key: 'program'},
                            {value: 'Кл. мест', key: 'count_people'}, {value: 'Услуги', key: 'services'}]} 
                    info={[institution]} className={classes.table} checkbox={inputsCheckbox} setCheckbox={setInputsCheckbox}/></div>
            
            <form className={props.className + ' ' + classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
                {inputs}

                <ImagesObserver prefix='/images/Treatment/' pathImages={photos || (!dbData.dataTreatment ? ['images/logo.svg'] : dbData.dataTreatment[0].images.split(','))} 
                tempPhotos={tempPhotos} setTempPhotos={setTempPhotos} className={classes.imagesObserver}/>

                <FilesUploader name='fileUploader'
                className={classes.filesUploader} classInput={classes.filesUploader__text} 
                classPlaceholder={classes.filesUploader__placeholder} placeholder='Фото отеля/пансионата' />
                
                <Button className={classes.button} 
                classInput={classes.button__text} value='Обновить' />
                    
            </form>
            
        </>
    )
}

export default Treatment
