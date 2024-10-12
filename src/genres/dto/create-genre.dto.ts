import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
    @ApiProperty({
        description: 'The title of the genre',
        example: 'Fantasy',
      })
      @IsString()
      @IsNotEmpty()
      title: string;
}
