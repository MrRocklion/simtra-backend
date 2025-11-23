import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('gps')
@Index(['vehicle', 'recorded_at'])
export class Gps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  velocity: number;

  @Column({ type: 'timestamptz' })
  @Index()
  recorded_at: Date;
  
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'int', nullable: false })
  vehicle_id: number;
  
  // Relaciones
  @ManyToOne(() => Vehicle, vehicle => vehicle.gps_records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}