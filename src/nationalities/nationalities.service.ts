import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nationality } from './entities/nationality.entity';

@Injectable()
export class NationalityService {
  constructor(
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
  ) {}
  async getNationalities(): Promise<{ id: number; title: string }[]> {
    const nationalities = await this.nationalityRepository.find({
      select: ['id', 'title'],  // Select both 'id' and 'title'
    });
  
    return nationalities.map(nationality => ({
      id: nationality.id,
      title: nationality.title
    }));
  }
}
