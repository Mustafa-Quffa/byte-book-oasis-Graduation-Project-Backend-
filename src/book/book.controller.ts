import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'; // Ensure you have this import for the response types
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from './dto/book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Books') // Add this to group all book-related routes under "Books" in Swagger UI
@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Post('add-new-book')
  @UseInterceptors(FileInterceptor('image')) // Ensure to use the image file interceptor
  @ApiOperation({ summary: 'Add a new book' }) // Swagger summary for this endpoint
  @ApiBody({ type: CreateBookDto }) // Document the expected body
  @ApiResponse({ status: 201, description: 'Book successfully created', type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addNewBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() image: Express.Multer.File // Added to accept uploaded image file
  ): Promise<Book> {
    if (image) {
      createBookDto.image = image.filename; // Assign the uploaded image filename to the DTO
    }
    return this.booksService.addNewBook(createBookDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for books' })
  @ApiResponse({ status: 200, description: 'Found books', type: [Book] })
  async searchBooks(
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.booksService.searchBooks(query, page, limit);
  }

  @Get('books')
  @ApiOperation({ summary: 'Get paginated list of books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
  async getBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const offset = (page - 1) * limit;
    return this.booksService.getPaginatedBooks(offset, limit);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Get books by filter (genre, author, rating)' })
  @ApiResponse({ status: 200, description: 'Books matching filter', type: [Book] })
  async getBooksByFilter(
    @Query('genre') genre?: string,
    @Query('author') author?: string,
    @Query('minRating') minRating?: string
  ): Promise<Book[]> {
    const parsedMinRating = minRating ? parseFloat(minRating) : undefined;
    return this.booksService.getBooksByFilter({
      genre,
      author,
      minRating: parsedMinRating,
    });
  }

  @Get('/grouped-by-genre')
@ApiOperation({ summary: 'Get all books grouped by genre' })
@ApiResponse({ status: 200, description: 'Books grouped by genres', type: Object })
async getBooksGroupedByGenre() {
  return this.booksService.getAllBooksGroupedByGenres();
}


  @Get('total-books')
  @ApiOperation({ summary: 'Get total count of books' })
  @ApiResponse({ status: 200, description: 'Total number of books' })
  async getBooksCount(): Promise<number> {
    return this.booksService.countBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the book' })
  @ApiResponse({ status: 200, description: 'Book details', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getBookById(@Param('id') id: string): Promise<BookDto> {
    return await this.booksService.getBookById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Book details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the Book to update' })
  @ApiBody({ type: CreateBookDto }) // Document the request body
  @ApiResponse({ status: 200, description: 'Book successfully updated', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async updateBook(
    @Param('id') id: number,
    @Body() createBookDto: CreateBookDto
  ): Promise<Book> {
    return this.booksService.updateBook(id, createBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteBook(@Param('id') id: number): Promise<string> {
    return this.booksService.deleteBook(id);
  }
}
