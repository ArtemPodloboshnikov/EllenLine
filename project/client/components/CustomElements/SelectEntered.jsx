import {useState} from 'react'
import classes from './SelectEntered.module.scss';
import Image from 'next/image';

const SelectEntered = (props) => {

    const [value, setValue] = useState(props.value);
    const [arrowClass, setArrowClass] = useState(classes.arrowDown);
    const [possibleData, setPossibleData] = useState([]);

    const onClickOption = (e) => {
        setArrowClass(classes.arrowDown);
        setPossibleData([]);
        setValue(e.target.innerHTML);
        if (props.onChangeFunction !== undefined)
        {
            props.onChangeFunction(e.target.innerHTML);
        }
        document.getElementsByName(props.name)[0].focus();
    }
    let data = []; 
    props.options.map((option) => {data.push(<label onClick={onClickOption} for={classes.id}>{option}</label>)});

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

        if (props.type == 'select'){

            text = '';
            setValue(text);
            return;
        } 
        let possible = [];

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
        console.log(possible)
        setArrowClass(classes.arrowDown);
        setPossibleData(possible);
        setValue(text);
       
    }

    return (
        <div className={classes.wrap + ' ' + props.className}>
            <div className={classes.selectInput}>
                <input ref={props.register} name={props.name} placeholder={props.placeholder} id={classes.id} disabled={props.disabled}
                className={classes.input + ' ' + props.classInput} onChange={enterText} value={value == '' ? props.value : value} onBlur={props.onBlur}
                />
                <div><Image src='/images/triangle.svg' onClick={allOptions} className={arrowClass} width={props.arrowWidth || 50} height={props.arrowHeight || 50}/></div>
            </div>
            <div className={classes.possibleData}>{possibleData.length ? possibleData: ''}</div>
        </div>
    )
}

export default SelectEntered
