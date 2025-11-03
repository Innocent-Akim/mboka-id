import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import type { ID, IBaseEntity, IBaseModel, IBaseSoftDeleteModel } from '@mboka-id/contracts';

/**
 * Base class for all TypeORM entities
 * Implements IBaseEntity with all common fields
 */
export abstract class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: ID;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @Column({
    name: 'is_archived',
    type: 'boolean',
    default: false,
  })
  isArchived?: boolean;

  @Column({
    name: 'is_draft',
    type: 'boolean',
    default: false,
  })
  isDraft?: boolean;

  @Column({
    name: 'is_published',
    type: 'boolean',
    default: false,
  })
  isPublished?: boolean;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
  })
  isVerified?: boolean;

  @Column({
    name: 'is_suspended',
    type: 'boolean',
    default: false,
  })
  isSuspended?: boolean;

  @Column({
    name: 'is_locked',
    type: 'boolean',
    default: false,
  })
  isLocked?: boolean;

  // Relations for createdByUser (avoid circular dependency)
  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'created_by_user_id' })
  createdByUser?: any;

  @Column({
    name: 'created_by_user_id',
    type: 'uuid',
    nullable: true,
  })
  createdByUserId?: string;

  // Relations for updatedByUser
  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'updated_by_user_id' })
  updatedByUser?: any;

  @Column({
    name: 'updated_by_user_id',
    type: 'uuid',
    nullable: true,
  })
  updatedByUserId?: string;

  // Relations for deletedByUser
  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'deleted_by_user_id' })
  deletedByUser?: any;

  @Column({
    name: 'deleted_by_user_id',
    type: 'uuid',
    nullable: true,
  })
  deletedByUserId?: string;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted?: boolean;
}

export  class BaseEntityDate implements IBaseModel, IBaseSoftDeleteModel{
    @PrimaryGeneratedColumn('uuid')
    id!: ID;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    })
    deletedAt?: Date;

    @Column({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
    })
    isDeleted?: boolean;
}