import { EntityRepository, Repository } from 'typeorm';
import { Transportista } from './transportista.entity';

@EntityRepository(Transportista)
export class TransportistaRepository extends Repository<Transportista> {}
