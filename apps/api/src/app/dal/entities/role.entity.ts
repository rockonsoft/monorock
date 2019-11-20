import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@monorock/api-interfaces';

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
}
