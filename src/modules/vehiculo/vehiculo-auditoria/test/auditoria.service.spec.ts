import { Test, TestingModule } from '@nestjs/testing';
import { VehiculoAuditoriaService } from '../vehiculo-auditoria.service';

describe('AuditoriaService', () => {
  let service: VehiculoAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiculoAuditoriaService],
    }).compile();

    service = module.get<VehiculoAuditoriaService>(VehiculoAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
