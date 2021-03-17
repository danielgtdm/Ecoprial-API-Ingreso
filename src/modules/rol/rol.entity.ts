import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { status } from '../../shared/entity-status.enum';
import { Usuario } from '../usuario/usuario.entity';

@Entity('rol')
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.Roles)
  @JoinColumn()
  Usuarios: Usuario[];

  @Column({ type: 'varchar', length: 8, default: status.ACTIVE })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
