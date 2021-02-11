export default function concatFormArray(data, origin_data, names)
{
    let new_data = {};
    for (let name of names)
    {
        new_data[name] = [];

        for (let i = 0; ; i++)
        {
            if (data[name + i] !== undefined)
            {
                new_data[name].push(data[name + i])
            }
            else
            {
                break;
            }
        }
    }

    for (let name of names)
    {
        origin_data[name] = new_data[name];
    }
}