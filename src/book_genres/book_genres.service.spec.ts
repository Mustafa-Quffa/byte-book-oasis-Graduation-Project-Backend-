import { Test, TestingModule } from '@nestjs/testing';
import { BookGenresService } from './book_genres.service';

describe('BookGenresService', () => {
  let service: BookGenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookGenresService],
    }).compile();

    service = module.get<BookGenresService>(BookGenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
