import React from 'react';
import classes from './ListItem.module.css';

const ListItem = (props) => {

    return (
        <div className={classes.list_item + ' ' + classes.className}>
            <h1>{props.title}</h1>
            <img src={props.imgSrc} className={classes.image}/>
            <div className={classes.bottom}>
                <div className={classes.address}>
                    {/* IMAGE POINT */}
                    <p>

                    </p>
                </div>
                <div className={classes.info}>
                    <div className={classes.price}>
                        {/* IMAGE MONEY */}
                        <p>
                            {/* PRICE */}
                        </p>
                    </div>
                </div>
                <div className={classes.services}>
                    {/* IMAGE SERVICES */}
                </div>
            </div>
        </div>
    )
}

export default ListItem;