import { IUser } from "./users.model";

export interface IBaseModel {
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export type ID = string;

export interface IBaseSoftDeleteModel {
  deletedAt?: Date;
  isDeleted?: boolean;
}

export interface IBaseIntegrationModel {
  integrationType: EntityIntegrationTypes;
  integrationId: ID;
}

export interface IBaseEntityDateModel
  extends IBaseModel,
    IBaseSoftDeleteModel {
  id: ID;
}

export interface IBaseEntity
  extends IBaseModel,
    IBaseSoftDeleteModel,
    IBaseEntityActionByUserModel {
  id: ID;

  deletedAt?: Date;
  isActive?: boolean;
  isArchived?: boolean;
  isDraft?: boolean;
  isPublished?: boolean;
  isVerified?: boolean;
  isSuspended?: boolean;
  isLocked?: boolean;
}

export interface IBaseEntityActionByUserModel {
  readonly createdByUser?: IUser;
  readonly createdByUserId?: ID;

  readonly updatedByUser?: IUser;
  readonly updatedByUserId?: ID;

  readonly deletedByUser?: IUser;
  readonly deletedByUserId?: ID;
}

export enum EntityIntegrationTypes {
  HEALTH = "health",
  EDUCATION = "education",
  SECURITY = "security",
  FINANCE = "finance",
  INSURANCE = "insurance",
  LOGISTICS = "logistics",
  COMMERCE = "commerce",
  INDUSTRY = "industry",
  AUTOMOTIVE = "automotive",
  AGRICULTURE = "agriculture",
  OTHER = "other",
}
