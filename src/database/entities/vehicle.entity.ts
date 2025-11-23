import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';
import { Gps } from './gps.entity';
import { OperationStatus } from 'src/common/enum/operation-status.enum';
import { Grupo } from 'src/common/enum/grupo.enum';
import { Line } from './line.entity';

@Entity('vehicles')
@Index(['register'])
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  register: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  plate?: string;

  @Column({
    type: 'enum',
    enum: OperationStatus,
    default: OperationStatus.INACTIVE,
  })
  operation_status: OperationStatus;

  @Column({
    type: 'enum',
    enum: Grupo,
  })
  grupo: Grupo;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'int', nullable: true })
  user_id?: number;

  @Column({ type: 'int', nullable: true })
  line_id?: number;

  @Column({ type: 'int', nullable: true })
  company_id?: number;

  // Relaciones
  
  @ManyToOne(() => User, (user) => user.vehicles, { 
    nullable: true, 
    onDelete: 'SET NULL' 
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Line, (line) => line.vehicles, { 
    nullable: true, 
    onDelete: 'SET NULL' 
  })
  @JoinColumn({ name: 'line_id' })
  line?: Line;

  @ManyToOne(() => Company, (company) => company.vehicles, { 
    nullable: true, 
    onDelete: 'SET NULL' 
  })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @OneToMany(() => Gps, (gps) => gps.vehicle)
  gps_records: Gps[];
}