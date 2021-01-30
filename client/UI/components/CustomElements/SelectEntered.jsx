import {useState} from 'react'
import classes from './SelectEntered.module.css';

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
        
        
        if (!equalsArray(possibleData, data))
        {
            setArrowClass(classes.arrowTop);
            setPossibleData(data);
        }
        else{

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

        data.map((city)=>{

            const isFits = city.props.children.indexOf(text);
            if (isFits >= 0) 
            {
                possible.push(city);
            }
        })
        if (text == '')
        {
            possible = [];
        }
       
        setArrowClass(classes.arrowDown);
        setPossibleData(possible);
        setValue(text);
       
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <div className={classes.selectInput}>
                <input ref={props.register} name={props.name} placeholder={props.placeholder} id={classes.id}
                className={classes.input + ' ' + props.classInput} onChange={enterText} value={value}/>
                <div><div onClick={allOptions} className={arrowClass}></div></div>
            </div>
            <div className={classes.possibleData}>{possibleData.length ? possibleData: ''}</div>
        </div>
    )
}

export default SelectEntered
