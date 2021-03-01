import { EntityRepository, Repository } from 'typeorm';
import { PlantaProceso } from './planta-proceso.entity';

@EntityRepository(PlantaProceso)
export class PlantaProcesoRepository extends Repository<PlantaProceso> {}
