
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
/*---------------- so do thuat toan -----------------------------

                           ┌────────────────────┐
                           │   const = result   │
                           └────────┬───────────┘
                                    │
                                    │
                      ┌─────────────▼───────────────────────────┐
                      │ Lap qua tung khach hang                 │
                      │                                         │
                      │    orders.customerId === customers.id   │
                      └────────────┬────────────────────────────┘
                                   │
                  ┌────────────────▼─────────────────────────────┐
                  │     duyet tung don hang cua khach hang nayf  │
                  │  if order.customerId === customers.id        │
                  └────────────────┬─────────────────────────────┘
                                   │
                           ┌───────▼─────────────────┐
                           │   tim san pham theo id  │
                           │ va them vao danh sach   │
                           └──────┬──────────────────┘
                                  ▼                                     ┌────────────────────┐
              ┌───────────────────────────────────────────────┐         │                    │
              │                                               │         │them vao danh sach  │
              │  kiem tra san pham da co trong danh sach chua ├────────►│                    │
              │                                               │         └─────────┬──────────┘
              └────────────────────────┬──────────────────────┘                   │
                                       │                                          │
                   ┌───────────────────▼──────────────────────────┐               │
                   │     tinh tong tien san pham nay              ◄───────────────┘
                   │ itemTotal = product.price * item.quantity;   │
                   └───────────────────┬──────────────────────────┘
                                       │
                       ┌───────────────▼─────────────────┐
                       │                                 │
                       │    tong chi tieu cua khach hang │
                       │   spentTotal += itemTotal       │
                       │                                 │
                       └───────────────┬─────────────────┘
                                       │
                                       │
                             ┌─────────▼──────┐
                             │  result.push   │
                             │                │
                             └────────────────┘
 */
let result = [];

for (let customer of customers) {
    let customerOrders = orders.filter(order => order.customerId === customer.id);

    let totalSpent = 0;
    let productList = [];
    for (let order of customerOrders) {
        for (let item of order.items) {
            let product = products.find(p => p.id === item.productId);
            let itemTotal = product.price * item.quantity;
            totalSpent += itemTotal;
            let existingProduct = productList.find(p => p.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += item.quantity;
                existingProduct.totalSpent += itemTotal;
            } else {
                // Nếu chưa có thì thêm mới
                productList.push({
                    name: product.name,
                    quantity: item.quantity,
                    totalSpent: itemTotal
                });
            }
        }
    }
    if (totalSpent > 0) {
        result.push({
            id: customer.id,
            name: customer.name,
            totalSpent: totalSpent,
            products: productList
        });
    }
}
result.sort((a, b) => b.totalSpent - a.totalSpent);
console.log(JSON.stringify(result, null, 2));

