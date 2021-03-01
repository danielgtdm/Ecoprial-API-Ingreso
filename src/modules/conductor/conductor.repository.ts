import { EntityRepository, Repository } from 'typeorm';
import { Conductor } from './conductor.entity';

@EntityRepository(Conductor)
export class ConductorRepository extends Repository<Conductor> {}
