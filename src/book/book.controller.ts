import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'; // Ensure you have this import for the response types

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Book successfully created', type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.addBook(createBookDto);
  }

  @Get()
@ApiOperation({ summary: 'Retrieve all books' })
@ApiResponse({ status: 200, description: 'List of all books', type: [Book] })
@ApiResponse({ status: 500, description: 'Internal server error' })
async getBooks(
  @Query('search') search?: string,
  @Query('genre') genre?: string, // Comma-separated genre IDs
) {
  let genreIds: number[] = [];

  // If the genre parameter exists, split it by commas and parse into numbers
  if (genre) {
    genreIds = genre.split(',').map(id => parseInt(id.trim(), 10));
  }

  return this.bookService.getBooks(search, genreIds); // Pass genre IDs as numbers
}

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to retrieve' })
  @ApiResponse({ status: 200, description: 'Book details', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID put' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to update' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Book successfully updated', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }



  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
