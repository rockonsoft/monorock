import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DbBaseEntity } from '../../shared/base-entity';

@Entity('usersession')
export class DbUserSession extends DbBaseEntity {
  @Column()
  userId: string;

  @Column()
  refreshToken: string; //fk for application
}
