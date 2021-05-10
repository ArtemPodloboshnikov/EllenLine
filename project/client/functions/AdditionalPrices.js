export default function additionalPrices(prices)
{
    let rest = [];
    for (let price of prices)
    if (price.price != 0 && price.price != undefined)
        rest.push(price)
    return rest;
}