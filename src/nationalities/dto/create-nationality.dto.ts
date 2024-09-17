import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class NationalityDto {
    @ApiProperty({
      description: 'The title of the nationality',
      example: 'American',
    })
    @IsString()
    @IsNotEmpty()
    title: string;
  }