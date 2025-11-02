import { IBaseEntity } from "./base.entity";

export interface IUser extends IBaseEntity {
  username: string;
  email: string;
  password: string;
  display_name: string;
}
