import { IBaseEntityDateModel } from "./base.entity";

export interface IAccessLog extends IBaseEntityDateModel {
  timestamp: Date;
  userId: string;
  userType: AccessLogUserType;
  action: AccessLogAction;
  targetTable: string;
  targetId: string;
  sourceIp: string;
  result: AccessLogResult;
  details: Record<string, any>;
}

export enum AccessLogUserType {
  AGENT = "agent",
  SERVICE = "service",
  API = "api",
}

export enum AccessLogAction {
  VIEW_CITIZEN = "view_citizen",
  UPDATE_BIOMETRIC = "update_biometric",
  UPDATE_IDENTITY_CARD = "update_identity_card",
  UPDATE_INTEGRATION_SERVICE = "update_integration_service",
}

export enum AccessLogResult {
  SUCCESS = "success",
  FAILURE = "failure",
}
