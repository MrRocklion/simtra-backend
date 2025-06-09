import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('gps')
export class Gps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, vehicle => vehicle.gpsRecords, { onDelete: 'CASCADE' })
  vehicle: Vehicle;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
