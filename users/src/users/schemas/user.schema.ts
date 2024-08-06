import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from 'common/src/database/abstract.schema';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
