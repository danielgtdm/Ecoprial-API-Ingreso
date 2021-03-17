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
import { Vehiculo } from '../vehiculo/vehiculo.entity';
import { Conductor } from '../conductor/conductor.entity';
@Entity('ingreso')
export class Ingreso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'datetime', nullable: false })
  entrada: Date;

  @Column({ type: 'datetime', nullable: true })
  salida: Date;

  @Column({ type: 'integer', nullable: false, unique: true })
  nro_guia: number;

  @Column({
    type: 'integer',
    nullable: false,
    unique: true,
  })
  nro_report: number;

  @ManyToOne(() => PlantaProceso, (plantaProceso) => plantaProceso.Ingresos, {
    eager: true,
  })
  PlantaProceso: PlantaProceso;

  @OneToOne(() => Residuo, { eager: true })
  @JoinColumn()
  Residuo: Residuo;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.Ingresos, { eager: true })
  Vehiculo: Vehiculo;

  @ManyToOne(() => Conductor, (conductor) => conductor.Ingresos, {
    eager: true,
  })
  Conductor: Conductor;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
