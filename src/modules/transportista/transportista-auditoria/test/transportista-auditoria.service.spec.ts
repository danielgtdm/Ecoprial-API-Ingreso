import { Test, TestingModule } from '@nestjs/testing';
import { TransportistaAuditoriaService } from '../transportista-auditoria.service';

describe('TransportistaAuditoriaService', () => {
  let service: TransportistaAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportistaAuditoriaService],
    }).compile();

    service = module.get<TransportistaAuditoriaService>(
      TransportistaAuditoriaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
