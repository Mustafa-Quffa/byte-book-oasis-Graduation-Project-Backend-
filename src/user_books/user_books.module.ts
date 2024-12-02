import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBooksService } from './user_books.service';
import { UserBooksController } from './user_books.controller';
import { UserBook } from './entities/user_book.entity';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBook, User, Book]), // Register UserBook, User, and Book entities
  ],
  providers: [UserBooksService],
  controllers: [UserBooksController],
})
export class UserBooksModule {}
