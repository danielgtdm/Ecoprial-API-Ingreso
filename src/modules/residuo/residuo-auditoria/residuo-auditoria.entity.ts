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
import { Usuario } from '../../usuario/usuario.entity';

@Entity('residuo_auditoria')
export class ResiduoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Residuo, (residuo) => residuo.id, {
    nullable: false,
    eager: true,
  })
  id_Residuo: number;

  @Column({ type: 'double', nullable: true })
  cantidad: number;

  @Column({ type: 'integer', nullable: true })
  celda: number;

  @Column({ type: 'double', nullable: true })
  humedad: number;

  @Column({ type: 'double', nullable: true })
  pH: number;

  @Column({ type: 'double', nullable: true })
  temperatura: number;

  @Column({ type: 'double', nullable: true })
  conductividad_electrica: number;

  @Column({ type: 'double', nullable: true })
  salinidad: number;

  @Column({ type: 'double', nullable: true })
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
