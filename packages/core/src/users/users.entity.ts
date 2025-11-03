import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import type { IUser } from '@mboka-id/contracts';

/**
 * Entité User représentant un utilisateur du système
 * Implémente IUser avec tous les champs de IBaseEntity
 */
@Entity('users')
@Index(['username'], { unique: true })
@Index(['email'], { unique: true })
export class User extends BaseEntity implements IUser {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false, // Ne pas retourner le password par défaut dans les requêtes
  })
  password!: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  display_name!: string;
}

