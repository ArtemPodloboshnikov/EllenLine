import classes from './SearchByName.module.scss';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import SelectEntered from '../../CustomElements/SelectEntered';
import Button from '../../CustomElements/Button'

const SerachByName = (props) => {

    const {register, handleSubmit, errors} = useForm()
    const [dataDb, setDataDb] = useState();
    const handleOnSubmit = (data) => {


    }

    useEffect(()=>{


    }, [])

    return (
        <form className={classes.search + ' ' + props.className} onSubmit={handleSubmit(handleOnSubmit)}>
            <SelectEntered register={register({required: true})} name='search_text'
                className={classes.selected + ' ' + props.classNameSelected} placeholder='Введите название чего-либо' options={['Пансионат', 'Отель']}/>
            <Button className={classes.button + ' ' + props.classNameButton} register={register({required: true})}
             value={<p className={"fas fa-search " + classes.button__loupe}></p>}/>
        </form>
    )
}

export default SerachByName
