import { IBaseEntity } from "./base.entity";

export interface IContact extends IBaseEntity {
  citizenId: string;
  phone: string;
  email: string;
  primaryContactMethod: ContactType;
  active: boolean;
}

export enum ContactType {
  PHONE = "phone",
  EMAIL = "email",
  OTHER = "other",
}
