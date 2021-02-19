import classes from './Message.module.scss'

const Message = (props) => {

    let title = '';
    let text = ''; 

    switch (props.method)
    {
        case 'insert':{

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

            break;
        }
        case 'update':{

            switch (props.status)
            {
                case 404:{
                    title = 'Запрос не отправлен';
                    text = 'Страница отвечающая за отправку запроса — не была найдена';
                    break;
                }
                case 200:{
                    title = 'Запрос выполнен';
                    text = 'Данные обновлены';
                    break;
                }
                case 500:{

                    title = '500';
                    text = 'Internal Server Error';
                    break;
                }
            }

            break;
        }
        case 'delete':{

            switch (props.status)
            {
                case 404:{
                    title = 'Запрос не отправлен';
                    text = 'Страница отвечающая за отправку запроса — не была найдена';
                    break;
                }
                case 200:{
                    title = 'Запрос выполнен';
                    text = 'Данные успешно удалены';
                    break;
                }
            }

            break;
        }
        case 'deletedFile':{

            switch (props.status)
            {
                case 404:{
                    title = 'Запрос не отправлен';
                    text = 'Страница отвечающая за отправку запроса — не была найдена';
                    break;
                }
                case 200:{
                    title = 'Запрос выполнен';
                    text = 'Файлы успешно удалены';
                    break;
                }
            }
            break;
        }
        case 'vacancy':{

            switch (props.status)
            {
                case 404:{
                    title = 'Запрос не отправлен';
                    text = 'Страница отвечающая за отправку запроса — не была найдена';
                    break;
                }
                case 200:{
                    title = 'Вакансия принята';
                    text = 'Мы свяжемся с вами в скором времени. Ожидайте!';
                    break;
                }
            }
            break;
        }
        case 'candidate':{

            switch (props.status)
            {
                case 404:{
                    title = 'Запрос не отправлен';
                    text = 'Страница отвечающая за отправку запроса — не была найдена';
                    break;
                }
                case 200:{
                    title = 'Сотрудник нанят';
                    text = 'Не забудьте связаться с ним!';
                    break;
                }
            }
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
