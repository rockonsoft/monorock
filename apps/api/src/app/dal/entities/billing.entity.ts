import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('billing')
export class DbBilling {
  @PrimaryGeneratedColumn()
  id: number;
}
