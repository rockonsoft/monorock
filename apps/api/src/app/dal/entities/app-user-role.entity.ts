import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

//defines what roles user are in
@Entity('appuserrole')
export class DbAppUserRole {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'int', nullable: true })
  appId: number;

  @Column({ type: 'int' })
  roleId: number;

  @Column({ type: 'int', nullable: true })
  tenantId: number;
}
