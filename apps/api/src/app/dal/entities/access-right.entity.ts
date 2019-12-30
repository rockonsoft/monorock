import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AccessRight } from '@monorock/api-interfaces';
import { DbRole } from './role.entity';

// export class LikeDBRole implements DbRole {
//   id: number;
//   applicationId: number;
//   tenantId: number;
//   name: string;
//   description: string;
//   accessRights: DbAccessRight[];
// }

@Entity('accessright')
export class DbAccessRight implements AccessRight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  modelId: number; //fk for either

  @Column({ type: 'int', nullable: true })
  propertyId: number; //fk for either

  @Column({ type: 'int' })
  roleId?: number;

  @Column({ type: 'int' })
  accessType: number;

  @ManyToOne(type => DbRole, r => r.accessRights, { onDelete: 'CASCADE' })
  role?: DbRole;
}
