import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import Global from '../../../pages/global';
//
import classForm from '../../../styles/FormDB.module.scss';
import classes from './Roles.module.scss';
//
import ShowInfo from '../../Common/DialogWindow/ShowInfo';
import Message from '../../Common/DialogWindow/MessageDB';
import SelectEntered from '../../CustomElements/SelectEntered';
import InputText from '../../CustomElements/InputText';
import Button from '../../CustomElements/Button';
import Table from '../../CustomElements/Table';

const Roles = () => {

    const {register: registerDelete, handleSubmit: handleSubmitDelete} = useForm();
    const {register: registerEdit, handleSubmit: handleSubmitEdit} = useForm();
    const {register: registerAdd, handleSubmit: handleSubmitAdd} = useForm();
    const {register: registerGive, handleSubmit: handleSubmitGive} = useForm();
    const arrowSize = [40, 40];
    
    const [dialogWindow, setDialogWindow] = useState({style: {display: 'none'}, title: '', text: ''})
    const [message, setMessage] = useState({style: {display: 'none'}, status: '', method: 'update'})
    const [indexData, setIndexData] = useState(-1);
    const [roles, setRoles] = useState({});
    const [dbData, setDbData] = useState({});
    const [pages, setPages] = useState([]);
    const pagesAll = ['Промокоды', 'Сотрудники', 'Заказы', 'Трафик', 'Страницы', 'Финансы', 'База данных'];
    let rolesNameId = {};
    let rolesNamePages = {};
    let rolesName = Object.keys(rolesNameId) || [];
    const rolesPages = (roleName) =>{
        
        return rolesNamePages[roleName];
    }
    console.log(rolesPages)
    if (rolesName.length != 0)
    {
        roles.map((role)=>{

            rolesNameId[role.name] = role.id;
            rolesNamePages[role.name] = role.pages;
        })
    }
    const handleEdit = (data) =>{

        async function edit()
        {
            const res = await fetch(Global.urlServer + '/api/');
        }
        console.log(data);
    }
    
    const handleDelete = (data) =>{

        console.log(data)
    }

    const handleGive = (data) =>{

        console.log(data)
    }
    useEffect(()=>{

        async function get()
        {
            let res = await fetch(Global.urlServer + '/api/employees?for=roles');
            let json = await res.json();
            setDbData(json);

            res = await fetch(Global.urlServer + '/api/roles');
            json = await res.json();
            setRoles(json);

            setIndexData(-2);
        } 
        
        if (Object.keys(dbData).length == 0 && indexData == -1)
            get()

    }, [dbData])

    useEffect(()=>{

        if (indexData >= 0)
        {
            
            setDialogWindow({style: {display: 'grid'}, title: dbData[indexData].name, text: (()=>{

                return (
                <form className={classes.message_content} onSubmit={handleSubmitGive(handleGive)}>
                    <SelectEntered className={classes.select} type='select' name='roles' arrowSize={arrowSize}
                    register={registerGive({required: true})} options={rolesName} placeholder='Роли'/>
                    <SelectEntered className={classes.select} type='multiply' name='pagesForMan' arrowSize={arrowSize}
                    register={registerGive({required: true})} options={pagesAll} placeholder='Страницы'/>
                    <Button value='Изменить' className={classes.button}/>
                    <input type='hidden' name='index' value={indexData}/>
                </form>
                )

            })()});

            setIndexData(-2)
        }

    }, [indexData])

    return (
        <>
            <div className={classes.forms}>
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitDelete(handleDelete)}>
                    <SelectEntered arrowSize={arrowSize} className={classes.select} type='select' name='roles' 
                    register={registerDelete({required: true})} options={rolesName} placeholder='Роли'/>
                    <Button className={classes.button} value='Удалить роль'/>
                </form>   
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitEdit(handleEdit)}>
                    <SelectEntered className={classes.inputText} register={registerEdit({required: true})} 
                    name='name' placeholder='Название роли' options={rolesName} onChangeFunction={(obj)=>setPages(rolesPages(obj.value))}/>
                    <SelectEntered className={classes.select} type='multiply' name='pages' arrowSize={arrowSize}
                    register={registerEdit({required: true})} options={pages} placeholder='Страницы'/>
                    <Button className={classes.button} value='Изменить роль'/>
                </form>   
                <form className={classForm.form + ' ' + classes.form} onSubmit={handleSubmitAdd(handleEdit)}>
                    <InputText className={classes.inputText} register={registerAdd({required: true})} 
                    name='name' placeholder='Название роли'/>
                    <SelectEntered className={classes.select} type='multiply' name='pages' arrowSize={arrowSize}
                    register={registerAdd({required: true})} options={pagesAll} placeholder='Страницы'/>
                    <Button className={classes.button} value='Добавить роль'/>
                </form>   
            </div>

            <Message setFunction={setMessage} status={message.status} method={message.method} style={message.style}/>
            <ShowInfo setFunction={setDialogWindow} style={dialogWindow.style} title={dialogWindow.title} text={dialogWindow.text}/>
            <Table titles={[{value: 'Имя', key: 'name'}, {value: 'Профессия', key: 'profession'}]} 
            info={dbData} className={classes.table} ActionButton={({index})=>{
                return <button onClick={()=>{

                    setIndexData(index)

                }}><i class="fas fa-cog"></i></button>
            }}/>
        </>
    )
}

export default Roles
