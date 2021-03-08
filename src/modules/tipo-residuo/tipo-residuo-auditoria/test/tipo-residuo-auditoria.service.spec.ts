import { Test, TestingModule } from '@nestjs/testing';
import { TipoResiduoAuditoriaService } from '../tipo-residuo-auditoria.service';

describe('TipoResiduoAuditoriaService', () => {
  let service: TipoResiduoAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoResiduoAuditoriaService],
    }).compile();

    service = module.get<TipoResiduoAuditoriaService>(
      TipoResiduoAuditoriaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
