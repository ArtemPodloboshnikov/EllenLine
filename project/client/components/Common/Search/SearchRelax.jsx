import classes from './SearchRelax.module.scss';
import InputText from '../../CustomElements/InputText.jsx';
import SelectEntered from '../../CustomElements/SelectEntered.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import CompareInput from '../../CustomElements/CompareInput';

const Search = (props) => {

    let arrowSize = [25, 25];

    return (
        <fieldset className={classes.wrap}>
            <legend><button onClick={()=>{

                props.setSearchName({key: 'title', value: document.getElementsByName('title')[0].value})
                props.setSearchCountry({key: 'county_name', value: document.getElementsByName('country')[0].value})
                props.setSearchCity({key: 'city_name', value: document.getElementsByName('city')[0].value})
                props.setSearchStars({key: 'stars', value: document.getElementsByName('stars')[0].value})

            }}><i className={"fas fa-search " + classes.button__loupe}></i></button></legend>
            <div className={classes.sanatorium + ' ' + props.className}>

                <InputText 
                    name='title' 
                    className={classes.input} 
                    placeholder="Название"/>
            
                <SelectEntered 
                    className={classes.country} 
                    name='country' 
                    arrowSize={arrowSize}
                    placeholder="Страна" 
                    options={props.countries}/>

                <SelectEntered 
                    className={classes.city} 
                    name='city' 
                    arrowSize={arrowSize}
                    placeholder="Город"
                    options={props.cities}/>

                <InputNumber 
                    label='none' 
                    classWrap={classes.stars} 
                    className={classes.stars_input} 
                    placeholder="★" 
                    min="1" 
                    max="5" 
                    name='stars'/>

                <CompareInput 
                    className={classes.price} 
                    min='1' 
                    placeholder='Цена' 
                    name='price' 
                    onClick={(e)=>{

                    props.setSearchPrice({key: 'price', value: document.getElementsByName('price')[0].value, sign: e.target.value})

                }} 
                onBlur={(e)=>{

                    if (e.target.value == '')
                    {

                        props.setSearchPrice({key: 'price', value: '', sign: ''})
                    }

                }}/>
                <CompareInput 
                    className={classes.people} 
                    min='1' 
                    placeholder='Кл. людей' 
                    name='count_people' 
                    onClick={(e)=>{

                    props.setSearchCountPeople({key: 'count_people', value: document.getElementsByName('count_people')[0].value, sign: e.target.value})

                }} 
                onBlur={(e)=>{

                    if (e.target.value == '')
                    {

                        props.setSearchCountPeople({key: 'count_people', value: '', sign: ''})
                    }

                }}/>
            </div>
        </fieldset>
    );
    
}

export default Search
