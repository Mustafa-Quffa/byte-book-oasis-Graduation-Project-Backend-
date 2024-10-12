import { Module } from '@nestjs/common';
import { BookGenresService } from './book_genres.service';
import { BookGenresController } from './book_genres.controller';

@Module({
  controllers: [BookGenresController],
  providers: [BookGenresService],
})
export class BookGenresModule {}
