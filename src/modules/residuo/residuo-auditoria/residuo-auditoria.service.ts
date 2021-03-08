import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResiduoAuditoria } from './residuo-auditoria.entity';
import { ResiduoAuditoriaRepository } from './residuo-auditoria.repository';

@Injectable()
export class ResiduoAuditoriaService {
  constructor(
    @InjectRepository(ResiduoAuditoriaRepository)
    private readonly _residuoAuditoriaRepository: ResiduoAuditoriaRepository,
  ) {}

  async get(residuoId: number): Promise<ResiduoAuditoria[]> {
    if (!residuoId) {
      throw new BadRequestException();
    }

    const auditorias: ResiduoAuditoria[] = await this._residuoAuditoriaRepository.find(
      { where: { id_Residuo: residuoId } },
    );

    return auditorias;
  }

  async getAll(): Promise<ResiduoAuditoria[]> {
    const auditorias: ResiduoAuditoria[] = await this._residuoAuditoriaRepository.find();

    return auditorias;
  }
}
