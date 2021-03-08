import { EntityRepository, Repository } from 'typeorm';
import { PlantaProcesoAuditoria } from './planta-proceso-auditoria.entity';

@EntityRepository(PlantaProcesoAuditoria)
export class PlantaProcesoAuditoriaRepository extends Repository<PlantaProcesoAuditoria> {}
