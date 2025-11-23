import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Company } from './company.entity';

@Entity('line')
@Index(['name', 'status'])
export class Line {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 50, nullable: true, unique: true })
  code?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  // Relaciones

  @OneToMany(() => Vehicle, (vehicle) => vehicle.line)
  vehicles: Vehicle[];


  @ManyToOne(() => Company, (company) => company.lines, { 
    nullable: true, 
    onDelete: 'SET NULL' 
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

}