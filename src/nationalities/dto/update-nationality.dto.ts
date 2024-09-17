import { PartialType } from '@nestjs/mapped-types';
import { NationalityDto } from './create-nationality.dto';

export class UpdateNationalityDto extends PartialType(NationalityDto) {}
