import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../user/entities/user.entity'; // Import the User entity
import { Book } from '../book/entities/book.entity'; // Import the Book entity
// import { BorrowRecord } from '../borrow-records/borrow-record.entity'; // Import the BorrowRecord entity

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book,]) // Make the repositories available
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
