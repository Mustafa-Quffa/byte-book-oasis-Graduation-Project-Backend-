import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({ description: 'The title of the genre' })
  title: string;
}
