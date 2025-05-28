import {Base} from "./Base.js";

export  class Product extends Base {
    #price;

    constructor(id, name, price) {
        super(id, name);
        this.#price = price;
    }
// lay gia
    getPrice() {
        return this.#price;
    }
// sua gia
    setPrice(price) {
        this.#price = price;
    }
// ghi de phuong thuc
    toString() {
        return `Sản phẩm: ${this.getName()}, giá: ${this.#price.toLocaleString('vi-VN')} VNĐ`;
    }

}