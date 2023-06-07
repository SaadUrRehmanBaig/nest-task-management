import { taskStatus } from '../task.model';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
