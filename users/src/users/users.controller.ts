import { Controller, Res } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { CreateUserDto } from 'common/src/dto/create-user.dto';
import { Response } from "express";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'create_user' })
    async createUser(@Payload() dto: CreateUserDto, @Res() res: Response) {
        return await this.usersService.createUser(dto);
    }
}
