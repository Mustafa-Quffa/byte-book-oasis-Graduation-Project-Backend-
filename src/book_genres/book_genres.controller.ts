import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookGenresService } from './book_genres.service';
import { CreateBookGenreDto } from './dto/create-book_genre.dto';
import { UpdateBookGenreDto } from './dto/update-book_genre.dto';

@Controller('book-genres')
export class BookGenresController {
  constructor(private readonly bookGenresService: BookGenresService) {}

  @Post()
  create(@Body() createBookGenreDto: CreateBookGenreDto) {
    return this.bookGenresService.create(createBookGenreDto);
  }

  @Get()
  findAll() {
    return this.bookGenresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookGenresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookGenreDto: UpdateBookGenreDto) {
    return this.bookGenresService.update(+id, updateBookGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookGenresService.remove(+id);
  }
}
