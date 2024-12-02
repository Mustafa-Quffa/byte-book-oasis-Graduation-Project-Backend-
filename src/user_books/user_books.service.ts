import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserBook } from './entities/user_book.entity';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserBooksService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBooksRepository: Repository<UserBook>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  ) {}

  // Assign a book to a user
  // Assigning a book to a user
  async assignBookToUser(
    userId: number,
    bookId: number,
    assignDate?: Date,
  ): Promise<UserBook | string> {
    const currentDate = new Date(); // Get current date
    const assignDateObject = assignDate || currentDate; // Use provided or default current date

    // Fetch the user and book using their respective repositories
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }

    // Check if the user is already assigned to the same book
    const existingAssignment = await this.userBooksRepository.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (existingAssignment) {
      return 'You are already assigned this book.';
    }

    // If no assignment exists, create a new one
    const userBook = this.userBooksRepository.create({
      user_id: userId,
      book_id: bookId,
      assign_date: assignDateObject,
    });

    // Save the new assignment to the database
    return this.userBooksRepository.save(userBook);
  }

  async unassignBookFromUser(userId: number, bookId: number): Promise<{ message: string }> {
    console.log('Unassigning Book ID:', bookId, 'for User ID:', userId);
  
    const userBook = await this.userBooksRepository.findOne({
      where: { user_id: userId, book_id: bookId },
    });
    console.log('Found UserBook:', userBook);
  
    if (!userBook) {
      console.error('No assignment found.');
      throw new NotFoundException(`No assignment found for User ID ${userId} and Book ID ${bookId}.`);
    }
  
    await this.userBooksRepository.remove(userBook);
    console.log('Book successfully unassigned.');
  
    return { message: 'Book successfully unassigned.' };
  }
  

    // Fetch assigned books with their details by userId
    async getAssignedBooksForUser(user_id: number) {
      // Get the user books first
      const userBooks = await this.userBooksRepository.find({
        where: { user_id },  // Filter directly by userId column
      });
  
      // Fetch the book details based on the bookId for each userBook
      const bookDetails = await Promise.all(
        userBooks.map(async (userBook) => {
          const book = await this.bookRepository.findOne({
            where: { id: userBook.book_id },
          });
          return {
            ...userBook, // Include user book data
            bookDetails: book, // Include book details
          };
        }),
      );
  
      return bookDetails;
    }
  }
  
