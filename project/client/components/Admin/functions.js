export const arrayConcat = (array1, array2) =>{

    let new_array = [];
    let array3 = array1.concat(array2);

    array3.map((value)=>{

        if (value !== undefined) new_array.push(value)
    })

    return new_array;
}

export const getPhotosPath = (data, new_data, component) =>{

    data.photosPath = [];
    for (let i = 0; i < ((data.files === undefined)? component.files.length : data.files.length); i++)
    {
        if (data.files !== undefined)
        {
            
            new_data.append('photos[]', data.files[i], data.files[i].name);
            data.photosPath.push(data.files[i].name);
        }
        else
        {
            new_data.append('photos[]', component.files[i], component.files[i].name);
            data.photosPath.push(component.files[i].name);
        }
    }

    delete data.files
}

export const getExistingPhotosNames = (array_photos, array_tempPhotos) =>{

    let array_names = [];
    array_photos.map((photo)=>{

        if (!array_tempPhotos.includes(photo)) array_names.push(photo);

    })
    return array_names;
}