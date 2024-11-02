import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ){}

  async getGenres(): Promise<{ id: number; title: string }[]> {
    const genres = await this.genreRepository.find({
      select: ['id', 'title'],  // Select both 'id' and 'title'
    });
  
    return genres.map(Genre => ({
      id: Genre.id,
      title: Genre.title
    }));
  }
  
  
  async countGenres(): Promise<number> {
    return await this.genreRepository.count();
  }
}
