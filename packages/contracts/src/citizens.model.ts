import { IBaseEntity } from "./base.entity";

export interface ICitizen extends IBaseEntity {
  nationalNumber: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  residencyStatus: ResidencyStatus;
  registrationDate: Date;
  registeredByAgentId: string;
  registrationCenterId: string;
  verificationStatus: VerificationStatus;
  sourceDocumentation: string;
  meta: Record<string, any>;
  searchVector: string;
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'Other',
}

export enum ResidencyStatus {
  CITIZEN = 'citizen',
  REFUGEE = 'refugee',
  STATELESS = 'stateless',
  TEMPORARY_RESIDENT = 'temporary_resident',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  IN_PROGRESS = 'in_progress',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}