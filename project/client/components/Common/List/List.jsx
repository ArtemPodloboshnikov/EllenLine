import React, { useState } from 'react';
import mathPriceWithDiscount from '../../../functions/MathPriceWithDiscount';
//
import ListItem from './ListItem.jsx';
//
import classes from './List.module.scss';

const checkSearch = (data, conditions) =>{

    let array = [];
    let isSearch = true;
    console.log(conditions)
    for(let i = 0; i < conditions.length; i++)
    {

        if (conditions[i].value == '')
        {
            isSearch = false;
        }
        else
        {
            isSearch = true;
            break;
        }
    }
    if (!isSearch)
    {
        return data;

    }
    else
    {

        data.map((elem)=>{
            
            let flag = false;
            for(let i = 0; i < conditions.length; i++)
            {
                if (elem[conditions[i].key] != undefined && conditions[i].value != '')
                {
                    let value = conditions[i].value;
                    const pattern = new RegExp(`^${value}`, 'gi');
                    console.log(`pattern: ${pattern} elem[conditions[i].key]: ${elem[conditions[i].key]}`)
                    if (!isNaN(value))
                    {
                        value = parseInt(value);
                    }
                // console.log(conditions[i])
                    if (conditions[i].sign != undefined)
                    {
                        switch(conditions[i].sign)
                        {
                            case '>':{
                                if (elem[conditions[i].key] > value)
                                {
                                    flag = true;
                                }
                                else
                                {
                                    flag = false;
                                    
                                }
                                break;
                            }
                            case '=':{
                                if (elem[conditions[i].key] == value)
                                {
                                    flag = true;
                                
                                }
                                else
                                {
                                    flag = false;
                                
                                }
                                break;
                            }
                            case '<':{
                                if (elem[conditions[i].key] < value)
                                {
                                    flag = true;
                                }
                                else
                                {
                                    flag = false;
                                    
                                }
                                break;
                            }
                        }
                    }
                    else
                    if (pattern.test(elem[conditions[i].key]))
                    {
                        flag = true;
                    }
                    // else
                    // {
                    //     flag = false;
                    //     break;
                    // }
                    
                    if (!flag) break;
                }
            }

            if (flag) array.push(elem)
            
        })

        console.log(array)
        return array;
    }
    
    
}

const List = (props) => {
    const resort = props.resort;
    const items = props.items;
    const path = props.path;
    const conditions = props.conditions;
    console.log(items)
    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            items.map((item)=>{
                console.log(item)
                if (item.discount != 0)
                {
                    let temp_item = {...item};
                    console.log(mathPriceWithDiscount(temp_item.discount, temp_item.price))
                    let price = mathPriceWithDiscount(temp_item.discount, temp_item.price);
                    temp_item.price = price 
                    console.log(temp_item)
                    // item = null;
                    console.log(item)
                    item = Object.assign({}, temp_item)
                }
            })
            const result = checkSearch(items, conditions);
            for(let i = 0; i < result.length; i++)
            {
                let element = result[i];
                elements.push(<ListItem category={resort}
                                        path={path}
                                        id={element.id}
                                        title={element.title}
                                        images={element.images}
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
