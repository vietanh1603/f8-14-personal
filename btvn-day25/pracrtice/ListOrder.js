// bai 2

export const listOrdersByCustomer = (customers, orders) => {

    const ordersByCustomer = {};
    // duyet qua tung don hang
    customers.forEach(customer => {
        ordersByCustomer[customer.getId()] = {
            customer,
            orders: [],
            totalOrders: 0,
            totalValue: 0,
            orderDetails: []
        };
    });
    // duyet qua tung don hang
    orders.forEach(order => {
        const customerId = order.getCustomer().getId();
        if (ordersByCustomer[customerId]) {
            ordersByCustomer[customerId].orders.push(order);
            ordersByCustomer[customerId].totalOrders++;
            ordersByCustomer[customerId].totalValue += order.calculateTotal();
            ordersByCustomer[customerId].orderDetails.push({
                id: order.getId(),
                date: order.getOrderDate(),
                products: order.getProducts().map(p => p.toString()),
                orderTotal: order.calculateTotal()
            });
        }
    });

    return ordersByCustomer;
};

export const displayOrdersByCustomer = (ordersByCustomer) => {
    const allCustomers = Object.values(ordersByCustomer);

    // duyet qua tung khach hang
    for (const customerData of allCustomers) {
        const customer = customerData.customer;
        const orders = customerData.orders;
        const totalOrders = customerData.totalOrders;
        const totalValue = customerData.totalValue;

        // hien thi thong tin khach hang
        console.log('\n----------------------------------------');
        console.log(`KHÁCH HÀNG: ${customer.getName()}`);
        console.log(`TỔNG ĐƠN HÀNG: ${totalOrders}`);
        console.log(`TỔNG GIÁ TRỊ: ${formatCurrency(totalValue)}`);
        console.log('----------------------------------------');

        // duyet qua tung don hang cua khach hang
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderNumber = i + 1;

            // hien thi don hang
            console.log(`\nĐƠN HÀNG ${orderNumber}:`);
            console.log(`- Mã đơn: ${order.getId()}`);
            console.log(`- Ngày đặt: ${formatDate(order.getOrderDate())}`);

            // hien thi danh sach san pham
            console.log('\n  DANH SÁCH SẢN PHẨM:');
            const products = order.getProducts();
            for (let j = 0; j < products.length; j++) {
                const product = products[j];
                console.log(`  ${j + 1}. ${product.getName()} - ${formatCurrency(product.getPrice())}`);
            }

            // hien thi tong tien
            console.log('\n  TỔNG CỘNG:', formatCurrency(order.calculateTotal()));
        }
    }
}

// tinh tien
const formatCurrency = (amount) => {
    return `${amount.toLocaleString('vi-VN')} VNĐ`;
}

// tinh thoi gian
const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
}
