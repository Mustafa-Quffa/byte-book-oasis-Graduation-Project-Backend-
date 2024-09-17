import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationalityService } from './nationalities.service';
import { NationalityController } from './nationalities.controller';
import { Nationality } from './entities/nationality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nationality])],
  providers: [NationalityService],
  controllers: [NationalityController],
})
export class NationalityModule {}
