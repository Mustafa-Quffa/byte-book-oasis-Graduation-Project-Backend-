import { Injectable } from '@nestjs/common';
import { CreateUserBookDto } from './dto/create-user_book.dto';
import { UpdateUserBookDto } from './dto/update-user_book.dto';

@Injectable()
export class UserBooksService {
  create(createUserBookDto: CreateUserBookDto) {
    return 'This action adds a new userBook';
  }

  findAll() {
    return `This action returns all userBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBook`;
  }

  update(id: number, updateUserBookDto: UpdateUserBookDto) {
    return `This action updates a #${id} userBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBook`;
  }
}
