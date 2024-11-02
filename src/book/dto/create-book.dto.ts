import { IsNotEmpty, IsString, IsOptional, IsDecimal, IsArray, IsInt, ArrayMinSize } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book', example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The author of the book', example: 'F. Scott Fitzgerald' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'The language of the book', example: 'English' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ description: 'The price of the book', example: 10.99 })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The publish year of the book', example: 1925 })
  @IsInt()
  @IsNotEmpty()
  publish_year: number;

  @ApiProperty({ description: 'The description of the book', example: 'A novel set in the 1920s...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The number of pages in the book', example: 180 })
  @IsInt()
  @IsNotEmpty()
  pages: number;

  @ApiProperty({ description: 'The image URL of the book', example: 'http://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'The availability status of the book', example: 'Available' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'The rating of the book', example: 4.5 })
  @IsDecimal()
  @IsOptional()
  rating?: number;

  @ApiProperty({ description: 'The number of copies available', example: 5 })
  @IsInt()
  @IsNotEmpty()
  num_of_copies: number;

  @ApiProperty({ description: 'An array of genre IDs associated with the book', example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1) 
  @IsNotEmpty()
  genre_ids: number[]; 
}

