
const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 2, name: "Bob", age: 25, status: 'working' },
    { id: 3, name: "John", age: 27, status: 'working' },
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
    { id: 6, employeeId: 4, productId: 1, quantity: 1 },
    { id: 7, employeeId: 5, productId: 3, quantity: 2 },
];

// --------------------bai 1---------------------------

/*
              ┌─────────────────────────┐
              │                         │
              │   let workingEmployee    │
              └────────────┬────────────┘
                           │
                           ▼
       ┌─────────────────────────────────────────────────┐
       │                                                 │
       │      loc trong employees.status === 'working'   │
       │                                                 │
       └─────────────────────────────────────────────────┘
 */
// let workingEmployees = employees.filter(employee => employee.status === 'working');
// console.log(workingEmployees)


//----------------------bai 2-------------------------
/*

       ┌─────────────────────┐
       │   let maxAge = 0    │
       └────────────┬────────┘
                    │
                    ▼                     ┌──────────────┐
      ┌──────────────────────────┐        │              │
      │    tim ra maxAge         │ false  │     break    │
      │ if (employee.age > maxAge├───────►│              │
      └─────────────┬────────────┘        └──────────────┘
                    │  true
                    ▼
           ┌──────────────────────┐
           │ maxAge = employee.age│
           └────────┬─────────────┘
                    ▼
     ┌─────────────────────────────────┐
     │                                 │
     │   loc ra nv co tuoi lon nhat    │
     └─────────────────────────────────┘

 */

// let maxAge = 0;
// for (const employee of employees) {
//     if (employee.age > maxAge) {
//         maxAge = employee.age;
//     }
// }
// let employeeMaxAge = employees.filter(employee => employee.age === maxAge);
// console.log(employeeMaxAge)



// -------------------- bai 3 ---------------------------------

/*
                   ┌───────────────────────────────────────┐
                   │    let minPrice = products[0].price   │
                   └─────────────────┬─────────────────────┘
                                     │
                     ┌───────────────▼───────────────┐
                     │      tim ra minAge            │ false    ┌──────────┐
                     │   if (products.price < minAge)├─────────►│   break  │
                     └───────────────┬───────────────┘          └──────────┘
                                     │  true
                                     ▼
                   ┌─────────────────────────────────┐
                   │     minAge === products.price   │
                   └─────────────────┬───────────────┘
                                     │
                                     │
            ┌────────────────────────▼──────────────────────┐
            │      loc ra mat hang co gia tri thap nhat     │
            └───────────────────────────────────────────────┘
 */

// let minPrice = products[0].price ;
// for (const product of products) {
//     if (product.price < minPrice) {
//         minPrice = product.price;
//     }
// }
// let productMinPrice = products.filter(product => product.price === minPrice);
// console.log(productMinPrice)




// ---------------------- bai 6 --------------------------
/*





                    ┌────────────────────────────┐
                    │                            │
                    │  const  totalQuantity = [] │
                    │                            │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                ┌──────────────────────────────────────────┐
                │                                          │
                │  loc tung phan tu trong trong employees  │
                └─────────────────┬────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │    khoi tao bien total = 0  │
                    └─────────────┬───────────────┘
                                  │
                                  │
                ┌─────────────────▼───────────────┐
                │  loc tung phan tu trong orders  │
                └─────────────────┬───────────────┘
                                  │
                                  │
              ┌───────────────────▼────────────────────┐
              │                                        │
              │  if (employee.id === order.employeeId )│
              │    total = total + order.quantity      │
              └──────────────────┬─────────────────────┘
                                 │
                                 │
                                 ▼
                    ┌───────────────────────────┐
                    │     totalQuantity.push    │
                    └───────────┬───────────────┘
                                │
                   ┌────────────▼──────────────┐
                   │                           │
                   │    khoi tao maxQuantity   │
                   │                           │
                   └──────────┬────────────────┘
                              ▼
                   ┌────────────────────┐
                   │   tim maxQuantity  │
                   └──────────┬─────────┘
                              │
                              ▼
             ┌──────────────────────────────────────┐
             │                                      │
             │   loc ra san pham ban duoc so luong  │
             │   nhieu nhat                         │
             └──────────────────────────────────────┘

 */
// const totalQuantity = [] ;
// for(const employee of employees){
//     let total = 0;
//     for(const order of orders){
//         if(employee.id === order.employeeId) {
//             total += order.quantity;
//         }
//     }
//     totalQuantity.push({
//         ...employee,
//         quantity: total,
//     })
// }
//
// let maxQuantity = 0;
// for (const emTotalQuantity of totalQuantity) {
//     if (emTotalQuantity.quantity > maxQuantity) {
//         maxQuantity = emTotalQuantity.quantity;
//     }
// }
// let emTotalMaxQuantity = totalQuantity.filter( emTotalQuantity => emTotalQuantity.quantity === maxQuantity);
// console.log(emTotalMaxQuantity);




//-------------------- bai 5 ---------------------------------
/*
                            ┌────────────────────────────┐
                            │                            │
                            │  const  totalQuantity = [] │
                            │                            │
                            └─────────────┬──────────────┘
                                          │
                                          ▼
                        ┌──────────────────────────────────────────┐
                        │                                          │
                        │  loc tung phan tu trong trong products   │
                        └─────────────────┬────────────────────────┘
                                          │
                                          ▼
                            ┌─────────────────────────────┐
                            │    khoi tao bien total = 0  │
                            └─────────────┬───────────────┘
                                          │
                                          │
                        ┌─────────────────▼───────────────┐
                        │  loc tung phan tu trong order   │
                        └─────────────────┬───────────────┘
                                          │
                                          │
                      ┌───────────────────▼────────────────────┐
                      │                                        │
                      │  if ( product.id === order.productId  )│
                      │    total = total + order.quantity      │
                      └──────────────────┬─────────────────────┘
                                         │
                                         │
                                         ▼
                         ┌─────────────────────────────────────────┐
                         │   khoi tao bien totalPrice              │
                         │     totalprice = product.price*total    │
                         │                                         │
                         └────────────────┬────────────────────────┘
                                          ▼
                            ┌───────────────────────────┐
                            │     totalQuantity.push    │
                            └───────────┬───────────────┘
                                        │
                           ┌────────────▼──────────────┐
                           │                           │
                           │    khoi tao maxPrice      │
                           │                           │
                           └──────────┬────────────────┘
                                      ▼
                           ┌────────────────────┐
                           │   tim maxPrice     │
                           └──────────┬─────────┘
                                      │
                                      ▼
                     ┌──────────────────────────────────────┐
                     │                                      │
                     │   loc ra san pham ban dc nhieu tien  │
                     │   nhat                               │
                     └──────────────────────────────────────┘


 */
// const totalQuantity = [] ;
// for (const product of products) {
//     let total = 0;
//     for(order of orders) {
//         if (product.id === order.productId) {
//             total += order.quantity;
//         }
//     }
//     totalQuantity.push ({
//         ...product,
//         quantity: total,
//         totalPrice: product.price*total,
//     })
// }
// let maxPrice = 0;
// for (total of totalQuantity) {
//     if(total.totalPrice > maxPrice) {
//         maxPrice = total.totalPrice;
//     }
// }
// let proMaxPrice = totalQuantity.filter (pro => pro.totalPrice === maxPrice);
// console.log(proMaxPrice);



// -------------------- bai 4 --------------------------
/*
                   ┌────────────────────────────┐
                   │                            │
                   │  const  totalQuantity = [] │
                   │                            │
                   └─────────────┬──────────────┘
                                 │
                                 ▼
               ┌──────────────────────────────────────────┐
               │                                          │
               │  loc tung phan tu trong trong employees  │
               └─────────────────┬────────────────────────┘
                                 │
                                 ▼
                   ┌─────────────────────────────┐
                   │    khoi tao bien total = 0  │
                   └─────────────┬───────────────┘
                                 │
                                 │
               ┌─────────────────▼───────────────┐
               │  loc tung phan tu trong oders   │
               └─────────────────┬───────────────┘
                                 │
                                 │
             ┌───────────────────▼────────────────────┐
             │                                        │
             │  if (employee.id === orders.employeeId)│
             │    total = total + order.quantity      │
             └──────────────────┬─────────────────────┘
                                │
                                │
                                ▼
                   ┌───────────────────────────┐
                   │     totalQuantity.push    │
                   └───────────┬───────────────┘
                               │
                  ┌────────────▼──────────────┐
                  │                           │
                  │    khoi tao maxQuantity   │
                  │                           │
                  └──────────┬────────────────┘
                             ▼
                  ┌────────────────────┐
                  │   tim maxQuantity  │
                  └──────────┬─────────┘
                             │
                             ▼
            ┌──────────────────────────────────────┐
            │                                      │
            │   loc ra san pham co ban nhieu nhat  │
            │                                      │
            └──────────────────────────────────────┘
 */
// const totalQuantity = [] ;
// for (const product of products) {
//     let total = 0;
//     for(order of orders) {
//         if (product.id === order.productId) {
//             total += order.quantity;
//         }
//     }
//     totalQuantity.push ({
//         ...product,
//         quantity: total,
//         totalPrice: product.price*total,
//     })
// }
// console.log(totalQuantity);
// let maxQuantity = 0 ;
// for (const total of totalQuantity) {
//     if (total.quantity >= maxQuantity) {
//         maxQuantity = total.quantity;
//     }
// }
// let emMaxQuantity = totalQuantity.filter (p =>p.quantity === maxQuantity);
// console.log(emMaxQuantity);



// ------------------bai 7 ----------------------
/*

               ┌──────────────────────┐
               │                      │
               │   gop 3 array        │
               │   bang map va find   │
               │                      │
               └─────────┬────────────┘
                         │
          ┌─────────────────────────────────────┐
          │   cong tong doan thu moi nhan vien  │
          │    totalPrice = quanity*price       │
          └─────────────────┬───────────────────┘
                            │
                            │
                            ▼
         ┌───────────────────────────────────────────────┐
         │  reduce cong tong doanh thu cua moi nhan vien │
         │  voi san pham ban duoc                        │
         └─────────────────────┬─────────────────────────┘
                             ┌─┘
                             │
                             │
                             │
               ┌─────────────▼──────────────┐
               │   tim doanh thu cao nhat   │
               └─────────────┬──────────────┘
                             │
                             ▼
        ┌──────────────────────────────────────────┐
        │  loc ra nhan vien co doanh thu cao nhat  │
        └──────────────────────────────────────────┘

 */
// const ordersEmployees = orders.map(order => {
//     const employee = employees.find((employee) => employee.id === order.employeeId);
//     return {...employee,productId:order.productId, quantity:order.quantity};
// })
// const ordersEmPo = ordersEmployees.map(orderEmployee => {
//     const product = products.find((product) => product.id === orderEmployee.productId);
//     return {...orderEmployee,nameProduct: product.name,price: product.price,totalPriceProduct: orderEmployee.quantity*product.price};
// })
// const result = ordersEmPo.reduce((acc, current) => {
//     const existingUser = acc.find(user => user.id === current.id);
//
//     if (existingUser) {
//         existingUser.totalPriceProduct += current.totalPriceProduct;
//         const existingProduct = existingUser.products?.find(p => p.productId === current.productId);
//
//         if (existingProduct) {
//             existingProduct.quantity += current.quantity;
//         } else {
//             existingUser.products = existingUser.products || [];
//             existingUser.products.push({
//                 productId: current.productId,
//                 nameProduct: current.nameProduct,
//                 price: current.price,
//                 quantity: current.quantity
//             });
//         }
//     } else {
//         acc.push({
//             id: current.id,
//             name: current.name,
//             age: current.age,
//             status: current.status,
//             totalPriceProduct: current.totalPriceProduct,
//             products: [{
//                 productId: current.productId,
//                 nameProduct: current.nameProduct,
//                 price: current.price,
//                 quantity: current.quantity
//             }]
//         });
//     }
//
//     return acc;
// }, []);
// let maxRevenue = 0 ;
// for (res of result) {
//     if(res.totalPriceProduct > maxRevenue) {
//         maxRevenue = res.totalPriceProduct
//     }
// }
// let emMaxRevenue = result.filter (em => em.totalPriceProduct === maxRevenue);
// console.log(emMaxRevenue);


// -------------- bai 8 -----------------------

const ordersEmployees = orders.map(order => {
    const employee = employees.find((employee) => employee.id === order.employeeId);
    return {...employee,productId:order.productId, quantity:order.quantity};
})
// console.log(ordersEmployees);
const ordersEmPo = ordersEmployees.map(orderEmployee => {
    const product = products.find((product) => product.id === orderEmployee.productId);
    return {...orderEmployee,nameProduct: product.name,price: product.price,totalPriceProduct: orderEmployee.quantity*product.price};
})
const result = [];

const idMap = {};

ordersEmPo.forEach(item => {
    if (!idMap[item.id]) {
        idMap[item.id] = [];
        result.push(idMap[item.id]);
    }
    idMap[item.id].push(item);
});

console.log(result);








