import { BaseEntity } from 'src/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_books')
export class UserBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  book_id: number;

  @Column({ type: 'date' }) // or 'timestamp' based on your specific needs
  assign_date: Date;

  // @Column()
  // status: string; // Example: 'purchased', 'borrowed', etc.
}
