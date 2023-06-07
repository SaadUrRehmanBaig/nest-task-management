import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskByIdDto } from './dto/get-task.dto';
import { validate } from 'class-validator';
import { updateTaskStatusDto } from './dto/update-Task-Status.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTask();
    }
  }

  @Post('/createTask')
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id) {
    const taskByIdDto = new getTaskByIdDto();
    taskByIdDto.id = id;

    const errors = await validate(taskByIdDto);
    if (errors.length > 0) return errors[0];

    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  async DeleteTaskById(@Param('id') id) {
    const DeleteTaskByIdDto = new getTaskByIdDto();
    DeleteTaskByIdDto.id = id;

    const errors = await validate(DeleteTaskByIdDto);
    if (errors.length > 0) return errors[0];

    return this.taskService.DeleteTaskById(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const updateTaskStatus = new updateTaskStatusDto();
    updateTaskStatus.id = id;
    updateTaskStatus.status = status;

    const errors = await validate(updateTaskStatus);
    if (errors.length > 0) return errors[0];

    return this.taskService.updateTaskStatus(updateTaskStatus);
  }
}
