import { EntityRepository, Repository } from 'typeorm';
import { Generador } from './generador.entity';

@EntityRepository(Generador)
export class GeneradorRepository extends Repository<Generador> {}
