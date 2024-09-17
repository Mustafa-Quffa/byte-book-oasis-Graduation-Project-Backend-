import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // Import the User entity
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Nationality } from 'src/nationalities/entities/nationality.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([User, Nationality]),
  AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export if you want to use it in other modules
})
export class UserModule {}
