import { Generador } from '../../generador/generador.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlantaProceso } from '../planta-proceso.entity';

@Entity('planta_proceso_auditoria')
export class PlantaProcesoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => PlantaProceso, (plantaProceso) => plantaProceso.id, {
    nullable: false,
    eager: true,
  })
  id_Planta_Proceso: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @ManyToOne(() => Generador, (generador) => generador.id, {
    nullable: false,
    eager: true,
  })
  id_Generador: number;

  @Column({ type: 'varchar', length: 8 })
  status_Planta_Proceso: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
