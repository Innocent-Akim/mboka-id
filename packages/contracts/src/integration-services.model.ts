import { IBaseEntityDateModel } from "./base.entity";

export interface IIntegrationService extends IBaseEntityDateModel {
    citizenId: string;
    system: IntegrationSystem;
    externalIdentifier: string;
    linkedAt: Date;
    status: IntegrationStatus;
    meta: Record<string, any>;
}

export enum IntegrationSystem {
    HEALTH = 'health',
    EDUCATION = 'education',
    TAX = 'tax',
    ELECTIONS = 'elections',
    POLICE = 'police',
    FINANCE = 'finance',
    INSURANCE = 'insurance',
    LOGISTICS = 'logistics',
    COMMERCE = 'commerce',
    INDUSTRY = 'industry',
    AUTOMOTIVE = 'automotive',
    AGRICULTURE = 'agriculture',
    OTHER = 'other',
}

export enum IntegrationStatus {
    ACTIVE = 'active',
    DISABLED = 'disabled',
}