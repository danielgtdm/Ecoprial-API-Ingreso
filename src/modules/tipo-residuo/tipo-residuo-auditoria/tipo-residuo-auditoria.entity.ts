import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoResiduo } from '../tipo-residuo.entity';

@Entity('tipo_residuo_auditoria')
export class TipoResiduoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => TipoResiduo, (tipoResiduo) => tipoResiduo.id, {
    nullable: false,
    eager: true,
  })
  id_Tipo_Residuo: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status_Residuo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
