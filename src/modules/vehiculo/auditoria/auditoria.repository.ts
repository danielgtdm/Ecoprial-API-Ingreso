import { EntityRepository, Repository } from 'typeorm';
import { VehiculoAuditoria } from './auditoria.entity';

@EntityRepository(VehiculoAuditoria)
export class AuditoriaRepository extends Repository<VehiculoAuditoria> {}
