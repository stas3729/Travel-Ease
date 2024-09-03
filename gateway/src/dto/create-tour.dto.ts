import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, description: 'Start date' })
  startDate: Date;
}
