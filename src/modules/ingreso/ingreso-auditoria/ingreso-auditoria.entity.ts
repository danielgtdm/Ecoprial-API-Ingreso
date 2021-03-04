import { PlantaProceso } from '../../planta-proceso/planta-proceso.entity';
import { Vehiculo } from '../../vehiculo/vehiculo.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingreso } from '../ingreso.entity';
import { Conductor } from '../../conductor/conductor.entity';
import { Residuo } from '../../residuo/residuo.entity';

@Entity('ingreso_auditoria')
export class IngresoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Ingreso, (ingreso) => ingreso.id, {
    nullable: false,
    eager: true,
  })
  id_Ingreso: number;

  @Column({ type: 'datetime', nullable: false })
  entrada: Date;

  @Column({ type: 'datetime', nullable: false })
  salida: Date;

  @Column({ type: 'integer', nullable: false })
  nro_guia: number;

  @Column({ type: 'integer', nullable: false })
  nro_report: number;

  @ManyToOne(() => PlantaProceso, (plantaProceso) => plantaProceso.id, {
    nullable: false,
    eager: true,
  })
  id_Planta_Proceso: number;

  @ManyToOne(() => Residuo, (residuo) => residuo.id, {
    nullable: false,
    eager: true,
  })
  id_Residuo: number;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.id, {
    nullable: false,
    eager: true,
  })
  id_Vehiculo: number;

  @ManyToOne(() => Conductor, (conductor) => conductor.id, {
    nullable: false,
    eager: true,
  })
  id_Conductor: number;

  @Column({ type: 'varchar', length: 8 })
  status_Ingreso: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
