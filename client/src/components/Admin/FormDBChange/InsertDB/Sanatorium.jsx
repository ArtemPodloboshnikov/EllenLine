import React, {useState} from 'react'
import classes from './Sanatorium.module.css'
import InputText from '../../../CustomElements/InputText'
import TextArea from '../../../CustomElements/TextArea'
import InputNumber from '../../../CustomElements/InputNumber'
import DynamicList from '../../../CustomElements/DynamicList'

const Sanatorium = () => {
   
    return (
        <form className={classes.form}>
            <InputText className={classes.inputText} classInput={classes.inputText__input} placeholder='Название санатория'/>
            <TextArea className={classes.textarea} classTitle={classes.textarea__title} 
            classTextArea={classes.textarea__text} title='Описание' placeholder='Введите описание'/>
            <InputNumber className={classes.inputNumber} placeholder='★' min='1' max='5'/>
            <div className={classes.form__services}>
                <DynamicList className={classes.dynamicList} classInput={classes.dynamicList__input} placeholder='В наличии'/>
                <DynamicList className={classes.dynamicList} classInput={classes.dynamicList__input} placeholder='Общие услуги'/>
                <DynamicList className={classes.dynamicList} classInput={classes.dynamicList__input} placeholder='Услуги в номерах'/>
            </div>
        </form>
    )
}

export default Sanatorium
