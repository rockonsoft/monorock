import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Tenant } from '@monorock/api-interfaces';

@Entity('tenant')
export class DbTenant implements Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string; //external identifier

  @Column()
  name: string;

  @Column()
  description: string;
}
