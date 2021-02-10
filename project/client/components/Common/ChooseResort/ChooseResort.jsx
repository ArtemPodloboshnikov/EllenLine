import Link from 'next/link';
//
//
import classes from './ChooseResort.module.scss';


const ChooseResort = (props) => {
    const OnClick = props.onClick;
    const path = props.path;
    const resort = props.resort;
    const convert = props.convert;
    const convertKeys = Object.keys(convert);
    let leftTextStyle = {};
    let rightTextStyle = {};

    if (resort != undefined)
    {
        if (resort == props.keyLeft)
        {
            leftTextStyle = {backgroundColor: '#333333', color: '#fff'}
        }
        else
        if (resort == props.keyRight)
        {
            rightTextStyle = {backgroundColor: '#333333', color: '#fff'}
        }
    }
    // function ToLink(type)
    // {
    //     let content = <h1 onClick={OnClick} type={type}>{convert[type]}</h1>;
    //     if(OnClick)
    //         return content;
    //     else
    //         return <Link href={`/resorts/${path}/${type}`}>{content}</Link>;
    // }

    return(
        <div className={classes.resort + ' ' + props.className}>
            
            <div className={classes.choose}>
                
                <Link href={`/resorts/${path}/${convertKeys[1]}`}>
                    <a style={leftTextStyle}>
                        {convert[convertKeys[1]]}
                    </a>
                </Link>
              
              
                <Link href={`/resorts/${path}/${convertKeys[2]}`}>
                    <a style={rightTextStyle}>
                        {convert[convertKeys[2]]}
                    </a>
                </Link>
             
            </div>
        </div>
    )
}

export default ChooseResort;