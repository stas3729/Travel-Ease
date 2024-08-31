import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared/src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const isUserExists = await this.findByEmail(createUserDto.email);
    if (isUserExists) {
      throw new HttpException('User with this already exists', 409);
    }
    createUserDto.password = await hash(createUserDto.password);
    await this.userRepository.save(createUserDto);
    return {
      msg: 'User successfully created!',
    };
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
