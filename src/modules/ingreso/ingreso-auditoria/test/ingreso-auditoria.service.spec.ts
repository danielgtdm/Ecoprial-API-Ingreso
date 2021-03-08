import { Test, TestingModule } from '@nestjs/testing';
import { IngresoAuditoriaService } from '../ingreso-auditoria.service';

describe('IngresoAuditoriaService', () => {
  let service: IngresoAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresoAuditoriaService],
    }).compile();

    service = module.get<IngresoAuditoriaService>(IngresoAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
