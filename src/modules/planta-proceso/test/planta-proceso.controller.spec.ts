import { Test, TestingModule } from '@nestjs/testing';
import { PlantaProcesoController } from '../planta-proceso.controller';

describe('PlantaProcesoController', () => {
  let controller: PlantaProcesoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantaProcesoController],
    }).compile();

    controller = module.get<PlantaProcesoController>(PlantaProcesoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
