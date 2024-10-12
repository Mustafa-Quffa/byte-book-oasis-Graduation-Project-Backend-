import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  // Fetch dashboard data (could include stats on users, books, etc.)
  async getDashboardData() {
    const totalUsers = await this.userRepository.count();
    const totalBooks = await this.bookRepository.count();
    // Add more stats as needed
    return { totalUsers, totalBooks };
  }

  // Fetch all users (for management)
  async getAllUsers() {
    return this.userRepository.find();
  }

  // Fetch all books (for management)
  async getAllBooks() {
    return this.bookRepository.find();
  }
}
