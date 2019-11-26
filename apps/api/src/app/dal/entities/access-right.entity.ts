import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AccessType } from '@monorock/api-interfaces';

@Entity('accessright')
export class DbAccessRight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  modelId: number; //fk for either

  @Column({ type: 'int', nullable: true })
  propertyId: number; //fk for either

  @Column({ type: 'int' })
  roleId: number;

  @Column({ type: 'int' })
  accessType: AccessType;
}
