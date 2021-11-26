import { Test, TestingModule } from '@nestjs/testing';
import { PlatController } from './plat.controller';

describe('PlatController', () => {
  let controller: PlatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatController],
    }).compile();

    controller = module.get<PlatController>(PlatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
