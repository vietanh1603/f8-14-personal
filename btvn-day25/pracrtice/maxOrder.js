export const findHighestValueOrder = (orders) => {
    if (orders.length === 0) return null;

    return orders.reduce((highest, order) => {
        const currentTotal = order.calculateTotal();
        const highestTotal = highest.calculateTotal();
        return currentTotal > highestTotal ? order : highest;
    }, orders[0]);

}