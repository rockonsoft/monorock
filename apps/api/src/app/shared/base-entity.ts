import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DbBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => 'LOCALTIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => 'LOCALTIMESTAMP' })
  updatedAt?: Date;
}
