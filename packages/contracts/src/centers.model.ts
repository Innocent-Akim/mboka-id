import { IBaseEntityDateModel } from "./base.entity";

export interface ICenter extends IBaseEntityDateModel {
    center_code: string;
    name: string;
    center_type: CenterType;
    province: string;
    territory: string;
    district: string;
    address: string;
    gps_lat: number;
    gps_long: number;
    solar_power: boolean;
    active: boolean;
}

export enum CenterType {
    FIXED = 'fixed',
    MOBILE = 'mobile',
}