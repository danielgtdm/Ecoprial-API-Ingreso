import { EntityRepository, Repository } from 'typeorm';
import { Residuo } from './residuo.entity';

@EntityRepository(Residuo)
export class ResiduoRepository extends Repository<Residuo> {}
