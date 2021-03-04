import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConductorAuditoriaRepository } from './conductor-auditoria.repository';
import { ConductorAuditoria } from './conductor-auditoria.entity';

@Injectable()
export class ConductorAuditoriaService {
  constructor(
    @InjectRepository(ConductorAuditoriaRepository)
    private readonly _conductorAuditoriaRepository: ConductorAuditoriaRepository,
  ) {}

  async get(conductorId: number): Promise<ConductorAuditoria[]> {
    if (!conductorId) {
      throw new BadRequestException();
    }

    const auditorias: ConductorAuditoria[] = await this._conductorAuditoriaRepository.find(
      { where: { id_Conductor: conductorId } },
    );

    return auditorias;
  }

  async getAll(): Promise<ConductorAuditoria[]> {
    const auditorias: ConductorAuditoria[] = await this._conductorAuditoriaRepository.find();

    return auditorias;
  }
}
