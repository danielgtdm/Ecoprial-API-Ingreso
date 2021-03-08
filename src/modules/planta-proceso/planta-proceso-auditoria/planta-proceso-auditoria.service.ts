import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantaProcesoAuditoria } from './planta-proceso-auditoria.entity';
import { PlantaProcesoAuditoriaRepository } from './planta-proceso-auditoria.repository';

@Injectable()
export class PlantaProcesoAuditoriaService {
  constructor(
    @InjectRepository(PlantaProcesoAuditoriaRepository)
    private readonly _plantaProcesoAuditoriaRepository: PlantaProcesoAuditoriaRepository,
  ) {}

  async get(plantaProcesoId: number): Promise<PlantaProcesoAuditoria[]> {
    if (!plantaProcesoId) {
      throw new BadRequestException();
    }

    const auditorias: PlantaProcesoAuditoria[] = await this._plantaProcesoAuditoriaRepository.find(
      { where: { id_Planta_Proceso: plantaProcesoId } },
    );

    return auditorias;
  }

  async getAll(): Promise<PlantaProcesoAuditoria[]> {
    const auditorias: PlantaProcesoAuditoria[] = await this._plantaProcesoAuditoriaRepository.find();

    return auditorias;
  }
}
