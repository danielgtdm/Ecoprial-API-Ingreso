import { EntityRepository, Repository } from 'typeorm';
import { VehiculoAuditoria } from './vehiculo-auditoria.entity';

@EntityRepository(VehiculoAuditoria)
export class VehiculoAuditoriaRepository extends Repository<VehiculoAuditoria> {}
