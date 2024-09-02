import { Injectable } from '@nestjs/common';
import { CreateTourDto } from 'shared/src/dto/create-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'shared/src/entities/tour.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour) private toursRepository: Repository<Tour>,
  ) {}
  async createTour(
    createTourDto: CreateTourDto,
  ): Promise<CreateTourDto & Tour> {
    return this.toursRepository.save(createTourDto);
  }

  async findTourById(id: number): Promise<Tour> {
    return await this.toursRepository.findOne({
      where: { id },
      relations: ['subscribers'],
    });
  }

  allTours(): Promise<Tour[]> {
    return this.toursRepository.find();
  }

  deleteTours(): Promise<DeleteResult> {
    return this.toursRepository.delete({});
  }
}
