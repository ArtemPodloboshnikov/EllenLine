import React, { useState } from 'react';
import mathPriceWithDiscount from '../../../functions/MathPriceWithDiscount';
import Global from '../../../pages/global';
//
import ListItem from './ListItem.jsx';
//
import classes from './List.module.scss';

const checkSearch = (data, conditions) =>{

    let array = [];
    let isSearch = true;
    // console.log(conditions)
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
            
            let flags = [];
            for(let i = 0; i < conditions.length; i++)
            {
                if (elem[conditions[i].key] != undefined && conditions[i].value != '')
                {
                    let value = conditions[i].value;
                    const pattern = new RegExp(`^${value}`, 'gi');
                    // console.log(`pattern: ${pattern} elem[conditions[i].key]: ${elem[conditions[i].key]}`)
                    if (!isNaN(value))
                    {
                        value = parseInt(value);
                    }
                console.log(conditions[i])
                    if (conditions[i].sign != undefined)
                    {
                        switch(conditions[i].sign)
                        {
                            case '>':{
                                if (elem[conditions[i].key] > value)
                                {
                                    flags.push(true);
                                }
                                else
                                {
                                    flags.push(false);
                                    
                                }
                                break;
                            }
                            case '=':{
                                if (elem[conditions[i].key] == value)
                                {
                                    flags.push(true);
                                
                                }
                                else
                                {
                                    flags.push(false);
                                
                                }
                                break;
                            }
                            case '<':{
                                if (elem[conditions[i].key] < value)
                                {
                                    flags.push(true);
                                }
                                else
                                {
                                    flags.push(false);
                                    
                                }
                                break;
                            }
                        }
                    }
                    else
                    if (pattern.test(elem[conditions[i].key]))
                    {
                        flags.push(true);
                    }
                    else
                    {
                        flags.push(false);
                    }
                    // else
                    // {
                    //     flag = false;
                    //     break;
                    // }
                    let isBreak = false;

                    for (let flag of flags)
                    {
                        
                        if (!flag)
                        {
                            isBreak = true;
                            break;
                        }
                    }

                    if (isBreak) break;
                }
            }
            // console.log(flags)
            let isPush = true;
            for (let flag of flags)
            {
                if (!flag)
                {
                    isPush = false;
                    break;
                } 
            }
            
            if (isPush) array.push(elem)
        })

        // console.log(array)
        return array;
    }
    
    
}

const grouping = (groupName, containers, elements) =>{


    containers.push(<fieldset className={classes.group}>

        <legend>{groupName}</legend>
        {(()=>{

            return <div>{elements}</div>;
        })()}
    </fieldset>)

}

const List = (props) => {
    let items = props.items;
    const conditions = props.conditions;
    // console.log(items)
    function InsertItems() {
        const containers = [];
        let elements = [];
        if(items && items.length != 0)
        {
            let new_items = [];
            items.map((item, index)=>{
                
                // console.log(item)
                let temp_item = {...item};
                if (item.discount != 0)
                {
                    //console.log(mathPriceWithDiscount(temp_item.discount, temp_item.price))
                    let price = mathPriceWithDiscount(temp_item.discount, temp_item.price);
                    temp_item.price = price
                    // console.log(temp_item)
                    // item = null;
                    // console.log(item)
                    //items[index] = temp_item;
                }
                
                new_items.push(temp_item);
            })

            items = new_items;
            new_items = null;
            // let j = 0;
            // items.map((item)=>{
                
            //     if (item.discount != 0)
            //     {
            //         item.price = prices[j];
            //         j++;
            //     }
            // })
            // console.log(prices);
            let result = checkSearch(items, conditions);
            result.sort((prev, next) => {
                if ( prev.title < next.title ) return -1;
                if ( prev.title < next.title ) return 1;
            });

            console.log(result);

            if (result.length != 0)
            {

                    let groupName = result[0].title;
                    for(let i = 0; i < result.length; i++)
                    {
                        
                        let element = result[i];
        
                        if (element.title != groupName)
                        {
                            grouping(groupName, containers, elements);
                            groupName = element.title;
                            elements = [];
                        }
        
                        console.log(groupName)
                        // console.log(element)
                        elements.push(<ListItem category={Global.GetTypeEn(element.type)}
                                                path={Global.GetResort(element.type)}
                                                id={element.id}
                                                title={element.typeOfRoom}
                                                images={element.images}
                                                count_people={element.count_people}
                                                address={element.address}
                                                price={element.price}
                                                services={element.services}/>);
        
                        if ((i + 1) == result.length)
                        {
                            grouping(groupName, containers, elements);
                            elements = [];
                        }
                    }
                }
                return containers;
            }
    }

    return (
        <>
            {InsertItems()}           
        </>
    )
}

export default List;
