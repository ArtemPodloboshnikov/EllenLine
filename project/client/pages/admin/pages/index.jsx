import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Global from '../../global';
import concatFormArray from '../../../functions/ConcatFormArray';
//
import AdminLayout from '../../../layouts/AdminLayout';
import SelectEntered from '../../../components/CustomElements/SelectEntered';
import TextArea from '../../../components/CustomElements/TextArea';
import DynamicList from '../../../components/CustomElements/DynamicList';
import Button from '../../../components/CustomElements/Button';
import Terms from '../../../components/Terms/Terms';
import Message from '../../../components/Common/DialogWindow/MessageDB';
//
import classes from './index.module.scss';

const index = () => {

    const [page, setPage] = useState('Условия оплаты');
    const [data, setData] = useState({});
    const {register, handleSubmit} = useForm();
    const [formData, setFormData] = useState({}); 
    const [typesOfInfo, setTypesOfInfo] = useState({});
    const [preview, setPreview] = useState(false);
    const [update, setUpdate] = useState(false);
    const [previewData, setPreviewData] = useState();
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'});
    
    const typeOfData = {'text': 'Текст', 'card': 'Карточки', 'list': 'Список'}
    const typeOfDataValues = Object.values(typeOfData);
    const [editor, setEditor] = useState();

    const getKeyByValue = (array, value) => 
    {
        for(let prop in array) {
            if (array.hasOwnProperty(prop)) {
                 if(array[prop] === value)
                     return prop;
            }
        }
    }
    
    if (flag)
    {
        const temp_typesOfInfo = {...typesOfInfo};
        const temp_editor = [];
        const temp_data = {...data};
        //console.log(temp_typesOfInfo)
        for (let key in data){
            
            const editor_component = [];
            if (temp_typesOfInfo[key] === undefined) temp_typesOfInfo[key] = temp_data[key].type;

            const type = temp_typesOfInfo[key];

            console.log(temp_typesOfInfo)
            switch (type)
            {
                case 'text':{

                    editor_component.push(<TextArea title={temp_data[key].title} placeholder='Напишите текст' value={temp_data[key].content}
                    name={key} className={classes.textarea} register={register({required: true})} classTitle={classes.textareaTitle} classTextArea={classes.textareaText}/>);
                    break;
                } 
                case 'card':
                case 'list':{

                   
                    editor_component.push(<DynamicList name={key} register={register({required: true})} value={temp_data[key].content}
                    placeholder={temp_data[key].title} type='textarea' className={classes.dynamicSelect} classWrap={classes.dynamicSelectWrap}/>);
                    
                }
                
            }
            temp_editor.push(
                
                <div className={classes.editor__block}>
                    {editor_component}
                    <SelectEntered className={classes.select}  options={typeOfDataValues} 
                    onChangeFunction={(obj) => {
                        const temp_typesOfInfo = {...typesOfInfo};
                        console.log(temp_typesOfInfo)
                        temp_typesOfInfo[key] = getKeyByValue(typeOfData, obj.value);
                        setTypesOfInfo(temp_typesOfInfo);
                        setFlag(true)
                    }} name={key + '_type'} register={register({required: true})} value={typeOfData[type]} arrowSize={[30, 30]}
                    />
                    {/* <input type='hidden' name={key + '_field'} value={key}/> */}
                </div>
            );
        }
        console.log(temp_typesOfInfo)
        setTypesOfInfo(temp_typesOfInfo);
        setEditor(temp_editor)
        setFlag(false)
    }
    
    const handleOnSubmit = (new_data) =>{

        console.log(new_data);
        console.log(preview);
        console.log(update);
        let temp_data = {};
        let isArray = [];
        for (let key of Object.keys(data))
        {
            data[key].content = new_data[key];
            data[key].type = getKeyByValue(typeOfData, new_data[key + '_type']);

            if (new_data[key + '0'] !== undefined) isArray.push(key);
        }
        if (!!isArray)
        {
            concatFormArray(new_data, temp_data, isArray)
            for (let name of isArray)
            {
                data[name] = {content: temp_data[name], title: data[name].title, 
                    type: getKeyByValue(typeOfData, new_data[name + '_type'])}
            }
        }
        setFormData(data);
        // if (update) setUpdate(false);
        // if (preview) setPreview(false);
    }
    useEffect(()=>{

        async function get()
        {
            const temp_page = page.toLowerCase().replace(' ', '_');
            console.log(temp_page)
            const res = await fetch(encodeURI(Global.urlServer + '/file/pages?namePage=' + temp_page))
            const json = await res.json();
            setData(json);
            setFlag(true);
            console.log(json)
        }

        get();

    }, [page])

    useEffect(()=>{

        

    }, [preview])

    useEffect(()=>{
        console.log(`preview: ${preview}; update: ${update}`)
        async function updateAction()
        {
            const temp_page = page.toLowerCase().replace(' ', '_');
            const response = await fetch(encodeURI(Global.urlServer + '/file/pages?namePage=' + temp_page), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            })
            setUpdate(false);
            setMessage({style: {display: 'grid'}, status: response.status, method: 'update'});
        }
        async function previewAction()
        {
            const res = await fetch(Global.urlServer + '/file/pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            })
            const json = await res.json();
            setPreview(false);
            console.log(json)
            setPreviewData(json)
        }
        console.log(formData)
        if (preview)
        {
            previewAction()
            
        }

        if (update)
        {
            updateAction()
            
        } 
         

    }, [preview, update, formData])

    // if (previewData !== undefined)
    // {
    //     for (let info of Object.values(previewData))
    //     {
    //         preview_info.push(

    //             info.content
    //         )
    //     }
    // }

    return (
        <AdminLayout title='Страницы' sector='pages'>
            <Message setFunction={setMessage} style={message.style} status={message.status} method={message.method} />
            <div className={classes.wrap}>
                <form className={classes.pages} onSubmit={handleSubmit(handleOnSubmit)}>
                    <SelectEntered name='page' onChangeFunction={(obj) => setPage(obj.value)}
                    type='select' options={['Домашняя', 'Условия оплаты']} value={page} className={classes.select_page}/>
                    <div className={classes.pages__editor}>
                        {editor}
                        <div className={classes.controls}>
                            <Button value='Предпросмотр' className={classes.button} onClick={()=>{

                                setPreview(true)
                            }}
                            />
                            <Button className={classes.button} value='Обновить' onClick={()=>{

                                setUpdate(true);

                            }}/>
                        </div>
                    </div>
                </form>
                <div className={classes.pages__preview}>
                        {(()=>{

                            if (previewData !== undefined)
                            {
                                return <Terms data={previewData}/>
                            }

                        })()}
                </div>
            </div>
        </AdminLayout>
    )
}

export default index
