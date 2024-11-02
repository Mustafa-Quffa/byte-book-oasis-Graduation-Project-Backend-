import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => Book, book => book.genres)
  books: Book[];

}
