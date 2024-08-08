import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthDto } from "common/src/dto/auth.dto";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    validateUser(authDto: AuthDto) {
        const findUser = this.isUserExists(authDto.email);
        console.log()
        if (!findUser) return null;
        return 1;
    }

    async isUserExists(email: string): Promise<Observable<any>> {
        return this.natsClient.send<boolean, { email: string }>({ cmd: 'findUserByEMail'}, { email });
    }
}
