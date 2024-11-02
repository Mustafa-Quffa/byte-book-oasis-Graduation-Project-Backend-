import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'; // Ensure you have this import for the response types
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}


  @Get('/books')
  async getUsers(
      @Query('limit') limit: string = '10',
      @Query('offset') offset: string = '0',
  ): Promise<Book[]> {
      const parsedLimit = Number(limit);
      const parsedOffset = Number(offset);

    if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
        throw new BadRequestException('Limit and Offset must be valid numbers');
    }


    return this.booksService.getBooks(parsedLimit, parsedOffset);
}

  


  @Get('total-books')
  async getBooksCount(): Promise<number> {
    return this.booksService.countBooks();
  }

  @Post('add-new-book')
  // @UseGuards(AuthGuard('jwt'))
  async addNewBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.addNewBook(createBookDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the book' })
  @ApiResponse({ status: 200, description: 'Book details', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getUser(@Param('id') id: number): Promise<BookDto> {
    return this.booksService.getBookById(id);
  }  

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update Book details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the Book to update' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 200, description: 'Book successfully updated', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async updateBook(
    @Param('id') id: number,
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, createBookDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteUser(@Param('id') id: number): Promise<string> {
    return this.booksService.deleteBook(id);
  }
}
