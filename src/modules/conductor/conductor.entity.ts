import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Ingreso } from '../ingreso/ingreso.entity';
import { Transportista } from '../transportista/transportista.entity';
@Entity('conductor')
export class Conductor extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  apellido: string;

  @ManyToOne(() => Transportista, (transportista) => transportista.Conductores)
  Transportista: Transportista;

  @OneToMany(() => Ingreso, (ingreso) => ingreso.Conductor)
  Ingresos: Ingreso[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
