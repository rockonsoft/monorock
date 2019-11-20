import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

enum AccessType {
  create,
  read,
  update,
  delete,
  all
}

@Entity('accessright')
export class DbAccessRight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  model: number; //fk for either

  @Column({ type: 'int', nullable: true })
  property: number; //fk for either

  @Column({ type: 'int' })
  roleId: number;

  @Column({ type: 'int' })
  accessType: AccessType;
}
