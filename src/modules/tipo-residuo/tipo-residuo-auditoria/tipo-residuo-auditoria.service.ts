import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoResiduoAuditoria } from './tipo-residuo-auditoria.entity';
import { TipoResiduoAuditoriaRepository } from './tipo-residuo-auditoria.repository';

@Injectable()
export class TipoResiduoAuditoriaService {
  constructor(
    @InjectRepository(TipoResiduoAuditoriaRepository)
    private readonly _tipoResiduoAuditoriaRepository: TipoResiduoAuditoriaRepository,
  ) {}

  async get(tipoResiduoId: number): Promise<TipoResiduoAuditoria[]> {
    if (!tipoResiduoId) {
      throw new BadRequestException();
    }

    const auditorias: TipoResiduoAuditoria[] = await this._tipoResiduoAuditoriaRepository.find(
      { where: { id_Tipo_Residuo: tipoResiduoId } },
    );

    return auditorias;
  }

  async getAll(): Promise<TipoResiduoAuditoria[]> {
    const auditorias: TipoResiduoAuditoria[] = await this._tipoResiduoAuditoriaRepository.find();

    return auditorias;
  }
}
