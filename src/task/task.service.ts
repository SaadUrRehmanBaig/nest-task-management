import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private task: Task[] = [];
  getAllTask(): Task[] {
    return this.task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: taskStatus.OPEN,
    };
    this.task.push(task);
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTask();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id): Task {
    const task = this.task.find((element) => {
      return element.id === id;
    });
    if (!task) {
      throw new NotFoundException('task not found');
    } else {
      return task;
    }
  }

  DeleteTaskById(id): Task[] {
    const task = this.task.filter((element) => {
      if (element.id !== id) return true;
    });
    if (task.length > 0) throw new NotFoundException('task');
    this.task = task;
    return this.task;
  }

  updateTaskStatus(updateTaskStatus): Task {
    const task = this.getTaskById(updateTaskStatus.id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    task.status = updateTaskStatus.status;
    return task;
  }
}
