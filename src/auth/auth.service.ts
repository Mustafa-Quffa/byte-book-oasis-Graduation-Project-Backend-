import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../user/entities/user.entity';
import { LogInDto } from '../user/dto/user-logIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { MoreThan } from 'typeorm';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'api', // Your Ethereal email user
      pass: '484d9c44234b522766c72e7e9f5b955d',        // Your Ethereal email password
    },
  });

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
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      user_name: user.user_name,
      nationality: user.nationality,
      role: user.role,
      member_since: user.createdAt.toString(),
      email: user.email,
    };
  }
  
  async sendPasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate a random token and set a 1-hour expiry
    const token = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Save the reset token and expiry to the user's record
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = resetTokenExpiry;
    await this.userRepository.save(user);

    // Construct the reset URL
    const resetUrl = `http://localhost:4200/reset-password/${token}`;

    // Send an email using Mailtrap
    const mailOptions = {
      from: 'info@demomailtrap.com', // Sender address
      to: email, // Recipient email
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Dear User,</p>
      <p>We received a request to reset your password. If you made this request, please click the link below to reset your password:</p>
      <p>
        <a 
          href="${resetUrl}" 
          style="color: white; background-color: #4CAF50; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Reset Your Password
        </a>
      </p>
      <p>If you did not request this change, please ignore this email.</p>
      <p>Thanks,</p>
      <p>Your Company Name</p>
    </div>

    `
        };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Preview URL
  }

 // Function to reset the password
 async resetPassword(token: string, newPassword: string): Promise<void> {
  const user = await this.userRepository.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpiry: MoreThan(new Date()),
    },
  });

  if (!user) {
    throw new NotFoundException('Invalid or expired token');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;
  await this.userRepository.save(user);
}
}
