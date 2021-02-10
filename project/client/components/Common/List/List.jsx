import React, { useState } from 'react';
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
                    if (!isNaN(conditions[i].value))
                    {
                        value = parseInt(conditions[i].value);
                    }
                // console.log(conditions[i])
                    if (conditions[i].sign != undefined)
                    {
                        switch(conditions[i].sign)
                        {
                            case '>':{
                                if (elem[conditions[i].key] > conditions[i].value)
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
                                if (elem[conditions[i].key] == conditions[i].value)
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
                                if (elem[conditions[i].key] < conditions[i].value)
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
                    if (elem[conditions[i].key] == value)
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

    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            
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