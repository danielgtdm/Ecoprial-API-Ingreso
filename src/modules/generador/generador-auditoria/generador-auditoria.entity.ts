import { Usuario } from '../../usuario/usuario.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Generador } from '../generador.entity';

@Entity('generador_auditoria')
export class GeneradorAuditoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Generador, (generador) => generador.id, {
    nullable: false,
    eager: true,
  })
  id_Generador: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  rut: string;

  @Column({ type: 'varchar', length: 8 })
  status_Generador: string;

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
