import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Residuo } from '../residuo.entity';
import { TipoResiduoAuditoria } from '../../tipo-residuo/tipo-residuo-auditoria/tipo-residuo-auditoria.entity';

@Entity('residuo_auditoria')
export class ResiduoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Residuo, (residuo) => residuo.id, {
    nullable: false,
    eager: true,
  })
  id_Residuo: number;

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

  @ManyToOne(
    () => TipoResiduoAuditoria,
    (tipoResiduoAuditoria) => tipoResiduoAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Tipo_Residuo: number;

  @Column({ type: 'varchar', length: 8 })
  status_Residuo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
