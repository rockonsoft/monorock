import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userowned')
export class DbUserOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  applicationId: number; //fk for application

  @Column({ type: 'int' })
  tenantId: number; //fk for application

  @Column({ type: 'int' })
  modelId: number; //fk for model

  @Column()
  ownerId: string;

  @Column({ type: 'int' })
  ownedId: number;
}
