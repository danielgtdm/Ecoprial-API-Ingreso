import { EntityRepository, Repository } from 'typeorm';
import { GeneradorAuditoria } from './generador-auditoria.entity';

@EntityRepository(GeneradorAuditoria)
export class GeneradorAuditoriaRepository extends Repository<GeneradorAuditoria> {}
