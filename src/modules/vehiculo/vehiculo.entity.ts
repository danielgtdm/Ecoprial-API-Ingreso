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
  OneToMany,
} from 'typeorm';
import { Conductor } from '../conductor/conductor.entity';
import { Ingreso } from '../ingreso/ingreso.entity';
import { Transportista } from '../transportista/transportista.entity';
@Entity('vehiculo')
export class Vehiculo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  patente: string;

  @ManyToOne(() => Transportista, (transportista) => transportista.Vehiculos, {
    eager: true,
  })
  Transportista: Transportista;

  @ManyToMany(() => Conductor)
  @JoinTable()
  Conductores: Conductor[];

  @OneToMany(() => Ingreso, (ingreso) => ingreso.Vehiculo)
  Ingresos: Ingreso[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
