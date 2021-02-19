export default function dateParser(string, reverse=false)
{
    let date = new Date(string);
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    if(mounth < 10)
        mounth = '0' + mounth;
    let day = date.getDate();
    if(day < 10)
        day = '0' + day;
    return (!reverse)? (day + '-' + mounth + '-' + year) : (year + '-' + mounth + '-' + day);
}