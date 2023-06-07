import { IsUUID, IsEnum } from 'class-validator';
import { taskStatus } from '../task.model';

export class updateTaskStatusDto {
  @IsUUID()
  id: string;

  @IsEnum(taskStatus)
  status: string;
}
