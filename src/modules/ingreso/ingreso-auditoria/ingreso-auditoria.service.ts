import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoAuditoria } from './ingreso-auditoria.entity';
import { IngresoAuditoriaRepository } from './ingreso-auditoria.repository';

@Injectable()
export class IngresoAuditoriaService {
  constructor(
    @InjectRepository(IngresoAuditoriaRepository)
    private readonly _ingresoAuditoriaRepository: IngresoAuditoriaRepository,
  ) {}

  async get(ingresoId: number): Promise<IngresoAuditoria[]> {
    if (!ingresoId) {
      throw new BadRequestException();
    }

    const auditorias: IngresoAuditoria[] = await this._ingresoAuditoriaRepository.find(
      { where: { id_Ingreso: ingresoId } },
    );

    return auditorias;
  }

  async getAll(): Promise<IngresoAuditoria[]> {
    const auditorias: IngresoAuditoria[] = await this._ingresoAuditoriaRepository.find();

    return auditorias;
  }
}
