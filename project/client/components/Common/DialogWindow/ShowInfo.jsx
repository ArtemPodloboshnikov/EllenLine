import messageStyle from './Message.module.scss';

const ShowInfo = (props) => {
    return (
        <>
            <div className={messageStyle.window} style={props.style}>
                <div className={messageStyle.title}>
                    {props.title}
                </div>
                <div className={messageStyle.body}>
                    {props.text}
                </div>
                <div>
                    <div className={messageStyle.close} onClick={() => props.setFunction({style: {display: 'none'}, title: props.title, text: ''})}></div>
                </div>
            </div>
            <div className={messageStyle.wrap} style={props.style}>
            
            </div>
        </>
    )
}

export default ShowInfo
