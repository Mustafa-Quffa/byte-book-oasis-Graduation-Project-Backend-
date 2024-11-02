import { BaseEntity } from 'src/entities/base.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int'})
  publish_year: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 50 })
  status: string; // e.g., Available, Unavailable

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'int' })
  num_of_copies: number;

 
  @ManyToMany(() => Genre, genre => genre.books, { cascade: true })
  @JoinTable({name: 'books_genres'}) // This decorator is required on one side of the relationship
  genres: Genre[];


}
