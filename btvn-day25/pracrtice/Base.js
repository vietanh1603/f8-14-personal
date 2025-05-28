export class Base {
  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }
// lay id
  getId() {
    return this.#id;
  }
// lay name
  getName() {
    return this.#name;
  }
// sua name
  setName(name) {
    this.#name = name;
  }
// ghi de phuong thuc
  toString() {
    return `ID: ${this.#id}, Name: ${this.#name}`;
  }
}