import { Test, TestingModule } from '@nestjs/testing';
import { PlantaProcesoAuditoriaService } from '../planta-proceso-auditoria.service';

describe('PlantaProcesoAuditoriaService', () => {
  let service: PlantaProcesoAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantaProcesoAuditoriaService],
    }).compile();

    service = module.get<PlantaProcesoAuditoriaService>(
      PlantaProcesoAuditoriaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
