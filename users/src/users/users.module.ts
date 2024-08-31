import {Module} from "@nestjs/common";
import {UsersMicroserviceController} from "./users.controller";
import {UsersService} from "./users.service";
import {MyTypeormModule} from "../typeorm/myTypeorm.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "shared/src/entities/user.entity";

@Module({
    imports: [MyTypeormModule, TypeOrmModule.forFeature([User])],
    controllers: [UsersMicroserviceController],
    providers: [UsersService],
})
export class UsersModule {}