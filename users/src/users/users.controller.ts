import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from 'shared/src/entities/user.entity';

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern({ cmd: 'signup' })
  async handleSignup(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<{ msg: string }> {
    return this.usersService.signup(createUserDto);
  }

  @MessagePattern({ cmd: 'findUser' })
  async findUser(@Payload() email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'subscribeUserToTour' })
  async subscribeUserToTour(@Payload() { token, isTourExists }): Promise<User> {
    return this.usersService.subscribeUserToTour(token, isTourExists);
  }
}
