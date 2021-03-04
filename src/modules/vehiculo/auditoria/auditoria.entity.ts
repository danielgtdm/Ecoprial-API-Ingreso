import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Transportista } from '../../transportista/transportista.entity';
import { Vehiculo } from '../vehiculo.entity';
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

  @ManyToOne(() => Transportista, (transportista) => transportista.id, {
    nullable: false,
    eager: true,
  })
  id_Transportista: number;

  @Column({ type: 'varchar', length: 8 })
  status_Vehiculo: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
