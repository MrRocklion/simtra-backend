import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { Line } from './line.entity';

@Entity('company')
@Index(['name', 'status'])
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  // Relaciones

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Line, (line) => line.company)
  lines: Line[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.company)
  vehicles: Vehicle[];
}