import React, { useState } from 'react';
import ListItem from './ListItem.jsx';
import classes from './List.module.scss';

/*
    {parking: true, playground: true, restaurant: true, pebblesBeach: true, sandyBeach: true, sportsGround: true, trainer: true, pool: true, poolUnderRoof: true, park: true, sauna: true, SPA: true, receptionWithAnimals: true, musculoskeletalSystem: true, gynecologicalDiseases: true, urologicalDiseases: true, cardiovascularSystem: true, respiratoryOrgans: true, nervousSystem: true, digestiveSystem: true, metabolicDiseases: true, childrenUnder3: true, singleOccupancy: true, familiesOf4: true}
    [59.87026708231266, 30.26207174039379]
*/
const List = (props) => {
    const resort = props.resort;
    const items = props.items;  

    
    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                elements.push(<ListItem category={resort}
                                        idItem={element.idItem}
                                        title={element.title}
                                        imgSrc={typeof element.imgSrc === 'object' ? element.imgSrc[0]: element.imgSrc}
                                        address={element.address}
                                        price={element.price}
                                        services={element.services}/>);
            }
        }
        return elements;
    }

    return (
        <div className={classes.list}
            style={{gridAutoRows: (props.rowHeight ? props.rowHeight : '500px') }}>
            {InsertItems()}           
        </div>
    )
}

export default List;
