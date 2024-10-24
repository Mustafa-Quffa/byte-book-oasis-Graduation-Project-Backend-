import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    title?: string;
    author?: string;
    publishYear?: number;
    description?: string;
    pages?: number;
    genres?: number[]; // List of genre IDs
}
