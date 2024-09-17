import { Controller, Get } from '@nestjs/common';
import { NationalityService } from './nationalities.service';
11
@Controller('nationality')
export class NationalityController {
  nationalities: string[] = [];
  constructor(private readonly nationalityService: NationalityService) {}
1
  @Get()
  async getNationalities() {
    return this.nationalityService.getNationalities();
  }
}
