import { Controller, Post, Body, Delete, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateUserBookDto } from "./dto/create-user_book.dto";
import { UserBook } from "./entities/user_book.entity";
import { UserBooksService } from "./user_books.service";
import { Book } from "src/book/entities/book.entity";

@ApiTags('UserBooks') // Grouping the endpoints under 'UserBooks'
@Controller('user-books')
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a book to a user' })
  @ApiBody({
    description: 'Details of the user-book assignment',
    type: CreateUserBookDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user-book assignment has been successfully created.',
    type: UserBook,
  })
  async assignBookToUser(@Body() createUserBookDto: CreateUserBookDto) {
    const { userId, bookId, assignDate } = createUserBookDto;
    return this.userBooksService.assignBookToUser(userId, bookId,);
  }

  @Get('assigned-books/:userId')
  async getAssignedBooks(@Param('userId') user_id: number) {
    return this.userBooksService.getAssignedBooksForUser(user_id);
  }


  @Delete('/unassign')
async unassignBook(
  @Query('userId') userId: number,
  @Query('bookId') bookId: number,
): Promise<{ message: string }> {
  const result = await this.userBooksService.unassignBookFromUser(userId, bookId);
  console.log('Unassign Result:', result); // Log response
  return result;
}

}