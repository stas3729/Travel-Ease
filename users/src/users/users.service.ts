import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'common/src/dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { hash } from 'argon2';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async createUser(dto: CreateUserDto) {
    const session = await this.usersRepository.startTransaction();
    try {
      const user = await this.findOneByEmail(dto.email);
      if (user) {
        throw new HttpException('User with such email is already exist.', 409);
      }

      dto.password = await hash(dto.password);
      await this.usersRepository.create(dto);
      await lastValueFrom(this.natsClient.emit('user_created', dto));
      await session.commitTransaction();
      return {
        msg: 'You are successfully registered',
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }
}
