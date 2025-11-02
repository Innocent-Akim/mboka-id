import { IBaseEntityDateModel } from "./base.entity";

export interface IAddress extends IBaseEntityDateModel {
  citizenId: string;
  province: string;
  territory: string;
  district: string;
  villageOrNeighborhood: string;
  addressLine: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
  startDate: Date;
  endDate: Date;
}
