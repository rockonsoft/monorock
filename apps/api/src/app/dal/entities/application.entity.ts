import { Entity, Column, PrimaryColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { HostedApplication } from '@monorock/api-interfaces';

enum RoleType {
  create,
  read,
  update,
  delete
}

@Entity('application')
export class DbApplication implements HostedApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
