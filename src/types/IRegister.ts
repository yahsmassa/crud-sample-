import Register from "./Register";

export default interface IClient {
  save(resident: Register): Promise<Register | undefined>;
  delete(resident: Register): Promise<void>;
  getResidents(): Promise<Register[]>;
}
