import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { TransportistaRepository } from './transportista.repository';
import { Transportista } from './transportista.entity';

@Injectable()
export class TransportistaService {
  constructor(
    @InjectRepository(TransportistaRepository)
    private readonly _transportistaRepository: TransportistaRepository,
  ) {}

  async get(id: number): Promise<Transportista> {
    if (!id) {
      throw new BadRequestException();
    }

    const transportista: Transportista = await this._transportistaRepository.findOne(
      id,
      { where: { status: status.ACTIVE } },
    );

    if (!transportista) {
      throw new NotFoundException();
    }

    return transportista;
  }

  async getAll(): Promise<Transportista[]> {
    const transportistas: Transportista[] = await this._transportistaRepository.find(
      { where: { status: status.ACTIVE } },
    );

    return transportistas;
  }

  async create(transportista: Transportista): Promise<Transportista> {
    const savedTransportista: Transportista = await this._transportistaRepository.save(
      transportista,
    );
    return savedTransportista;
  }

  async update(id: number, transportista: Transportista): Promise<void> {
    await this._transportistaRepository.update(id, transportista);
  }

  async delete(id: number): Promise<void> {
    await this._transportistaRepository.update(id, { status: status.INACTIVE });
  }
}
