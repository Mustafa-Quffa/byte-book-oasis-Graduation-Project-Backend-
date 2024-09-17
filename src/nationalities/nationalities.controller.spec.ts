import { Test, TestingModule } from '@nestjs/testing';
import { NationalitiesController } from './nationalities.controller';
import { NationalitiesService } from './nationalities.service';

describe('NationalitiesController', () => {
  let controller: NationalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationalitiesController],
      providers: [NationalitiesService],
    }).compile();

    controller = module.get<NationalitiesController>(NationalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
