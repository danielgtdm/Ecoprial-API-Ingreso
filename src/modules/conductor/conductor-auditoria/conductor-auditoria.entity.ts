import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conductor } from '../conductor.entity';
import { TransportistaAuditoria } from '../../transportista/transportista-auditoria/transportista-auditoria.entity';
import { Usuario } from '../../usuario/usuario.entity';

@Entity('conductor_auditoria')
export class ConductorAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Conductor, (conductor) => conductor.id, {
    nullable: false,
    eager: true,
  })
  id_Conductor: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  apellido: string;

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
  status_Conductor: string;

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
