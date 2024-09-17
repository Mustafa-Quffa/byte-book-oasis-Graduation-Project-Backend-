import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../user/entities/user.entity';
import { LogInDto } from '../user/dto/user-logIn.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(userLoginDto: LogInDto) {
    const { email, password } = userLoginDto;

    // Find the user by email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT token for the authenticated user
    const payload = { email: user.email, sub: user.id }; // Customize the payload as needed
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      f_name: user.first_name,
      l_name: user.last_name,
      age: user.age,
      user_name: user.user_name,
      nationality: user.nationality,
      role: user.role,
      member_since: user.createdAt,
      image: user.image,
      email: user.email,
    };
  }
}
