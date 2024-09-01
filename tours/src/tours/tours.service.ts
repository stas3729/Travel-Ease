import { Injectable } from '@nestjs/common';
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
    return this.toursRepository.save(createTourDto);
  }

  async findTourById(id: number) {
    return await this.toursRepository.findOne({
      where: { id },
      relations: ['subscribers'],
    });
  }

  allTours() {
    return this.toursRepository.find();
  }

  deleteTours() {
    return this.toursRepository.delete({});
  }
}
