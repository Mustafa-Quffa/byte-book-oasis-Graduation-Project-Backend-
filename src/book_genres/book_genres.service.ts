import { Injectable } from '@nestjs/common';
import { CreateBookGenreDto } from './dto/create-book_genre.dto';
import { UpdateBookGenreDto } from './dto/update-book_genre.dto';

@Injectable()
export class BookGenresService {
  create(createBookGenreDto: CreateBookGenreDto) {
    return 'This action adds a new bookGenre';
  }

  findAll() {
    return `This action returns all bookGenres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookGenre`;
  }

  update(id: number, updateBookGenreDto: UpdateBookGenreDto) {
    return `This action updates a #${id} bookGenre`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookGenre`;
  }
}
