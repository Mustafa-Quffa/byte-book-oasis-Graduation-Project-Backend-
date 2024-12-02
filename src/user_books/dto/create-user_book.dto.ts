import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsDateString } from '@nestjs/class-validator';

export class CreateUserBookDto {
    @ApiProperty({ example: 1, description: 'ID of the user' })
    @IsInt()
    userId: number;
  
    @ApiProperty({ example: 42, description: 'ID of the book' })
    @IsInt()
    bookId: number;
  
    @ApiProperty({
      example: '2024-11-27',
      description: 'Assignment date of the book (optional)',
      required: false,
    })
    @IsOptional()
    @IsDateString()
    assignDate: Date;
  }