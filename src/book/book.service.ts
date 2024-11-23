import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Genre } from '../genres/entities/genre.entity';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  /**
   * Count the total number of books in the database.
   */
  async countBooks(): Promise<number> {
    return this.bookRepository.count();
  }

  /**
   * Add a new book to the database.
   */
  async addNewBook(createBookDto: CreateBookDto): Promise<Book> {
    const { genre_ids, image, ...bookData } = createBookDto;

    // Validate genres
    const genres = await this.genreRepository.findBy({ id: In(genre_ids) });
    if (genres.length !== genre_ids.length) {
      throw new NotFoundException('One or more genres with provided IDs not found');
    }

    // Create and save the book
    const newBook = this.bookRepository.create({
      ...bookData,
      image,
      genres,
    });

    return this.bookRepository.save(newBook);
  }

  /**
   * Get a paginated list of books.
   */
  async getBooks(limit: number, offset: number): Promise<Book[]> {
    return this.bookRepository.find({
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });
  }

  async getPaginatedBooks(offset: number, limit: number) {
    const [books, total] = await this.bookRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  
    return {
      books,
      total,
      pageCount: Math.ceil(total / limit),
      currentPage: Math.ceil(offset / limit) + 1,
    };
  }

  /**
   * Filter books based on genre, author, or minimum rating.
   */
  async getBooksByFilter(filters: {
    genre?: string;
    author?: string;
    minRating?: number;
  }): Promise<Book[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (filters.genre) {
      queryBuilder.innerJoinAndSelect('book.genres', 'genre').where('genre.title = :genre', {
        genre: filters.genre,
      });
    }

    if (filters.author) {
      queryBuilder.andWhere('book.author LIKE :author', { author: `%${filters.author}%` });
    }

    if (filters.minRating !== undefined) {
      queryBuilder.andWhere('book.rating >= :minRating', { minRating: filters.minRating });
    }

    return queryBuilder.getMany();
  }

  /**
   * Search books by title or author.
   */
  async searchBooks(query: string, page: number, limit: number) {
    const [books, total] = await this.bookRepository.findAndCount({
      where: [
        { title: Like(`%${query}%`) },  // Searching by title
        { author: Like(`%${query}%`) },  // Searching by author
      ],
      take: limit,  // Limit the number of results
      skip: (page - 1) * limit,  // Pagination: Skip records for previous pages
    });

    return {
      total,
      books,
    };
  }



  /**
   * Get book details by ID, including genres.
   */
  async getBookById(id: string): Promise<BookDto> {
    const numericId = parseInt(id, 10);
  
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid book ID');
    }
  
    const book = await this.bookRepository.findOne({
      where: { id: numericId },
      relations: ['genres'],
    });
  
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  
    return {
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
      genres: book.genres.map((genre) => ({ title: genre.title })),
    };
  }

  async getAllBooksGroupedByGenres(): Promise<{ [genre: string]: Book[] }> {
    const genresWithBooks = await this.genreRepository.find({ relations: ['books'] }); // Assuming a relation exists
    const result = {};
    for (const genre of genresWithBooks) {
      result[genre.title] = genre.books; // Assuming `books` is the relation
    }
    return result;
  }
  
  
  

  /**
   * Update a book's details by ID.
   */
  async updateBook(id: number, createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    Object.assign(book, createBookDto);

    return this.bookRepository.save(book);
  }

  /**
   * Delete a book by ID.
   */
  async deleteBook(id: number): Promise<string> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('No book matches the provided ID');
    }

    await this.bookRepository.remove(book);
    return 'Book successfully deleted';
  }
}
