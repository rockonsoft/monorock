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
  application: number; //fk for application
}
