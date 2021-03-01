import { Test, TestingModule } from '@nestjs/testing';
import { ResiduoController } from '../residuo.controller';

describe('ResiduoController', () => {
  let controller: ResiduoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResiduoController],
    }).compile();

    controller = module.get<ResiduoController>(ResiduoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
