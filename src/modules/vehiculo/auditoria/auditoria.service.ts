import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditoriaRepository } from './auditoria.repository';
import { VehiculoAuditoria } from './auditoria.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(AuditoriaRepository)
    private readonly _auditoriaRepository: AuditoriaRepository,
  ) {}

  async get(vehiculoId: number): Promise<VehiculoAuditoria[]> {
    if (!vehiculoId) {
      throw new BadRequestException();
    }

    const auditorias: VehiculoAuditoria[] = await this._auditoriaRepository.find(
      { where: { id_Vehiculo: vehiculoId } },
    );

    if (!auditorias) {
      throw new NotFoundException();
    }

    return auditorias;
  }

  async getAll(): Promise<VehiculoAuditoria[]> {
    const vehiculos: VehiculoAuditoria[] = await this._auditoriaRepository.find();

    return vehiculos;
  }
}
