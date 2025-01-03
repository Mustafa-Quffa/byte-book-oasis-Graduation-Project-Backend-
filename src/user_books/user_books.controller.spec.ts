import { Test, TestingModule } from '@nestjs/testing';
import { UserBooksController } from './user_books.controller';
import { UserBooksService } from './user_books.service';

describe('UserBooksController', () => {
  let controller: UserBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBooksController],
      providers: [UserBooksService],
    }).compile();

    controller = module.get<UserBooksController>(UserBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
