import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  // Many-to-Many relationship with Book
  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];
}
