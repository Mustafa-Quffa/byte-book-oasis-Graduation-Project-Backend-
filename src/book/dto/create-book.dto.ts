export class CreateBookDto {
    title: string;
    author: string;
    publishYear: number;
    description?: string;
    pages: number;
    genres: number[]; // List of genre IDs
  }