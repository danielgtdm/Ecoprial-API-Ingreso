import { Test, TestingModule } from '@nestjs/testing';
import { ResiduoService } from '../residuo.service';

describe('ResiduoService', () => {
  let service: ResiduoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResiduoService],
    }).compile();

    service = module.get<ResiduoService>(ResiduoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
