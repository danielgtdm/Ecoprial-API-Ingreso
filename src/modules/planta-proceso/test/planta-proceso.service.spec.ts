import { Test, TestingModule } from '@nestjs/testing';
import { PlantaProcesoService } from '../planta-proceso.service';

describe('PlantaProcesoService', () => {
  let service: PlantaProcesoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantaProcesoService],
    }).compile();

    service = module.get<PlantaProcesoService>(PlantaProcesoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
