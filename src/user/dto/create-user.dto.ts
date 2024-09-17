import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/userRole.enum';

export class SignupDto {

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    minimum: 0,
    maximum: 150,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({
    description: 'The nationality ID of the user',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  nationality_id: number;


  @ApiProperty({
    description: 'User profile image URL or path',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string; // Optional image URL or path


  @ApiProperty({
    description: 'User role',
    example: 'CUSTOMER',
    enum: UserRole,
  })

  @IsString()
  @IsOptional()
  role?: UserRole; // Default role handling can be done in the service layer
}

