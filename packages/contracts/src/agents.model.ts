import { IBaseEntity } from "./base.entity";

export interface IAgent extends IBaseEntity {
  agentCode: string;
  firstName: string;
  lastName: string;
  centerId: string;
  position: string;
  phone: string;
  email: string;
}
