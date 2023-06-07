import { IsUUID } from 'class-validator';

export class getTaskByIdDto {
  @IsUUID()
  id: string;
}
