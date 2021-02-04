import classes from './ChangeItemFromDB.module.scss';
import SelectEntered from '../../CustomElements/SelectEntered';
import {useState} from 'react';

const ChangeItemFromDB = (props) => {

    let src = '';
    const [disabled, setDisabled] = useState(false);
    let arrowSize = [30, 30];
    if (props.type == 'relax')
    {
        src = 'fas fa-hotel';
    }
    const checkCheckbox = () => {
        
        for(let i = 0; i < props.idsChecked.length; i++)
        {

            if (document.getElementById(props.idsChecked[i]) != null)
            {
                if (document.getElementById(props.idsChecked[i]).checked == true)
                {
                    setDisabled(true);
                    break;
                }
                else
                {
                    setDisabled(false);
                }
                console.log(disabled)
            }
           
        }
        
    }
    
    const [style, setStyle] = useState({right: '-16%'});
    const iconClick = () => {

        if (style.right == '-16%')
        {

            setStyle({right: '0%'});
        }
        else
        {
            setStyle({right: '-16%'});
        }       
    }
    return (
        <div className={classes.wrap} style={style} onMouseEnter={checkCheckbox}>
            <div onClick={iconClick}><i className={src + ' ' + classes.icon}></i></div>
            <SelectEntered value={props.value} options={props.options} className={classes.select} disabled={disabled}
            arrowWidth={arrowSize[0]} arrowHeight={arrowSize[1]} onChangeFunction={props.onChangeFunction} name='ChooseItem'/>
        </div>
    )
}

export default ChangeItemFromDB
