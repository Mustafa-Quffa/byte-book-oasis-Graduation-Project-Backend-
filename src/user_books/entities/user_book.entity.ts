import { BaseEntity } from 'src/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_books')
export class UserBook extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  book_id: number;

  @Column({ type: 'date' })  // or 'timestamp' based on your specific needs
  borrow_date: Date;

  @Column({ type: 'date', nullable: true })  // Include nullable if the date can be null
  return_date: Date;

  @Column({ type: 'date', nullable: true })
  purchase_date: Date;

  @Column()
  payment_method: string;

  @Column()
  status: string;
}
