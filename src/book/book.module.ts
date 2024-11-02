import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Genre } from '../genres/entities/genre.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Genre,User]), // Ensure both Book and Genre are provided here
  ],
  exports: [BookService], // Export if you need to use BooksService in other modules
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
