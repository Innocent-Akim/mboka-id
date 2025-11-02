import { IBaseEntity } from "./base.entity";

export interface IBiometricData extends IBaseEntity {
  citizenId: string;
  biometricType: BiometricDataType;
  storageRef: string;
  biometricHash: string;
  format: string;
  collectedByAgentId: string;
  collectedAt: Date;
  verified: boolean;
  checksum: string;
}

export enum BiometricDataType {
  FINGERPRINTS = "fingerprints",
  PHOTO = "photo",
  IRIS = "iris",
  SIGNATURE = "signature",
}
