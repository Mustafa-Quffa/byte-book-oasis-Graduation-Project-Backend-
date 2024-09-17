import { Module } from '@nestjs/common';
import { UserBooksService } from './user_books.service';
import { UserBooksController } from './user_books.controller';

@Module({
  controllers: [UserBooksController],
  providers: [UserBooksService],
})
export class UserBooksModule {}
