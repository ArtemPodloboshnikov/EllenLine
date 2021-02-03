import React, { useState } from 'react';
//
import ListItem from './ListItem.jsx';
//
import classes from './List.module.scss';

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
        <div className={classes.list}
            style={{gridAutoRows: (props.rowHeight ? props.rowHeight : '500px') }}>
            {InsertItems()}           
        </div>
    )
}

export default List;
