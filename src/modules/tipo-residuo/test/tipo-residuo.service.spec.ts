import { Test, TestingModule } from '@nestjs/testing';
import { TipoResiduoService } from '../tipo-residuo.service';

describe('TipoResiduoService', () => {
  let service: TipoResiduoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoResiduoService],
    }).compile();

    service = module.get<TipoResiduoService>(TipoResiduoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
