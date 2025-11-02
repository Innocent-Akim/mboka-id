import { IBaseEntityDateModel } from "./base.entity";

export interface ICitizenHistory extends IBaseEntityDateModel {
    citizenId: string;
    snapshot: Record<string, any>;
    changedByUserId: string;
    changeReason: string;
}