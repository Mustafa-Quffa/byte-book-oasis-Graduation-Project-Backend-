import { ApiProperty } from '@nestjs/swagger';
import { GenreDto } from 'src/genres/dto/genre.dto';

export class BookDto {
  @ApiProperty({ description: 'The ID of the book' })
  id: number;

  @ApiProperty({ description: 'The title of the book' })
  title: string;

  @ApiProperty({ description: 'The author of the book' })
  author: string;

  @ApiProperty({ description: 'The language of the book' })
  language: string;

  @ApiProperty({ description: 'The price of the book' })
  price: number;

  @ApiProperty({ description: 'The publish year of the book' })
  publish_year: number;

  @ApiProperty({ description: 'The description of the book' })
  description: string;

  @ApiProperty({ description: 'The number of pages in the book' })
  pages: number;

  @ApiProperty({ description: 'The image URL of the book' })
  image?: string;

  @ApiProperty({ description: 'The availability status of the book' })
  status: string;

  @ApiProperty({ description: 'The rating of the book' })
  rating?: number;

  @ApiProperty({ description: 'The number of copies available' })
  num_of_copies: number;

  @ApiProperty({ description: 'The genres associated with the book' })
  genres: GenreDto[]; // Assuming you want to return genre names or IDs
}
