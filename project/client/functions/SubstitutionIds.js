export default function substitutionIds(data, idKey)
{
    if (Object.keys(data).length)
    {
        let origin_ids = {};
        for (let i = 0; i < Object.keys(data).length; i++)
        {
            let temp_data = {...data[i]};
            origin_ids[i + 1] = temp_data[idKey];
            data[i][idKey] = i + 1;
        }

        return origin_ids;
    }
    else
    {
        return {};
    }   
}