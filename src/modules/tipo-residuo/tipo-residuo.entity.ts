import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Residuo } from '../residuo/residuo.entity';

@Entity('tipo_residuo')
export class TipoResiduo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @OneToMany(() => Residuo, (residuo) => residuo.TipoResiduo)
  Residuos: Residuo[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
