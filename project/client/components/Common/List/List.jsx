import React, { useState } from 'react';
import mathPriceWithDiscount from '../../../functions/MathPriceWithDiscount';
import Global from '../../../pages/global';
//
import VerticalListItem from './VerticalListItem';
import Link from 'next/link';
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
            
            let flags = [];
            for(let i = 0; i < conditions.length; i++)
            {
                if (elem[conditions[i].key] != undefined && conditions[i].value != '')
                {
                    let value = conditions[i].value;
                    const pattern = new RegExp(`^${value}`, 'gi');
                    console.log(`conditions[i]: ${conditions[i]}`)
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
                    if (conditions[i].key == 'services' && conditions[i].value != '')
                    {
                        let values = value.split(', ');
                        let services = JSON.parse(elem['services']);
                        let flags_servises = [];
                        services = services['inStock'];
                        for (let val of values)
                        {
                            for (let service of services)
                            {
                                console.log(service)
                                if (service == val)
                                {
                                    flags_servises.push(true);
                                }
                                

                            }
                        }
                        console.log(flags_servises.length == values.length)
                        if (flags_servises.length == values.length)
                        {
                            flags.push(true);
                        }
                        else
                        {
                            flags.push(false);
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
                    console.log(flags)
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

const grouping = (containers, elements) =>{

    //console.log(elements)
    let price = 0;
    let min = elements[0].price;
    let max = 0;
    let services = '';
    for (let element of elements)
    {
        const path = Global.GetResort(element.type);
        const category = Global.GetTypeEn(element.type);
        if (element.price > max)
            max = element.price;
        if (element.price < min)
            min = element.price;

        if (element.services.length > services.length)
            services = element.services;
    }

    price = (min != max)? `от ${min} до ${max}`: min;
    services = JSON.parse(services);
    services = {inStock: services.inStock, commonServices: services.commonServices};
    containers.push(<VerticalListItem 
                    price={price}
                    services={services}
                    type={elements[0].type}
                    title={elements[0].title}
                    />)

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
                            grouping(containers, elements);
                            groupName = element.title;
                            elements = [];
                        }
        
                       //console.log(groupName)
                       // console.log(element)
                        elements.push(element);
        
                        if ((i + 1) == result.length)
                        {
                            grouping(containers, elements);
                            elements = [];
                        }
                    }
                }
                return containers;
            }
    }

    return (
        <div className={classes.list}>
            <div>
                <div>Название</div>
                <div>Цена</div>
                <div>{(()=>{ if (props.type == 'treatment'){ return 'Лечебный профиль'} else return 'В наличии'})()}</div>
                <div>Общие услуги</div>
                
            </div>
            {InsertItems()}           
        </div>
    )
}

export default List;
