import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Conductor } from '../conductor/conductor.entity';
import { Transportista } from '../transportista/transportista.entity';
@Entity('vehiculo')
export class Vehiculo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  patente: string;

  @Column({ type: 'varchar', nullable: false })
  rut: string;

  @ManyToOne(() => Transportista, (transportista) => transportista.Vehiculos)
  Transportista: Transportista;

  @ManyToMany(() => Conductor)
  @JoinTable()
  Conductores: Conductor[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
