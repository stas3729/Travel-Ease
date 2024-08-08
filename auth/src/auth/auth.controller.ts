import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthDto } from 'common/src/dto/auth.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'login'})
    login(@Payload() authDto: AuthDto) {
        return this.authService.validateUser(authDto);
    }
}
