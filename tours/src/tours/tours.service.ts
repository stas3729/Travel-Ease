import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTourDto } from 'shared/src/dto/create-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'shared/src/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private toursRepository: Repository<Tour>,
  ) {}
  async createTour(createTourDto: CreateTourDto) {
    const isTourExists = await this.findTour(createTourDto.title);
    if (isTourExists) throw new ConflictException('Tour already exists');
    return this.toursRepository.save(createTourDto);
  }

  findTour(title: string) {
    return this.toursRepository.findOne({ where: { title } });
  }

  allTours() {
    return this.toursRepository.find();
  }
}
