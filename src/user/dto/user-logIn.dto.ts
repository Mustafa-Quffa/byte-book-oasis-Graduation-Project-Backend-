import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LogInDto {
    @ApiProperty({
        description: 'The Email of the user',
        example: 'test@test.com',
      })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'A12345',
      })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

}