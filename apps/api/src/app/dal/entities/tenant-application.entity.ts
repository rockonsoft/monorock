import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tenantapplication')
export class DbTenantApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  tenantId: number;

  @Column({ type: 'int' })
  applicationId: number;

  @Column({ type: 'int' })
  billingId: number;
}
