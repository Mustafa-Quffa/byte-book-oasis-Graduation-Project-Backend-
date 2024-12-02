import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(SignupDto) {

}
