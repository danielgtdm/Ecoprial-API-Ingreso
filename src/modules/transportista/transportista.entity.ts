import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Conductor } from '../conductor/conductor.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

@Entity('transportista')
export class Transportista extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false})
  rut: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @OneToMany(() => Conductor, (conductor) => conductor.Transportista)
  Conductores: Conductor[];

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.Transportista)
  Vehiculos: Vehiculo[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
