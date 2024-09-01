import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared/src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Tour } from 'shared/src/entities/tour.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const isUserExists = await this.findByEmail(createUserDto.email);
    if (isUserExists) {
      throw new HttpException('User with this already exists', 409);
    }
    createUserDto.password = await hash(createUserDto.password);
    await this.userRepository.save(createUserDto);
    this.natsClient.send({ cmd: 'signup_email' }, createUserDto).subscribe({
      next: () => {
        console.log('Email message send successfully');
      },
      error: (err) => {
        console.error('Error sending email message', err);
      },
    });
    return {
      msg: 'User successfully created!',
    };
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async subscribeUserToTour(token: string, tour: Tour) {
    const payload = this.jwtService.decode(token);
    const user: User = await this.userRepository.findOne({
      where: { email: payload.email },
      relations: ['tours'],
    });
    user.tours.push(tour);
    return user;
  }
}
