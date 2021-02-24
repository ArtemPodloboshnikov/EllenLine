import {useState} from 'react'
import classes from './SelectEntered.module.scss';
import Image from 'next/image';

const SelectEntered = (props) => {

    const [value, setValue] = useState(props.value);
    const [arrowClass, setArrowClass] = useState(classes.arrowDown);
    const [possibleData, setPossibleData] = useState([]);
    const arrowSize = props.arrowSize || [50, 50];
    const index = props.index;
    
    const onClickOption = (e) => {
           
        let current_value = e.target.innerHTML;
        setArrowClass(classes.arrowDown);
        setPossibleData([]);
        if (current_value == 'Ничего')
            current_value = ' ';
        if (props.type == 'multiply')
        {
            let arrayValues = document.getElementsByName(props.name)[0].value.split(', ');
            arrayValues[arrayValues.length - 1] = current_value; 
            current_value = arrayValues.join(', ');
            setValue(current_value);
        }
        else
        {
            
            setValue(current_value);
        }
        
        if (props.onChangeFunction !== undefined)
        {
            props.onChangeFunction({value: current_value, index: index, setValue: setValue});
        }
        
        if (props.type != 'select')
            document.getElementsByName(props.name)[0].focus();
    }
    let data = []; 
    if (props.type == 'select')
        data.push(<label onClick={onClickOption} className={classes.option_empty}>Ничего</label>);
    if (props.options != undefined)
    {
        props.options.map((option) => {data.push(<label onClick={onClickOption}>{option}</label>)});

    }

    const equalsArray = (array1, array2) =>{

        let result = false;
        if (array1.length != array2.length) return result;
        
        for(let i = 0; i < array1.length; i++){
            
            if (array1[i].props.children === array2[i].props.children)
            {
                result = true;
            }
            else{

                result = false;
            }
        }

        return result;
    }
    
    const allOptions = () => {
        
        if (props.disabled == true)
        {
            return;
        }
        if (!equalsArray(possibleData, data))
        {
            setArrowClass(classes.arrowTop);
            setPossibleData(data); 
        }
        else
        {

            setArrowClass(classes.arrowDown);
            setPossibleData([]);
        }   
        
        
    }
    const enterText = (e) => {
        
        let text = e.target.value;
        let temp_text = [];
        let possible = [];
        if (props.type == 'multiply')
        {
            temp_text = text = text.split(', ')
            text = temp_text[temp_text.length - 1]
        }
        data.map((elem)=>{

            const isFits = elem.props.children.indexOf(text);
            if (isFits >= 0) 
            {
                possible.push(elem);
            }
        })
        if (text == '')
        {
            possible = [];
        }

        if (props.value == text)
        {
            text = '';
        }
        else
        {

            text = (text == '') ? undefined : text;
        }
        console.log(temp_text)
        setArrowClass(classes.arrowDown);
        setPossibleData(possible);
        setValue((temp_text.length == 0)? text: (()=>{temp_text[temp_text.length - 1] = text; temp_text.join(', ');})());
       
    }

    console.log(value)
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <div className={classes.selectInput + ' ' + ((props.disabled)? classes.selectInput_disabled : '')}>
                <input ref={props.register} name={props.name} placeholder={props.placeholder} disabled={props.disabled} onFocus={e => {props.type == 'select' ? e.target.blur(): ''}}
                className={classes.input + ' ' + props.classInput} onChange={enterText} value={value == '' ? props.value : value} onBlur={props.onBlur}
                />
                <div><Image src={(props.disabled) ? '/images/triangle_disabled.svg': '/images/triangle.svg'} onClick={allOptions} className={arrowClass} width={arrowSize[0]} height={arrowSize[1]}/></div>
            </div>
            <div className={possibleData.length ? classes.possibleData : classes.possibleData_none}>{possibleData || ''}</div>
        </div>
    )
}

export default SelectEntered
