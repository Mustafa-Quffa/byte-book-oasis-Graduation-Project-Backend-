import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Genre } from '../genres/entities/genre.entity';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { User } from 'src/user/entities/user.entity';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async countBooks(): Promise<number> {
    return await this.bookRepository.count();
  }

  async addNewBook(createBookDto: CreateBookDto): Promise<Book> {  // No semicolon here
    const { genre_ids, ...bookData } = createBookDto;

  // Find all genres that match the provided genre IDs
  const genres = await this.genreRepository.findBy({ id: In(genre_ids) });

  if (genres.length !== genre_ids.length) {
    throw new NotFoundException(`One or more genres with provided IDs not found`);
  }

  // Create a new book instance and assign the found genres
  const newBook = this.bookRepository.create({
    ...bookData,
    genres,
  });

    return this.bookRepository.save(newBook);
  }

  async getBooks(limit: number, offset: number): Promise<Book[]> {
    return this.bookRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'ASC', 
      },
    });
  }

  async getBookById(id: number): Promise<BookDto> {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['genres'],
    });
  
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  
    // Map the Book entity to BookDto
    const bookDto: BookDto = {
      id: book.id,
      title: book.title,
      author: book.author,
      language: book.language,
      price: book.price,
      publish_year: book.publish_year,
      description: book.description,
      pages: book.pages,
      image: book.image,
      status: book.status,
      rating: book.rating,
      num_of_copies: book.num_of_copies,
      genres: book.genres.map(genre => ({ title: genre.title })), // Assuming genre has a 'title' property
    };
  
    return bookDto;
  }

  async updateBook(id: number, createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.userRepository.findOne({
      where: { id }
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

 

    // Update user fields with the provided data
    Object.assign(book, createBookDto);

    return this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<string> {
    const book = await this.bookRepository.findOne({
      where: { id }
    });

    if (!book) {
      throw new NotFoundException('No user matches the provided ID');
    }

    await this.bookRepository.remove(book);
    return 'User successfully deleted';
  }
  }

  

