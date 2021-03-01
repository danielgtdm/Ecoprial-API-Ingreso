import { EntityRepository, Repository } from 'typeorm';
import { TipoResiduo } from './tipo-residuo.entity';

@EntityRepository(TipoResiduo)
export class TipoResiduoRepository extends Repository<TipoResiduo> {}
