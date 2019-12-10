import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DbBaseEntity } from '../../shared/base-entity';
import { Type } from 'class-transformer';
import { UserComment, Product } from '@monorock/api-interfaces';
import { DbTenant } from './tenant.entity';
import { DbComment } from './comment.entity';

@Entity('product')
export class DbProduct extends DbBaseEntity implements Product {
  @Column()
  title: string;

  @Column()
  description: string;

  /**
   * Relations
   */

  @OneToMany(type => DbComment, u => u.product, { onDelete: 'CASCADE' })
  @Type(t => DbComment)
  comments: DbComment[];

  @ManyToOne(type => DbTenant, tenant => tenant.products)
  tenant: DbTenant;
}
