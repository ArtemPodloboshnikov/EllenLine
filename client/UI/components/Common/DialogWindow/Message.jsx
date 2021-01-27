import classes from './Message.module.css'

const Message = (props) => {

    let title = '';
    let text = ''; 
    switch (props.status)
    {
        case 404:{
            title = 'Запрос не отправлен';
            text = 'Страница отвечающая за отправку запроса — не была найдена';
            break;
        }
        case 200:{
            title = 'Запрос выполнен';
            text = 'Данные успешно внесены в базу данных';
            break;
        }
    }

    
    return (
        <>
            <div className={classes.window} style={props.style}>
                <div className={classes.title}>
                    {title}
                </div>
                <div className={classes.body}>
                    {text}
                </div>
                <div>
                    <div className={classes.close} onClick={() => props.setFunction({style: {display: 'none'}})}></div>
                </div>
            </div>
            <div className={classes.wrap} style={props.style}>
               
            </div>
        </>
    )
}

export default Message
