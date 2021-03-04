import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoAuditoriaRepository } from './auditoria.repository';
import { VehiculoAuditoria } from './vehiculo-auditoria.entity';

@Injectable()
export class VehiculoAuditoriaService {
  constructor(
    @InjectRepository(VehiculoAuditoriaRepository)
    private readonly _vehiculoAuditoriaRepository: VehiculoAuditoriaRepository,
  ) {}

  async get(vehiculoId: number): Promise<VehiculoAuditoria[]> {
    if (!vehiculoId) {
      throw new BadRequestException();
    }

    const auditorias: VehiculoAuditoria[] = await this._vehiculoAuditoriaRepository.find(
      { where: { id_Vehiculo: vehiculoId } },
    );

    if (!auditorias) {
      throw new NotFoundException();
    }

    return auditorias;
  }

  async getAll(): Promise<VehiculoAuditoria[]> {
    const vehiculos: VehiculoAuditoria[] = await this._vehiculoAuditoriaRepository.find();

    return vehiculos;
  }
}
