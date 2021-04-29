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
import { PlantaProcesoAuditoria } from '../../planta-proceso/planta-proceso-auditoria/planta-proceso-auditoria.entity';
import { ResiduoAuditoria } from '../../residuo/residuo-auditoria/residuo-auditoria.entity';
import { VehiculoAuditoria } from '../../vehiculo/vehiculo-auditoria/vehiculo-auditoria.entity';
import { ConductorAuditoria } from '../../conductor/conductor-auditoria/conductor-auditoria.entity';
import { Usuario } from '../../usuario/usuario.entity';

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

  @Column({ type: 'datetime', nullable: true })
  salida: Date;

  @Column({ type: 'integer', nullable: false })
  nro_guia: number;

  @Column({ type: 'integer', nullable: true })
  nro_report: number;

  @ManyToOne(
    () => PlantaProcesoAuditoria,
    (plantaProcesoAuditoria) => plantaProcesoAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Planta_Proceso: number;

  @ManyToOne(
    () => ResiduoAuditoria,
    (residuoAuditoria) => residuoAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Residuo: number;

  @ManyToOne(
    () => VehiculoAuditoria,
    (vehiculoAuditoria) => vehiculoAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Vehiculo: number;

  @ManyToOne(
    () => ConductorAuditoria,
    (conductorAuditoria) => conductorAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Conductor: number;

  @Column({ type: 'varchar', length: 8 })
  status_Ingreso: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, {
    nullable: false,
    eager: true,
  })
  id_Usuario: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
