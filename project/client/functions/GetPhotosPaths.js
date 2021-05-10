export default function getPhotosPaths(data, keyForData, keyOfNewArray, new_data, component=undefined){

    data[keyOfNewArray] = [];
    for (let i = 0; i < ((data.files === undefined)? component.files.length : data.files.length); i++)
    {
        if (data[keyForData] !== undefined)
        {
            
            new_data.append('photos[]', data[keyForData][i], data[keyForData][i].name);
            data[keyOfNewArray].push(data.files[i].name);
        }
        else
        if (component !== undefined)
        {
            new_data.append('photos[]', component[keyForData][i], component[keyForData][i].name);
            data[keyOfNewArray].push(component[keyForData][i].name);
        }
    }

    delete data[keyForData]
}