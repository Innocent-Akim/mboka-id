import { IBaseEntityDateModel } from "./base.entity";

export interface IRole extends IBaseEntityDateModel {
  name: string;
  description: string;
}
