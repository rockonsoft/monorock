import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modelproperty')
export class DbModelProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  modelId: number; //fk for application

  @Column()
  path: string; //application.model.property eg. rockme.blog.url

  @Column()
  description: string;
}
