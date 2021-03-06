import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DbAccessRight } from './access-right.entity';
import { Role } from 'libs/api-interfaces/src/lib/models';

@Entity('role')
export class DbRole implements Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  applicationId: number; //fk for application

  @Column({ type: 'int', nullable: true })
  tenantId: number; //fk for application

  @Column()
  name: string;

  @Column()
  description: string;

  accessRights: DbAccessRight[];
}
