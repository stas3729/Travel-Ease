import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;
}
