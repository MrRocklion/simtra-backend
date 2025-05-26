// src/gps/gps.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('gps')
export class Gps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('int')
  speed: number;

  @Column('int')
  course: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  event: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
