import { EntityRepository, Repository } from 'typeorm';
import { TransportistaAuditoria } from './transportista-auditoria.entity';

@EntityRepository(TransportistaAuditoria)
export class TransportistaAuditoriaRepository extends Repository<TransportistaAuditoria> {}
