import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ModelMeta } from '@monorock/api-interfaces';

@Entity('model')
export class DbModelMeta implements ModelMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  applicationId: number; //fk for application

  @Column()
  endpoint: string; //fk for application

  @Column()
  identityProperty: string; //fk for application

  @Column({ nullable: true })
  parentName: string; //fk for application
}
