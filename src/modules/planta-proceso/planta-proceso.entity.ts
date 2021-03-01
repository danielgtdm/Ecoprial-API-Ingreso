import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Generador } from '../generador/generador.entity';
import { Ingreso } from '../ingreso/ingreso.entity';

@Entity('planta_proceso')
export class PlantaProceso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'double', nullable: false })
  cantidad: number;

  @Column({ type: 'integer', nullable: false })
  celda: number;

  @Column({ type: 'double', nullable: false })
  humedad: number;

  @Column({ type: 'double', nullable: false })
  pH: number;

  @Column({ type: 'double', nullable: false })
  temperatura: number;

  @Column({ type: 'double', nullable: false })
  conductividad_electrica: number;

  @Column({ type: 'double', nullable: false })
  salinidad: number;

  @Column({ type: 'double', nullable: false })
  tds: number;

  @ManyToOne(() => Generador, (generador) => generador.PlantasProceso)
  Generador: Generador;

  @OneToMany(() => Ingreso, (ingreso) => ingreso.PlantaProceso)
  Ingresos: Ingreso[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
