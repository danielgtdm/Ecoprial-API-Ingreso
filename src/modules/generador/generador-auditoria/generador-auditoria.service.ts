import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneradorAuditoria } from './generador-auditoria.entity';
import { GeneradorAuditoriaRepository } from './generador-auditoria.repository';

@Injectable()
export class GeneradorAuditoriaService {
  constructor(
    @InjectRepository(GeneradorAuditoriaRepository)
    private readonly _generadorAuditoriaRepository: GeneradorAuditoriaRepository,
  ) {}

  async get(generadorId: number): Promise<GeneradorAuditoria[]> {
    if (!generadorId) {
      throw new BadRequestException();
    }

    const auditorias: GeneradorAuditoria[] = await this._generadorAuditoriaRepository.find(
      { where: { id_Generador: generadorId } },
    );

    return auditorias;
  }

  async getAll(): Promise<GeneradorAuditoria[]> {
    const auditorias: GeneradorAuditoria[] = await this._generadorAuditoriaRepository.find();
    return auditorias;
  }
}
