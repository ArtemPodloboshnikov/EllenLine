export default function mathPriceWithDiscount(discount_value, price_value)
{

    return price_value - Math.round((parseFloat(discount_value) / 100) * price_value);
}