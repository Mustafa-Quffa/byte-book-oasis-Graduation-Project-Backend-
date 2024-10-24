import { Book } from 'src/book/entities/book.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('book_genres')
export class BookGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.genres)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Genre, (genre) => genre.books)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  // Add any additional columns if necessary (e.g., created_at, etc.)
}
