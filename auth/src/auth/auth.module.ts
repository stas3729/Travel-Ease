import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NatsClientModule } from "common/src/nats/nats-client.module";

@Module({
    imports: [NatsClientModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
