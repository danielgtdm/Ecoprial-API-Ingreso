import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TipoResiduo } from '../tipo-residuo/tipo-residuo.entity';

@Entity('residuo')
export class Residuo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @ManyToOne(() => TipoResiduo, (tipoResiduo) => tipoResiduo.Residuos, {
    eager: true,
  })
  TipoResiduo: TipoResiduo;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
