export default class Register {
  _id: string;
  _name: string;
  _age: number;

  constructor(name: string, age: number, id: string = "") {
    this._name = name;
    this._age = age;
    this._id = id;
  }

  static initRegister() {
    return new Register("", 0);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get age() {
    return this._age;
  }
}
