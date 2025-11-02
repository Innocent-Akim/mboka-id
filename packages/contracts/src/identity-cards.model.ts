import { IBaseEntityDateModel } from "./base.entity";

export interface IIdentityCard extends IBaseEntityDateModel {
  citizenId: string;
  cardNumber: string;
  cardType: IdentityCardType;
  issuedDate: Date;
  expirationDate: Date;
  status: IdentityCardStatus;
  chipDataRef: string;
}

export enum IdentityCardType {
  RFID = "rfid",
  QR = "qr",
  DIGITAL = "digital",
}

export enum IdentityCardStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  EXPIRED = "expired",
  REVOKED = "revoked",
}
