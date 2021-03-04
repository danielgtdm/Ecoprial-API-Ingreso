import { Test, TestingModule } from '@nestjs/testing';
import { ConductorAuditoriaService } from '../conductor-auditoria.service';

describe('AuditoriaService', () => {
  let service: ConductorAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConductorAuditoriaService],
    }).compile();

    service = module.get<ConductorAuditoriaService>(ConductorAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
