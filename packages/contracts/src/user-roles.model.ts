import { IBaseEntity } from "./base.entity";

export interface IUserRole extends IBaseEntity {
  userId: string;
  roleId: string;
}