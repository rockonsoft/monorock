import { Entity, Column, OneToMany } from 'typeorm';
import { Tenant } from '@monorock/api-interfaces';
import { DbBaseEntity } from '../../shared/base-entity';
import { DbUser } from './user.entity';
import { DbProduct } from './product.entity';

@Entity('tenant')
export class DbTenant extends DbBaseEntity implements Tenant {
  @Column()
  externalId: string; //external identifier

  @Column()
  name: string;

  @Column()
  description: string;

  /**
   * Relations
   */

  users?: DbUser[];

  products: DbProduct[];
}
