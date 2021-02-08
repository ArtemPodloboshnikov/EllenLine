import Link from 'next/link';
import classes from './ChooseResort.module.scss';

const ChooseResort = (props) => {
    let leftTextStyle = {};
    let rightTextStyle = {};

    if (props.category == props.keyLeft)
    {
        leftTextStyle = {backgroundColor: '#333333', color: '#fff'}
    }
    else
    if (props.category == props.keyRight)
    {
        rightTextStyle = {backgroundColor: '#333333', color: '#fff'}
    }
    return(
        <div className={classes.resort + ' ' + props.className}>
            
            <div className={classes.choose}>
                
                <Link href='/relax/pensionats'>
                    <a style={leftTextStyle}>
                        {props.leftText}
                    </a>
                </Link>
              
              
                <Link href='/relax/hotels'>
                    <a style={rightTextStyle}>
                        {props.rightText}
                    </a>
                </Link>
             
            </div>
        </div>
    )
}

export default ChooseResort;