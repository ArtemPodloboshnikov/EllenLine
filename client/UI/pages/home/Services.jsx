import React from 'react'
//
import MediaQuery from 'react-responsive';
//
import classes from './Services.module.scss';

const Services = (props) => {
    
    if (props.data.length == 0) return(<></>);
    const servicesWeb = [];
    let i = 0;
    const cssClassBlocks = [classes.block__template_right, classes.block__template_left];
    const cssClassText = [classes.block__text_left, classes.block__text_right];
    
    props.data.map((d, index)=>{

        if (i > 1) i = 0;
        
        servicesWeb.push(<div key={index} className={ classes.services__block + ' ' + cssClassBlocks[i] }>
            <div className={classes.block__image} style={{backgroundImage: 'url(' + d.image + ')'}}>
                
            </div>
        
            <div className={classes.block__text + ' ' + cssClassText[i]}>
                <p>{d.text}</p>
            </div>
            <div className={ classes.block__number }>
            
                <p>{d.id}</p>
                
            </div>
        </div>)

        i++;

    });

    const servicesMobile = [];
    props.data.map((d, index)=>{

        servicesMobile.push(
            <div key={index} className={ classes.services__block }>
                <div className={ classes.block__ImageText } style={{backgroundImage: 'url(' + d.image + ')'}}>
                    <p>{d.text}</p>
                </div>
            </div>
        )

    })
    return (
        <div className={classes.section}>
            <div className={classes.title}>
                <p>Наши услуги</p>
            </div>
            <div className={classes.services}>
                <MediaQuery query="(min-device-width: 1433px)">
                    {servicesWeb}
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1433px)">
                    {servicesMobile}
                </MediaQuery>
            </div>
           
          
            
        </div>
    )
}

export default Services
