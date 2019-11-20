import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { AppUser } from '@monorock/api-interfaces';

@Entity('appuser')
@Index(['userId', 'display', 'tenantId'])
export class DbUser implements AppUser {
  @PrimaryColumn({ type: 'varchar' })
  userId: string;

  @Column()
  display: string;

  @Column()
  tenantId: string;

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
}
