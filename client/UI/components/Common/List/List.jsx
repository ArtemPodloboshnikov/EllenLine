import React, { useState } from 'react';
//
import ListItem from './ListItem.jsx';
//
import classes from './List.module.scss';

const List = (props) => {
    const resort = props.resort;
    const items = props.items;
    const path = props.path;
    
    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                elements.push(<ListItem category={resort}
                                        path={path}
                                        id={element.id}
                                        title={element.title}
                                        image={typeof element.images === 'object' ? element.images[0]: element.images}
                                        address={element.address}
                                        price={element.price}
                                        services={element.services}/>);
            }
        }
        return elements;
    }

    return (
        <div className={classes.list}>
            {InsertItems()}           
        </div>
    )
}

export default List;
