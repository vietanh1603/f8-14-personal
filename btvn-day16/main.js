
const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Charlie Green" },
];

const products = [
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Phone", price: 800 },
    { id: 103, name: "Tablet", price: 500 },
    { id: 104, name: "Smartwatch", price: 300 },
    { id: 105, name: "Headphones", price: 150 },
];

const orders = [
    { id: 1001, customerId: 1, items: [{ productId: 101, quantity: 2 }, { productId: 102, quantity: 1 }] },
    { id: 1002, customerId: 2, items: [{ productId: 102, quantity: 1 }, { productId: 103, quantity: 3 }] },
    { id: 1003, customerId: 3, items: [{ productId: 104, quantity: 5 }, { productId: 105, quantity: 2 }] },
    { id: 1004, customerId: 4, items: [{ productId: 101, quantity: 1 }, { productId: 103, quantity: 2 }] },
    { id: 1005, customerId: 5, items: [{ productId: 105, quantity: 10 }] },
    { id: 1006, customerId: 1, items: [{ productId: 101, quantity: 1 }, { productId: 105, quantity: 3 }] },
    { id: 1007, customerId: 2, items: [{ productId: 104, quantity: 2 }, { productId: 103, quantity: 1 }] },
    { id: 1008, customerId: 3, items: [{ productId: 102, quantity: 2 }] },
    { id: 1009, customerId: 4, items: [{ productId: 101, quantity: 1 }, { productId: 102, quantity: 1 }] },
    { id: 1010, customerId: 5, items: [{ productId: 103, quantity: 4 }, { productId: 104, quantity: 3 }] },
];
// Bước 1: Tạo bản đồ sản phẩm để tra cứu dễ dàng
const productMap = {};
products.forEach(product => {
    productMap[product.id] = product;
});

// Bước 2: Xử lý từng khách hàng
const result = customers.map(customer => {
    // Tìm tất cả đơn hàng của khách hàng này
    const customerOrders = orders.filter(order => order.customerId === customer.id);

    // Đối tượng để tích lũy số lượng và tổng tiền sản phẩm
    const productSummary = {};

    // Xử lý từng đơn hàng
    customerOrders.forEach(order => {
        order.items.forEach(item => {
            const product = productMap[item.productId];

            if (!productSummary[product.id]) {
                productSummary[product.id] = {
                    name: product.name,
                    quantity: 0,
                    totalSpent: 0
                };
            }

            productSummary[product.id].quantity += item.quantity;
            productSummary[product.id].totalSpent += item.quantity * product.price;
        });
    });

    // Chuyển đổi đối tượng tóm tắt sản phẩm thành mảng
    const productsArray = Object.values(productSummary);

    // Tính tổng số tiền khách hàng đã chi tiêu
    const totalSpent = productsArray.reduce((sum, product) => sum + product.totalSpent, 0);

    // Sắp xếp sản phẩm theo tổng tiền (giảm dần)
    productsArray.sort((a, b) => b.totalSpent - a.totalSpent);

    // Trả về đối tượng khách hàng với tất cả thông tin cần thiết
    return {
        id: customer.id,
        name: customer.name,
        totalSpent: totalSpent,
        products: productsArray
    };
});

// Sắp xếp khách hàng theo tổng tiền (giảm dần)
result.sort((a, b) => b.totalSpent - a.totalSpent);

console.log(JSON.stringify(result, null, 2));
