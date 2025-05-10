const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 2, name: "Bob", age: 25, status: 'working' },
    { id: 3, name: "Charlie", age: 27, status: 'working' },
    { id: 4, name: "David", age: 23, status: 'quited' },
    { id: 5, name: "Eve", age: 20, status: 'working' },
];

const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000  },
    { id: 3, name: "Tab", price: 2000  },
    { id: 4, name: "PC", price: 800  },
    { id: 5, name: "Monitor", price: 1500  },
]

const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 2, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 1 },
    { id: 4, employeeId: 3, productId: 1, quantity: 2 },
    { id: 5, employeeId: 2, productId: 5, quantity: 3 },
    { id: 5, employeeId: 4, productId: 1, quantity: 1 },
    { id: 5, employeeId: 5, productId: 3, quantity: 2 },
];
// --------------- bài 1 ----------------------------------
// let employeeWorking = employees.filter(employee => employee.status === 'working');
// console.log(employeeWorking);


//------------------bai 2 ------------------------
// let maxAge = 0;
// employees.forEach(user => {
//     if (user.age > maxAge) {
//         maxAge = user.age;
//     }
// })
// let employeeMaxAge = employees.filter(employee => employee.age === maxAge);
// console.log(employeeMaxAge);


//------------------bai 3 -------------------------
// let productMaxPrice = 0;
// for (product of products) {
//     if (product.price > productMaxPrice) {
//         productMaxPrice = product.price;
//     }
// }
// let minPrice = productMaxPrice ;
// products.forEach(product => {
//     if (product.price < minPrice) {
//         minPrice = product.price;
//     }
// })
// let productMinPrice = products.filter(product => product.price === minPrice);
//  console.log(productMinPrice);



//---------------------- bai 4 ---------------------
// const listOrders = []
// for (const product of products) {
//     for (const order of orders) {
//         if (product.id === order.productId) {
//         listOrders.push({ id: product.id,
//             name: product.name,
//             productId: order.productId,
//             quantity: order.quantity,});
//         }
//     }
// }
// let maxQuantity = 0;
// orders.forEach((order) => {
//     if (order.quantity > maxQuantity) {
//         maxQuantity = order.quantity;
//     }
// })
// let orderMaxQuantity = listOrders.filter(listOrder => listOrder.quantity === maxQuantity );
// console.log(orderMaxQuantity);


// --------------bai 6 ----------------------
const employOder = [] ;
for (const employee of employees) {
    for (const order of orders) {
        if (employee.id === order.employeeId) {}
        employOder.push({
            id: employee.id,
            name: employee.name,
            quantity: order.quantity,
        })
    }
}
console.log(employOder);




