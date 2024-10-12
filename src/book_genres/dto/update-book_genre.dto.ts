import { PartialType } from '@nestjs/swagger';
import { CreateBookGenreDto } from './create-book_genre.dto';

export class UpdateBookGenreDto extends PartialType(CreateBookGenreDto) {}
