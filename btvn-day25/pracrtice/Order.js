export class Order {
    #id;
    #customer;
    #products;
    #orderDate;

    constructor(id, customer, orderDate) {
        this.#id = id;
        this.#customer = customer;
        this.#products = [];
        this.#orderDate = orderDate;
    }
// lay id
    getId() {
        return this.#id;
    }
// lay customer
    getCustomer() {
        return this.#customer;
    }
// lay product
    getProducts() {
        return this.#products;
    }

    getOrderDate() {
        return this.#orderDate;
    }
    // sua id
    setId(id) {
        this.#id = id;
    }
    // sua san pham
    setProducts(products) {
        this.#products = products;
    }
    // sua ngay dat hang
    setOrderDate(orderDate) {
        this.#orderDate = orderDate;
    }
// them san pham vao don hang
    addProduct(product) {
        this.#products.push(product);
    }
// xoa san pham
    removeProduct(productId) {
        this.#products = this.#products.filter(product => product.getId() !== productId);
    }
// tinh tong gia tri don hang
    calculateTotal() {
        return this.#products.reduce((total, product) => total + product.getPrice(), 0);
    }
// ghi de phuong thuc
    toString() {
        return `Đơn hàng #${this.#id}, khách hàng: ${this.#customer.getName()}, ngày đặt: ${this.#orderDate.toLocaleDateString('vi-VN')}`;
    }

}