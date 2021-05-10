export default function servicesHandler(data, tourFlag=false)
{
    if (!tourFlag)
    {
        let commonServices = [];
    
        for (let i = 0; ; i++)
        {
            
            if (data['commonServices' + i] === undefined)
            {
                break;
            }
            commonServices.push(data['commonServices' + i]);
            delete data['commonServices' + i]
        }
    
        let servicesRoom = [];
        for (let i = 0; ; i++)
        {
            
            
            if (data['servicesRoom' + i] === undefined)
            {
                break;
            }
            servicesRoom.push(data['servicesRoom' + i]);
            delete data['servicesRoom' + i];
        }
    
        let inStock = [];
        for (let i = 0; ; i++)
        {
            
            if (data['inStock' + i] === undefined)
            {
                break;
            }
            inStock.push(data['inStock' + i]);
            delete data['inStock' + i];
        }
    
        return {commonServices: commonServices, servicesRoom: servicesRoom, inStock: inStock}

    }
    else
    {
        let freeServices = [];
    
        for (let i = 0; ; i++)
        {
            
            if (data['freeServices' + i] === undefined)
            {
                break;
            }
            freeServices.push(data['freeServices' + i]);
            delete data['freeServices' + i]
        }

        let paidServices = [];
    
        for (let i = 0; ; i++)
        {
            
            if (data['paidServices' + i] === undefined)
            {
                break;
            }
            paidServices.push(data['paidServices' + i]);
            delete data['paidServices' + i]
        }

        return {freeServices: freeServices, paidServices: paidServices}
    }
}