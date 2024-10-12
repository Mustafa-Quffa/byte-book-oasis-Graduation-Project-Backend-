import { Test, TestingModule } from '@nestjs/testing';
import { BookGenresController } from './book_genres.controller';
import { BookGenresService } from './book_genres.service';

describe('BookGenresController', () => {
  let controller: BookGenresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookGenresController],
      providers: [BookGenresService],
    }).compile();

    controller = module.get<BookGenresController>(BookGenresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
