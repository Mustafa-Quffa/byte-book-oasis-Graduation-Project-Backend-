import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nationality } from 'src/nationalities/entities/nationality.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private readonly nationalityRepository: Repository<Nationality>
  ) {}

  

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password, age, nationality_id, user_name, first_name, last_name, role } = signupDto;

    if (!email || !password || !age || !nationality_id || !first_name || !last_name || !role || !user_name ) {
      throw new BadRequestException('All fields are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Validate user_name
    const existingUser_name = await this.userRepository.findOne({
      where: { user_name },
    });

    if (existingUser_name) {
      throw new ConflictException('User with this username already exists');
    }

    // Validate password length
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    // Validate age
    if (age < 0 || age > 150) {
      throw new BadRequestException('Age must be a valid number between 0 and 150');
    }

    // Check if a user with the email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const nationality = await this.nationalityRepository.findOne({
      where: { id: nationality_id }
    });

    if (!nationality) {
      throw new BadRequestException('Invalid nationality ID');
    }


    // Create a new user
    const newUser = this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      user_name,
      nationality,
      role
    });

    // Save the user to the database
    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUserById(id: string): Promise<User> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const user = await this.userRepository.findOne({
      where: { id: numericId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

 

    // Update user fields with the provided data
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('No user matches the provided ID');
    }

    await this.userRepository.remove(user);
    return 'User successfully deleted';
  }
}
