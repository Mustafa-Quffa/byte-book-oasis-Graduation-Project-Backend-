import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from '../../common/enums/userRole.enum';  // Adjust path as needed
import { IsString, IsEmail, IsPhoneNumber, IsInt, Min, Max, IsOptional, max, IsNotEmpty,  } from '@nestjs/class-validator';
import { Nationality } from "src/nationalities/entities/nationality.entity";
import { BaseEntity } from "src/entities/base.entity";

@Entity('users')
export class User extends BaseEntity{
@PrimaryGeneratedColumn()
id: number;


@Column()
@IsString()
first_name: string;


@Column()
@IsString()
last_name: string;


@Column()
@IsInt()
@Min(0)
@Max(150)
age: number;

@ManyToOne(() => Nationality, (nationality) => nationality.users, { eager: true })
@JoinColumn({ name: 'nationality_id' })  // Specify the foreign key
nationality: Nationality;

@Column({unique: true})
user_name: string;


@Column()
password: string;


@IsOptional()
@IsPhoneNumber()
@IsString()
phoneNumber?: string;


@Column({unique:true})
@IsEmail()
email: string;


@Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })  // Add image column
  @IsString()
  image?: string;  // Optional image URL or path
}

