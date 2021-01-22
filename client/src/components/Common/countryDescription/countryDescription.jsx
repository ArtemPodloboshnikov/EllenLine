import React from 'react'
import classes from './countryDescription.module.css';

const CountryDescription = (props) => {

    console.log('List: ' + props.countries );
    return (
        <div className={classes.country}>
            <div className={classes.country__mark}>
                <img src='images/Relax/flag.svg' />
            </div>
            <div className={classes.country__description}>
                {(()=>{
                    if (!props.countries){

                        return props.countries[0].descriptionCountry 
                    }
                    else {return ''};
                })()}
            </div>
        </div>
    )
}

export default CountryDescription
