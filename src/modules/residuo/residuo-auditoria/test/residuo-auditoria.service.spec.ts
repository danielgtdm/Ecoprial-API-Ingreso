import { Test, TestingModule } from '@nestjs/testing';
import { ResiduoAuditoriaService } from './residuo-auditoria.service';

describe('ResiduoAuditoriaService', () => {
  let service: ResiduoAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResiduoAuditoriaService],
    }).compile();

    service = module.get<ResiduoAuditoriaService>(ResiduoAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
