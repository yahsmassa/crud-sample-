//TypeScript  Syntax Sugar for Constructors
//https://github.com/microsoft/TypeScript/issues/4974
export default class Register {
  constructor(
    public name: string,
    public age: number,
    public id: string = ""
  ) {}

  static initRegister() {
    return new Register("", 0);
  }
}
