import React from 'react';
import classes from './ConvertService.module.scss';

const ConvertService = (props) => {
    let service;
    switch(props.service)
    {
        case 'food':
            service = 'cutlery';
            break;
        case 'bath':
            service = 'bath';
            break;
        default:
            console.log(service + ' service don`t support');
            break;
    }

    return (<i class={"fa fa-" + service} 
               aria-hidden="true" 
               style={props.style}></i>)
}

export default ConvertService;