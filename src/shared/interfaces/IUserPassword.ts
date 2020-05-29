import { IPassword } from "./IPassword";

export interface IUserPassword extends IPassword {
  confirmPassword: string;
  hashCode: string;
}

