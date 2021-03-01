import { Test, TestingModule } from '@nestjs/testing';
import { GeneradorController } from '../generador.controller';

describe('GeneradorController', () => {
  let controller: GeneradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneradorController],
    }).compile();

    controller = module.get<GeneradorController>(GeneradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
