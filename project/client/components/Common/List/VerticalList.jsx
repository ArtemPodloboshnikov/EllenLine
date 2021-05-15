import classes from './VerticalList.module.scss';
import VerticalListItem from './VerticalListItem';

const VerticalList = (props) => {

    let elements = [];

    const grouping = (containers, elements) =>{

        console.log(elements)
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

    if (props.items !== undefined)
    {
        const containers = [];
        let elements = [];
        
        props.items.map((item)=>{
            
            elements.push(<VerticalListItem    
                          price={price}
                          services={item.services}
                          type={elements[0].type}
                          title={elements[0].title}/>);
        })
    }
    return (
        <div className={classes.list + ' ' + props.className}>
            {elements}
        </div>
    )
}

export default VerticalList
