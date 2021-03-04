import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Generador } from '../generador/generador.entity';
import { Ingreso } from '../ingreso/ingreso.entity';

@Entity('planta_proceso')
export class PlantaProceso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @ManyToOne(() => Generador, (generador) => generador.PlantasProceso, {
    eager: true,
  })
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
