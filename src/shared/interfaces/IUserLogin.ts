import { IPassword } from "./IPassword";

export interface IUserLogin extends IPassword {
  email: string;
}
