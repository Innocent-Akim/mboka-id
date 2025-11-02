import { IBaseEntityDateModel } from "./base.entity";

export interface IPermission extends IBaseEntityDateModel {
  name: string;
  description: string;
}