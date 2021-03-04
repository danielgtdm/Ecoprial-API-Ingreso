import { Test, TestingModule } from '@nestjs/testing';
import { GeneradorAuditoriaService } from '../generador-auditoria.service';

describe('GeneradorAuditoriaService', () => {
  let service: GeneradorAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneradorAuditoriaService],
    }).compile();

    service = module.get<GeneradorAuditoriaService>(GeneradorAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
