import { Test, TestingModule } from '@nestjs/testing';
import { TipoResiduoController } from '../tipo-residuo.controller';

describe('TipoResiduoController', () => {
  let controller: TipoResiduoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoResiduoController],
    }).compile();

    controller = module.get<TipoResiduoController>(TipoResiduoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
