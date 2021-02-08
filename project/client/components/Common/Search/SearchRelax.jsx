import classes from './SearchRelax.module.scss';
import InputText from '../../CustomElements/InputText.jsx';
import SelectEntered from '../../CustomElements/SelectEntered.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import PriceCompare from '../../CustomElements/PriceCompare';

const Search = (props) => {

    let arrowSize = [30, 30];

    return (
        <div className={classes.sanatorium + ' ' + props.className}>
            <InputText className={classes.input} placeholder="Название" onBlur={(e)=>{

                props.setSearchName({key: 'title', value: e.target.value})

            }}/>
           
            <SelectEntered className={classes.country} name='country' arrowWidth={arrowSize[0]} arrowHeight={arrowSize[1]}
                          placeholder="Страна" 
                          options={props.countries} onBlur={(e)=>{

                props.setSearchCountry({key: 'county_name', value: e.target.value})

            }}/>

            <SelectEntered className={classes.city} name='city' arrowWidth={arrowSize[0]} arrowHeight={arrowSize[1]}
                          placeholder="Город"
                          options={props.cities} onBlur={(e)=>{

                props.setSearchCity({key: 'city_name', value: e.target.value})

            }}/>

            <InputNumber className={classes.stars} placeholder="★" min="1" max="5" name='stars' onBlur={(e)=>{

                props.setSearchStars({key: 'stars', value: e.target.value})

            }}/>

            <PriceCompare className={classes.price} min='1' placeholder='Цена' name='price' onClick={(e)=>{

                props.setSearchPrice({key: 'price', value: document.getElementsByName('price')[0].value, sign: e.target.value})

            }} 
            onBlur={(e)=>{

                if (e.target.value == '')
                {

                    props.setSearchPrice({key: 'price', value: '', sign: ''})
                }

            }}/>
        </div>
    );
    
}

export default Search
