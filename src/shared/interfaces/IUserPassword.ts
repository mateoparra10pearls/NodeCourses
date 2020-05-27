import { IPassword } from "./IPassword";

export interface IUserPassword extends IPassword {
  id: number,
  confirmPassword: string;
}

