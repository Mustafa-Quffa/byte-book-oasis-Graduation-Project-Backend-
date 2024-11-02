import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]), // Register the Genre entity
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
