import { TransportistaAuditoria } from '../../transportista/transportista-auditoria/transportista-auditoria.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Vehiculo } from '../vehiculo.entity';
import { Usuario } from '../../usuario/usuario.entity';
@Entity('vehiculo_auditoria')
export class VehiculoAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.id, {
    nullable: false,
    eager: true,
  })
  id_Vehiculo: number;

  @Column({ type: 'varchar', nullable: false })
  patente: string;

  @ManyToOne(
    () => TransportistaAuditoria,
    (transportistaAuditoria) => transportistaAuditoria.id,
    {
      nullable: false,
      eager: true,
    },
  )
  id_Auditoria_Transportista: number;

  @Column({ type: 'varchar', length: 8 })
  status_Vehiculo: string;

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
