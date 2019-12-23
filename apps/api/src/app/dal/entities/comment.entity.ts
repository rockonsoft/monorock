import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { DbBaseEntity } from '../../shared/base-entity';
import { DbUser } from './user.entity';
import { Type } from 'class-transformer';
import { UserComment } from '@monorock/api-interfaces';
import { DbProduct } from './product.entity';

@Entity('comment')
export class DbComment extends DbBaseEntity implements UserComment {
  @Column()
  commentBody: string; //external identifier

  @Column()
  rating: number;

  @Column({ nullable: false })
  productId?: number;
  /**
   * Relations
   */

  @ManyToOne(type => DbUser, c => c.comments, { onDelete: 'CASCADE' })
  user: DbUser;

  @ManyToOne(type => DbProduct, c => c.comments, { onDelete: 'CASCADE' })
  product: DbProduct;
}
