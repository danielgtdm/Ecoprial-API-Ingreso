import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportistaAuditoria } from './transportista-auditoria.entity';
import { TransportistaAuditoriaRepository } from './transportista-auditoria.repository';

@Injectable()
export class TransportistaAuditoriaService {
  constructor(
    @InjectRepository(TransportistaAuditoriaRepository)
    private readonly _transportistaAuditoriaRepository: TransportistaAuditoriaRepository,
  ) {}

  async get(transportistaId: number): Promise<TransportistaAuditoria[]> {
    if (!transportistaId) {
      throw new BadRequestException();
    }

    const auditorias: TransportistaAuditoria[] = await this._transportistaAuditoriaRepository.find(
      { where: { id_Transportista: transportistaId } },
    );

    return auditorias;
  }

  async getAll(): Promise<TransportistaAuditoria[]> {
    const auditorias: TransportistaAuditoria[] = await this._transportistaAuditoriaRepository.find();

    return auditorias;
  }
}
