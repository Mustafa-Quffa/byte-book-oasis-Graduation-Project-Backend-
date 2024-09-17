import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBookDto } from './create-user_book.dto';

export class UpdateUserBookDto extends PartialType(CreateUserBookDto) {}
