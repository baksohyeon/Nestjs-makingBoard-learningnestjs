import { IsNotEmpty, IsString } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class UpdateUserDto {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
