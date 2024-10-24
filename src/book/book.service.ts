import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Genre } from '../genres/entities/genre.entity';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { UpdateBookDto } from '../book/dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
  ) {}


}
