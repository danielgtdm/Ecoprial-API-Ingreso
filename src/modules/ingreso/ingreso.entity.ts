import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Residuo } from '../residuo/residuo.entity';
import { PlantaProceso } from '../planta-proceso/planta-proceso.entity';
@Entity('ingreso')
export class Ingreso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'datetime', nullable: false })
  entrada: Date;

  @Column({ type: 'datetime', nullable: false })
  salida: Date;

  @Column({ type: 'integer', nullable: false })
  nro_guia: number;

  @Column({ type: 'integer', nullable: false })
  nro_report: number;

  @ManyToOne(() => PlantaProceso, (plantaProceso) => plantaProceso.Ingresos)
  PlantaProceso: PlantaProceso;

  @OneToOne(() => Residuo)
  @JoinColumn()
  Residuo: Residuo;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
