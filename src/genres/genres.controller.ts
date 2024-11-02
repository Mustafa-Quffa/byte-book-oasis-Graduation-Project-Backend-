import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';


@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}
  @Get()
  async getGenres() {
    return this.genresService.getGenres();
  }

  @Get('total-genres')
  async getGenresCount(): Promise<number> {
    return this.genresService.countGenres();
  }
}
