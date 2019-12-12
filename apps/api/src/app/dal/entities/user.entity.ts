import { Entity, Column, PrimaryColumn, Index, Generated, ManyToOne, OneToMany } from 'typeorm';
import { AppUser } from '@monorock/api-interfaces';
import { DbTenant } from './tenant.entity';
import { DbComment } from './comment.entity';
import { Type } from 'class-transformer';

@Entity('appuser')
@Index(['userId', 'display', 'tenantId'])
export class DbUser implements AppUser {
  @PrimaryColumn({ type: 'varchar' })
  userId: string;

  @Column({ type: 'int' })
  id?: number;

  @Column()
  display: string;

  @Column({
    nullable: true
  })
  tenantId: number;

  @Column({
    nullable: true
  })
  applicationId: number;

  @Column({
    nullable: true
  })
  tenantExternalId: string;

  @Column({
    nullable: true
  })
  email?: string;

  @Column({
    nullable: true
  })
  firstname?: string;

  @Column({
    nullable: true
  })
  lastname?: string;

  @Column({
    nullable: true
  })
  picture?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'LOCALTIMESTAMP'
  })
  created: Date;

  /**
   * Relations
   */

  @ManyToOne(type => DbTenant, c => c.users)
  tenant?: DbTenant;

  comments: DbComment[];
}
